var carousel;
$(document).ready(function () {

    carousel = $("ul");

    carousel.itemslide({
        duration: 1200,
        swipe_sensitivity: 50 
    }); //initialize itemslide

    $(window).resize(function () {
        carousel.reload();
    }); //Recalculate width and center positions and sizes when window is resized
});
