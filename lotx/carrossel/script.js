var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');
var cellCount; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
console.log( cellWidth, cellHeight );


function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
    console.log(radius, theta, rotateFn );
}

var startX = null;
var moveX = null;
document.querySelector('.carousel').addEventListener('touchstart', function(e){
    startX = e.targetTouches[0].pageX;

    this.addEventListener('touchmove', function(e){
        moveX = e.targetTouches[0].pageX - startX;

        if(Math.abs(moveX)>=40){
       
        if(moveX>0){

        //ESQUERDA

            selectedIndex--;
            selectedIndex = 3;
            rotateCarousel();
        }else{
        //DIREITA
            selectedIndex++;
            selectedIndex = 4;
            rotateCarousel();
             }
        }
        
        //this is how custom swipe is done...
        e.preventDefault();
        e.stopPropagation();

    },false);


        e.preventDefault();
        e.stopPropagation();
        //prevent or stop propagation according to your need

}, false);




function changeCarousel() {
  cellCount = 9;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}


// set initials
  changeCarousel();
