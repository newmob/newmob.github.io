$(function () {
    var App = {
        init: function () {
            Quagga.init(this.state, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                App.attachListeners();
                App.checkCapabilities();
                Quagga.start();
            });
        },
        checkCapabilities: function () {
            var track = Quagga.CameraAccess.getActiveTrack();
            var capabilities = {};
            if (typeof track.getCapabilities === 'function') {
                capabilities = track.getCapabilities();
            }
            this.applySettingsVisibility('zoom', capabilities.zoom);
            this.applySettingsVisibility('torch', capabilities.torch);
        },
        updateOptionsForMediaRange: function (node, range) {
            console.log('updateOptionsForMediaRange', node, range);
            var NUM_STEPS = 6;
            var stepSize = (range.max - range.min) / NUM_STEPS;
            var option;
            var value;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            for (var i = 0; i <= NUM_STEPS; i++) {
                value = range.min + (stepSize * i);
                option = document.createElement('option');
                option.value = value;
                option.innerHTML = value;
                node.appendChild(option);
            }
        },
        applySettingsVisibility: function (setting, capability) {
            // depending on type of capability
            if (typeof capability === 'boolean') {
                var node = document.querySelector('input[name="settings_' + setting + '"]');
                if (node) {
                    node.parentNode.style.display = capability ? 'block' : 'none';
                }
                return;
            }
            if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
                var node = document.querySelector('select[name="settings_' + setting + '"]');
                if (node) {
                    this.updateOptionsForMediaRange(node, capability);
                    node.parentNode.style.display = 'block';
                }
                return;
            }
        },
        initCameraSelection: function () {
            var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

            return Quagga.CameraAccess.enumerateVideoDevices()
                .then(function (devices) {
                    function pruneText(text) {
                        return text.length > 30 ? text.substr(0, 30) : text;
                    }
                    var $deviceSelection = document.getElementById("deviceSelection");
                    while ($deviceSelection.firstChild) {
                        $deviceSelection.removeChild($deviceSelection.firstChild);
                    }
                    devices.forEach(function (device) {
                        var $option = document.createElement("option");
                        $option.value = device.deviceId || device.id;
                        $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
                        $option.selected = streamLabel === device.label;
                        $deviceSelection.appendChild($option);
                    });
                });
        },
        attachListeners: function () {
            var self = this;

            self.initCameraSelection();
            $(".controls").on("click", "button.stop", function (e) {
                e.preventDefault();
                Quagga.stop();
            });

            $(".controls .reader-config-group").on("change", "input, select", function (e) {
                e.preventDefault();
                var $target = $(e.target),
                    value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
                    name = $target.attr("name"),
                    state = self._convertNameToState(name);

                console.log("Value of " + state + " changed to " + value);
                self.setState(state, value);
            });
        },
        _accessByPath: function (obj, path, val) {
            var parts = path.split('.'),
                depth = parts.length,
                setter = (typeof val !== "undefined") ? true : false;

            return parts.reduce(function (o, key, i) {
                if (setter && (i + 1) === depth) {
                    if (typeof o[key] === "object" && typeof val === "object") {
                        Object.assign(o[key], val);
                    } else {
                        o[key] = val;
                    }
                }
                return key in o ? o[key] : {};
            }, obj);
        },
        _convertNameToState: function (name) {
            return name.replace("_", ".").split("-").reduce(function (result, value) {
                return result + value.charAt(0).toUpperCase() + value.substring(1);
            });
        },
        detachListeners: function () {
            $(".controls").off("click", "button.stop");
            $(".controls .reader-config-group").off("change", "input, select");
        },
        applySetting: function (setting, value) {
            var track = Quagga.CameraAccess.getActiveTrack();
            if (track && typeof track.getCapabilities === 'function') {
                switch (setting) {
                    case 'zoom':
                        return track.applyConstraints({ advanced: [{ zoom: parseFloat(value) }] });
                    case 'torch':
                        return track.applyConstraints({ advanced: [{ torch: !!value }] });
                }
            }
        },
        setState: function (path, value) {
            var self = this;

            if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                value = self._accessByPath(self.inputMapper, path)(value);
            }

            if (path.startsWith('settings.')) {
                var setting = path.substring(9);
                return self.applySetting(setting, value);
            }
            self._accessByPath(self.state, path, value);

            console.log(JSON.stringify(self.state));
            App.detachListeners();
            Quagga.stop();
            App.init();
        },
        inputMapper: {
            inputStream: {
                constraints: function (value) {
                    if (/^(\d+)x(\d+)$/.test(value)) {
                        var values = value.split('x');
                        return {
                            width: { min: parseInt(values[0]) },
                            height: { min: parseInt(values[1]) }
                        };
                    }
                    return {
                        deviceId: value
                    };
                }
            },
            numOfWorkers: function (value) {
                return parseInt(value);
            },
            decoder: {
                readers: function (value) {
                    if (value === 'ean_extended') {
                        return [{
                            format: "ean_reader",
                            config: {
                                supplements: [
                                    'ean_5_reader', 'ean_2_reader'
                                ]
                            }
                        }];
                    }
                    return [{
                        format: value + "_reader",
                        config: {}
                    }];
                }
            }
        },
        state: {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { min: 1280 },
                    height: { min: 720 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: false
            },
            numOfWorkers: 2,
            frequency: 10,
            decoder: {
                readers: [{
                    format: "i2of5_reader",
                    config: {}
                }]
            },
            locate: true
        },
        lastResult: null
    };

    App.init();

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 5 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 5 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 5 });
            }
        }
    });

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;

        //if (App.lastResult !== code) {
        App.lastResult = code;
        if (isValidBarcode(code)) {
            document.getElementById('barcode').innerHTML = code;
            if (addCode(code) == false) {
                document.getElementById('barcode_valido').innerHTML = code;
                showResult(code);
                /*
                var $node = null, canvas = Quagga.canvas.dom.image;
                $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                $node.find("img").attr("src", canvas.toDataURL());
                $node.find("barcode").html(code);
                $("#result_strip ul.thumbnails").prepend($node);
                */
            }
        } else {
            console.log("código invalido");
        }
        //}
    });
});


