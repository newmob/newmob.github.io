// 03-05-2019 continuar acrescentando os campos da Megasena na complementaResultados
var logger = require('../config/logger');
var request = require("request");
var config = require('../config/config');
var fs = require('fs');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

module.exports = {

    criaHTML: async function () {
        var refreshToken = "";

        // ----------------------------------------------------------------------------------------------
        // pega o refresh token
        try {
            var tokenAPI = await pegaToken();
            refreshToken = tokenAPI.refresh_token;
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + errStr);
            }
            return false;
        }
        // atualiza o token no header
        config.apiLoterias.headers.Authorization = `Bearer ${refreshToken}`;
        // ----------------------------------------------------------------------------------------------

        var dados = await criaDados();
        //console.log("---dados---");
        //console.log(dados);

        console.log("---complementaResultados---");
        const res = await complementaResultados(dados);
        console.log(res);

    }

}

async function procTemplates(config, info) {
    const pug = require('pug');
    const fs = require('fs');

    for (i = 0; i < info.payload.length; i++) {
        const modalidade = info.payload[i].modalidade;
        const dados = info.payload[i];
        const template = config.templates[modalidade];
        const template_fname = global.dir_views + "\\" + template;
        const html_fname = global.dir_html + "\\" + dados.modalidade.toLowerCase() + "_" + dados.tipoConcurso.toLowerCase() + ".html";
        console.log(modalidade + " -> " + dados.tipoConcurso);

        if (template) {
            const html = pug.renderFile(template_fname, dados);
            try {
                const data = fs.writeFileSync(html_fname, html);
            }
            catch (err) {
                logger.log('error', 'Erro na gravacao do arquivo ' + err)
            }
            finally {
                //logger.log('info', 'Arquivo gerado com sucesso: ' + html_fname)
            }
        } else {
            logger.log('error', "Template '" + modalidade + "' nao configurado.");
        }
    }
}

async function pegaToken() {
    var options = {
        headers: config.apiAccessToken.headers,
        url: config.apiAccessToken.uri,
        method: config.apiAccessToken.method,
        form: config.apiAccessToken.form
    };

    return new Promise((resolve, reject) => {

        request.post(options, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

async function pegaResultadoLoteria(loteria) {
    var options = {
        headers: config.apiLoterias.headers,
        url: config.apiLoterias.uri + "/" + loteria,
        method: config.apiLoterias.method,
        //rejectUnauthorized: false, 
        ca: fs.readFileSync(global.dir_ssl + "\\" + 'apicaixagovbr.crt')
    };
    return new Promise((resolve, reject) => {
        request.post(options, (err, response, body) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

async function complementaResultados(dados) {
    var retJson = [];

    for (i = 0; i < dados.length; i++) {
        let loteria = config.loterias[dados[i].modalidade];
        var json = "";
        console.log(loteria);

        // pega os dados da api de loterias
        try {
            json = await pegaResultadoLoteria(loteria);
            if (json == "") {
                logger.log('error', 'criaHTML sem resultado de ' + loteria)
            }
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaHTML abortado, erro na chamada da API de loterias: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaHTML abortado, erro na chamada da API de loterias: ' + errStr);
            }
        }

        if (json != "") {
            //console.log("------------------------------------");
            //console.log(json);
            //console.log("------------------------------------");

            switch (dados[i].modalidade) {
                case "MEGA_SENA":
                    dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                    dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                    dados[i].concursoUltimo = json.resultado.concurso;
                    dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                    dados[i].acumulou = json.resultado.acumulado;
                    dados[i].valorAcumulado = json.resultado.valor_acumulado.formatMoney();
                    dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                    dados[i].dataUltimo = new Date(json.resultado.data).formatDateDMY();
                    dados[i].resultado = json.resultado.resultado.split("-");
                    dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                    dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                    dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                    dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                    // ganhadores
                    ganhadores = [];
                    ganhadores[0] = ["Sena - 6 números acertados", ganhadoresStr(json.resultado.ganhadores, json.resultado.valor)];
                    ganhadores[1] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.ganhadores_quina, json.resultado.valor_quina)];
                    ganhadores[2] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.ganhadores_quadra, json.resultado.valor_quadra)];
                    dados[i].ganhadores = ganhadores;
                    console.log(dados[i].ganhadores);
                    break;

                case "LOTOFACIL":
                    dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                    dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                    dados[i].concursoUltimo = json.resultado.nu_concurso;
                    dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;

                    // continuar
                    dados[i].acumulou = json.resultado.acumulado;
                    dados[i].valorAcumulado = json.resultado.valor_acumulado.formatMoney();
                    dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                    dados[i].dataUltimo = new Date(json.resultado.data).formatDateDMY();
                    dados[i].resultado = json.resultado.resultado.split("-");
                    dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                    dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                    dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                    dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                    // ganhadores
                    ganhadores = [];
                    ganhadores[0] = ["Sena - 6 números acertados", ganhadoresStr(json.resultado.ganhadores, json.resultado.valor)];
                    ganhadores[1] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.ganhadores_quina, json.resultado.valor_quina)];
                    ganhadores[2] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.ganhadores_quadra, json.resultado.valor_quadra)];
                    dados[i].ganhadores = ganhadores;
                    console.log(dados[i].ganhadores);
                    break;

                default:
                    break;
            } // switch
        } // if
    } // for

    return dados;
}

