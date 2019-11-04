const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.lineJoin = 'bevel';
context.lineCap = 'round';

canvas.addEventListener('mousemove', dibujaMouse);
canvas.addEventListener('mousedown', empezarDibujo);
canvas.addEventListener('mouseup', empezarDibujo);
document.addEventListener('mouseover', empezarDibujo);

const btnBlack = document.getElementById('black');
const btnRed = document.getElementById('#F04537');
const btnYellow = document.getElementById('#F7D42A');
const btnBlue = document.getElementById('#37B2F0');
const btnGreen = document.getElementById('#6DD02D');
const btnErase = document.getElementById('white');

btnBlack.addEventListener('click', setColor);
btnRed.addEventListener('click', setColor);
btnYellow.addEventListener('click', setColor);
btnBlue.addEventListener('click', setColor);
btnGreen.addEventListener('click', setColor);
btnErase.addEventListener('click', setColor);

const btnIncreaseWidth = document.getElementById('increaseWidth');
const btnDecreaseWidth = document.getElementById('decreaseWidth');

btnIncreaseWidth.addEventListener('click', increaseWidth);
btnDecreaseWidth.addEventListener('click', decreaseWidth);

var dibuja = false;
var color = 'blue';
var lineWidth = 3;

function increaseWidth(event) {
    lineWidth += 2;
    console.log(lineWidth);
}

function decreaseWidth(event) {
    if (lineWidth != 1) lineWidth -= 2;
    console.log(lineWidth);
}

function setColor(event) {
    color = event.target.id;
    console.log(color);
}

function empezarDibujo(evento) {
    if (evento.type === 'mouseup' || evento.type === 'mouseover') {
        dibuja = false;
    } else if (evento.type === 'mousedown') {
        dibuja = true;
        x = evento.layerX;
        y = evento.layerY;
    }
}

function dibujaMouse(evento) {
    if (dibuja) {
        dibujaLinea(
            color,
            x,
            y,
            evento.layerX,
            evento.layerY,
            context,
            lineWidth
        );
        y = evento.layerY;
        x = evento.layerX;
    }
}

function dibujaLinea(color, x1, y1, x2, y2, lienzo, lineWidth) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = lineWidth;
    lienzo.moveTo(x1, y1);
    lienzo.lineTo(x2, y2);
    lienzo.stroke();
    lienzo.closePath();
}
