const field = document.getElementById('field-wrapper');
const ball = document.getElementById('ball');

let shifts;

ball.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    this.ondragstart = () => false;
    this.setPointerCapture(e.pointerId);

    let ballCoords = this.getBoundingClientRect();
    this.style.transform = 'unset';

    shifts = {
        shiftX: e.clientX - ballCoords.left,
        shiftY: e.clientY - ballCoords.top
    };

    moveAt.apply(this, [
        e.clientX,
        e.clientY,
        field,
        shifts
    ]);

    this.addEventListener('pointermove', onMouseMove);

    this.onpointerup = function () {
        this.removeEventListener('pointermove', onMouseMove);
        this.onpointerup = null;
    }
});

function moveAt(x, y, parent, { shiftX, shiftY }) {
    let left, top;
    let parentCoords = parent.getBoundingClientRect();
    let elemCoords = this.getBoundingClientRect();

    if (x - shiftX < parentCoords.left) {
        left = this.style.left = '0';
    } else if (x + (this.offsetWidth - shiftX) > parentCoords.right) {
        left = parent.offsetWidth - this.offsetWidth + 'px';
    } else {
        left = x - parentCoords.left - shiftX + 'px';
    }

    if (y - shiftY < parentCoords.top) {
        top = this.style.top = 0;
    } else if (y + (this.offsetHeight - shiftY) > parentCoords.bottom) {
        top = parent.offsetHeight - this.offsetHeight + 'px';
    } else {
        top = y - parentCoords.top - shiftY + 'px';
    }

    this.style.left = left;
    this.style.top = top;
}

function onMouseMove(e) {
    moveAt.apply(this, [
        e.clientX,
        e.clientY,
        field,
        shifts
    ]);
}