/* 
    esta função cria uma estrutura de dados
    para guardar os resultados, a partir 
    dos dados retornados da API destaque
*/
async function criaDados() {
    var json = "";
    var dest = [];

    try {
        json = await pegaDestaques();
        if (json == "") {
            logger.log('error', 'criaHTML erro ao acessar API destaques')
        }
    } catch (err) {
        if (err.message) {
            logger.log('error', 'criaHTML abortado, erro na chamada da API de destaques: ' + err.message)
        } else {
            errStr = JSON.stringify(err);
            logger.log('error', 'criaHTML abortado, erro na chamada da API de destaques: ' + errStr);
        }
    }

    if (json != "") {
        for (i = 0; i < json.payload.length; i++) {
            var dados = {};
            dados.modalidade = json.payload[i].modalidade;
            dados.descricao = json.payload[i].modalidadeDetalhada.descricao;
            dados.descricaoEspecial = json.payload[i].modalidadeDetalhada.descricaoEspecial;
            dados.dataHoraSorteio = json.payload[i].dataHoraSorteio;
            dados.valorApostaMinima = json.payload[i].valorApostaMinima.formatMoney();;
            dest.push(dados);
        }
    }

    return dest;
}

async function pegaDestaques() {
    let options = {
        headers: config.apiDestaque.headers,
        uri: config.apiDestaque.uri,
        method: config.apiDestaque.method
    };
    return new Promise((resolve, reject) => {
        request.get(options, (err, response, body) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

Object.prototype.formatMoney = function () {
    number = this.valueOf();

    if ((isNaN(number) == false) && (number != "")) {   // se for um número válido
        number = parseFloat(number);

        if (number != 0) {
            retStr = number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            const p_colon = retStr.indexOf(",");
            const p_period = retStr.indexOf(".");

            if (p_period > p_colon) {
                retStr = retStr.replace(/\./g, "#");
                retStr = retStr.replace(/\,/g, '.')
                retStr = retStr.replace(/\#/g, ',')
            }
        } else {
            retStr = "";
        }
    } else {
        retStr = "";
    }

    return retStr;
};

Object.prototype.formatDateDMY = function () {
    date = this;
    var strArray = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ' ' + y;
}


function mergeDataHora(dt, hr) {
    var data = new Date();
    var now = new Date();
    var d1 = new Date(dt);
    var d2 = new Date(hr);

    // cria uma data/hora pegando a data que veio da API de resultados
    // e a hora da API de destaques
    data.setDate(d1.getDate());
    data.setMonth(d1.getMonth());
    data.setFullYear(d1.getFullYear());
    data.setHours(d2.getHours());
    data.setMinutes(d2.getMinutes());
    data.setSeconds(d2.getSeconds());

    return data;
}


// Esta função deverá ser executada client-side
function apostasEncerram(dt) {
    var now = new Date();
    var retStr = "";

    var diff = dt - now;

    if (diff > 0) {
        var d, h, m, s;
        s = Math.floor(diff / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        d = 4;
        h = 12;

        if (d > 0) {
            retStr = d + (d > 1 ? " dias " : " dia ");
        }
        if (h > 0) {
            retStr = retStr + (d > 0 ? "e " : "");
            retStr = retStr + h + (h > 1 ? " horas" : " hora");
        }
    }

    return retStr;
}

function ganhadoresStr(num, valor) {
    var retStr = "";

    if (num > 0) {
        retStr = num + (num > 1 ? " apostas ganhadoras, " : " aposta ganhadora, ") + valor.formatMoney();
    } else {
        retStr = "Não houve acertador";
    }

    return retStr;
}

function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case "TRUE":
        case "True":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}