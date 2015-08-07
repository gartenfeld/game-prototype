var posX = 0;
var posY = 0;

interact('#joystick__button')
  .draggable({
    restrict: {
      restriction: 'parent',
      elementRect: {top: 0, left: 0, bottom: 1, right: 1}
    },

    onmove: dragMoveListener,
    onend: dragEndListener
  });

function dragEndListener (event) {
  var target = event.target;

  target.style.webkitTransform = 
  target.style.transform = 
    'translate(' + 0 + 'px, ' + 0 + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', 0);
  target.setAttribute('data-y', 0);

  posX = 0;
  posY = 0;

}

function dragMoveListener (event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  posX = x;
  posY = y;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

  // this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;



setInterval(function(){
  updateVelocity(posX, posY);
}, 20);


