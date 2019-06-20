var modalidade = {
    MEGA_SENA_NORMAL:       0,
    MEGA_SENA_ESPECIAL:     1,
    LOTOFACIL_NORMAL:       2,
    LOTOFACIL_ESPECIAL:     3,
    QUINA_NORMAL:           4,
    QUINA_ESPECIAL:         5,
    LOTOMANIA_NORMAL:       6,
    LOTOMANIA_ESPECIAL:     7,
    TIMEMANIA_NORMAL:       8,
    TIMEMANIA_ESPECIAL:     9,
    DUPLA_SENA_NORMAL:      10,
    DUPLA_SENA_ESPECIAL:    11,
    LOTOGOL_NORMAL:         12,
    LOTOGOL_ESPECIAL:       13,
    LOTECA_NORMAL:          14,
    LOTECA_ESPECIAL:        15,
    FEDERAL_NORMAL:         16,
    FEDERAL_ESPECIAL:       17,
    DIA_DE_SORTE_NORMAL:    18,
    DIA_DE_SORTE_ESPECIAL:  19
};

var carousel;
$(document).ready(function () {

    carousel = $("ul");

    carousel.itemslide({
        duration: 1800,
        swipe_sensitivity: 50 
    }); 

    $(window).resize(function () {
        carousel.reload();
    }); 

    carousel.on('changeActiveIndex', function(event) {
        atualizaAposta();
    });
});

var slides = Object.keys(modalidade).length;
var exp = [];
exp.length = slides;
for (i=0; i < exp.length; i++) {
    exp[i] = true;
}

function expDiv() {
    var n = carousel.getActiveIndex();
    idDestaque  = "#" + document.getElementsByTagName("LI")[n].getElementsByClassName("destaque")[0].id;
    idResultado = "#" + document.getElementsByTagName("LI")[n].getElementsByClassName("resultado")[0].id;
    if (!exp[n]) {
        $(idDestaque).animate({ 'top': '35px' }, { duration: 400 });
        $(idResultado).animate({ 'width': '85%' }, { duration: 400 });
        exp[n] = true;
    }
    else {
        $(idDestaque).animate({ 'top': '87%' }, { duration: 400 });
        $(idResultado).animate({ 'width': '100%' }, { duration: 400 });
        exp[n] = false;
    }
}

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

function dataSorteio(dt) {
    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Segunda-feira";
    weekday[2] = "Terça-feira";
    weekday[3] = "Quarta-feira";
    weekday[4] = "Quinta-feira";
    weekday[5] = "Sexta-feira";
    weekday[6] = "Sábado";
    var wd = weekday[dt.getDay()];
    var months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    var d = dt.getDate();
    var m = months[dt.getMonth()];

    return wd + ', ' + (d <= 9 ? '0' + d : d) + ' de ' + m;
}

function atualizaAposta() {
    // muda a cor da div "aposte"
    var bgColor = getComputedStyle(document.querySelector('li.itemslide-active').querySelector("div.conteudo-destaque").querySelector("p.estimativa")).color;
    var div = document.getElementById("aposte");
    div.style.backgroundColor = bgColor;

    // muda o valor minimo da aposta
    indModalidade = -1;
    var div_id = document.querySelector('li.itemslide-active').querySelector(".destaque").id;
    var i = div_id.indexOf("_");
    if (i > 0) {
        var strIndex = div_id.substr(i+1);
        indModalidade = parseInt(strIndex);
        document.getElementById("valorAposta").innerHTML = arrValorAposta[indModalidade];
    }
}