function isValidBarcode(bc) {
    bc = bc.trim();
    const bc_len = 30;
    var valid = false;
    var ln = bc.length;
    var ck1 = parseInt(bc.substring(ln - 1, ln));
    var dg = '';
    var i;
    var m = 3;
    var r = 0;
    var sm = 0;
    var ck2 = -1;
    if (ln >= bc_len) {
        for (i = ln - 2; i >= 0; i--) {
            dg = bc.substring(i, i + 1);
            r = parseInt(dg) * m;
            sm += r;
            m = (m == 3) ? 1 : 3;
        }
        ck2 = (sm % 10) == 0 ? 0 : (10 - (sm % 10));
        valid = (ck1 == ck2);
    }
    return valid;
}

function addCode(code) {
    var retVal = false;
    var n = -1;

    // inicializa o buffer
    if (typeof addCode.buffer == 'undefined') {
        addCode.buffer = "#";
    }
    // limita o buffer em 5000 bytes
    if (addCode.buffer.length > 5000) {
        addCode.buffer = "#";
    }

    code = code.trim();

    n = addCode.buffer.indexOf("#" + code + "#");

    if (n == -1) {
        // adiciona a string no buffer
        if (code != "") {
            addCode.buffer += code + "#";
            retVal = true;
        }
    }

    return retVal;
}

var arrResults = ["780719712414062252264406014098",
    "780706100091344678939682011813",
    "780732693343505383339387011583",
    "780748153025420691160273017346",
    "780751136291420607239275001888",
    "780709341265343281301447000802"];

function showResult(code) {
    document.getElementById('mensagem').style.display = "none";
    Quagga.stop();
    document.getElementById('interactive').style.display = "none";
    document.getElementById('resultado').style.display = "block";

    // verifica se o codígo tem um arquivo json
    if (arrResults.indexOf(code) != -1) {
        var jsonFile = 'data/' + code + '.json';
        fetch(jsonFile, { headers: { 'encoding': 'UTF-8' } })
            .then(function (response) { return response.json(); })
            .then(function (json) {
                // ------ dados
                var descricao = json.payload.situacao.descricao;
                descricao = descricao.toUpperCase();
                switch (descricao) {
                    case "PREMIADA": {
                        displayItem(true, false, true, true);
                        var modalidade = json.payload.modalidade.descricaoEspecial == "" ? json.payload.modalidade.descricao : json.payload.modalidade.descricaoEspecial;
                        var valor = "Valor líquido R$" + json.payload.premio.valorLiquido;
                        document.getElementById('modalidade').innerHTML = modalidade;
                        document.getElementById('descricao').innerHTML = "Aposta premiada";
                        document.getElementById('valor').innerHTML = valor;
                        break;
                    }
                    case "NÃO PREMIADA": {
                        displayItem(false, false, true, false);
                        document.getElementById('descricao').innerHTML = descricao;
                        break;
                    }
                    case "PAGA": {
                        displayItem(true, false, true, false);
                        var modalidade = json.payload.modalidade.descricaoEspecial == "" ? json.payload.modalidade.descricao : json.payload.modalidade.descricaoEspecial;
                        document.getElementById('modalidade').innerHTML = modalidade;
                        document.getElementById('descricao').innerHTML = "Aposta premiada já paga";
                        break;
                    }
                    default: {
                        displayItem(false, false, true, false);
                        document.getElementById('descricao').innerHTML = "Não foram encontrados dados para esse bilhete";
                    }
                }
            });
    } else {
        displayItem(false, false, true, false);
        document.getElementById('descricao').innerHTML = "Não foram encontrados dados para esse bilhete";
    };
}

function displayItem(modalidade, concurso, descricao, valor) {
    if (modalidade) {
        document.getElementById('modalidade').style.display = "block";
    } else {
        document.getElementById('modalidade').style.display = "none";
    }

    if (descricao) {
        document.getElementById('descricao').style.display = "block";
    } else {
        document.getElementById('descricao').style.display = "none";
    }

    if (concurso) {
        document.getElementById('concurso').style.display = "block";
    } else {
        document.getElementById('concurso').style.display = "none";
    }

    if (valor) {
        document.getElementById('valor').style.display = "block";
    } else {
        document.getElementById('valor').style.display = "none";
    }
}