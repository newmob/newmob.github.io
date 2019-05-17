var carousel;
$(document).ready(function () {

    carousel = $("ul");

    carousel.itemslide({
        duration: 1800,
        swipe_sensitivity: 50 
    }); //initialize itemslide

    $(window).resize(function () {
        carousel.reload();
    }); //Recalculate width and center positions and sizes when window is resized
});

var slides = 10;
var exp = [];
exp.length = slides;
for (i=0; i < exp.length; i++) {
    exp[i] = true;
}

function expDiv() {
    var n = carousel.getActiveIndex();
console.log($("#destaque_"+n));
    if (!exp[n]) {
        $("#destaque_"+n).animate({ 'top': '40px' }, { duration: 400 });
        $("#resultado_"+n).animate({ 'width': '85%' }, { duration: 400 });
        exp[n] = true;
    }
    else {
        $("#destaque_"+n).animate({ 'top': '87%' }, { duration: 400 });
        $("#resultado_"+n).animate({ 'width': '100%' }, { duration: 400 });
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
