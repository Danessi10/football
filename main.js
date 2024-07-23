const field = document.getElementById('field-wrapper');
const fieldCoords = field.getBoundingClientRect();
const ball = document.getElementById('ball');

ball.addEventListener('pointerdown', function (e) {
    this.ondragstart = () => false;
    this.setPointerCapture(e.pointerId);

    moveAt(e.clientX, e.clientY, this, fieldCoords);

    this.addEventListener('pointermove', onMouseMove);

    // this.onpointerup = function () {
    //     this.removeEventListener('pointermove', onMouseMove);
    //     this.onpointerup = null;
    // }
});

function moveAt(x, y, elem, parentCoords) {
    let elemCoords = elem.getBoundingClientRect();
    let shiftX = x - elemCoords.left;
    let shiftY = y - elemCoords.top;

    elem.style.transform = 'unset';
    elem.style.left = x - parentCoords.left - shiftX + 'px';
    elem.style.top = y - parentCoords.top - shiftY + 'px';
}

function onMouseMove(event) {
    moveAt(event.clientX, event.clientY, this, fieldCoords);
}