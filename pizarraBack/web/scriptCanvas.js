/* Obtenemos el canvas */

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.lineJoin = 'bevel';
context.lineCap = 'round';

/* Agregamos eventos al canvas */

canvas.addEventListener('mousemove', dibujaMouse);
canvas.addEventListener('mousedown', empezarDibujo);
canvas.addEventListener('mouseup', empezarDibujo);
document.addEventListener('mouseover', empezarDibujo);

/* Obtenemos los botones para los colores */

const btnBlack = document.getElementById('black');
const btnRed = document.getElementById('#F04537');
const btnYellow = document.getElementById('#F7D42A');
const btnBlue = document.getElementById('#37B2F0');
const btnGreen = document.getElementById('#6DD02D');
const btnErase = document.getElementById('white');

/* Eventos para los botones */

btnBlack.addEventListener('click', setColor);
btnRed.addEventListener('click', setColor);
btnYellow.addEventListener('click', setColor);
btnBlue.addEventListener('click', setColor);
btnGreen.addEventListener('click', setColor);
btnErase.addEventListener('click', setColor);

/* Botones para incrementar o decrementar ancho de linea*/

const btnIncreaseWidth = document.getElementById('increaseWidth');
const btnDecreaseWidth = document.getElementById('decreaseWidth');

/*Eventos para incrementar o decrementar ancho de linea */

btnIncreaseWidth.addEventListener('click', increaseWidth);
btnDecreaseWidth.addEventListener('click', decreaseWidth);

/* Inicialización de variables */

var dibuja = false;
var color = 'blue';
var lineWidth = 3;

/* Funciones para incrementar o decrementar ancho de linea */

function increaseWidth(event) {
  lineWidth += 2;
  console.log(lineWidth);
}

function decreaseWidth(event) {
  if (lineWidth != 1) lineWidth -= 2;
  console.log(lineWidth);
}

/* Funcion para cambiar color */

function setColor(event) {
  color = event.target.id;
  console.log(color);
}

/* Funciones para empezar a dibujar en el canvas */

function empezarDibujo(evento) {
  if (evento.type === 'mouseup' || evento.type === 'mouseover') {
    dibuja = false;
  } else if (evento.type === 'mousedown') {
    dibuja = true;
    x = evento.layerX - this.offsetLeft;
    y = evento.layerY - this.offsetTop;
  }
}

function dibujaMouse(evento) {
  if (dibuja) {
    dibujaLinea(
      color,
      x,
      y,
      evento.layerX - this.offsetLeft,
      evento.layerY - this.offsetTop,
      context,
      lineWidth
    );
    x = evento.layerX - this.offsetLeft;
    y = evento.layerY - this.offsetTop;
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

/* Guadar Archivo*/

/* Obtenemos boton para guardar */
const save = document.getElementById('save');
save.addEventListener('click', saveCanvas);

/* Funcion para convertir en JSON  */

function saveCanvas() {
  let canvasContent = canvas.toDataURL();
  let data = { image: canvasContent };
  let dataJson = JSON.stringify(data);
  console.log(dataJson);
}

/* Load Archivo */
const reader = new FileReader();
console.log(reader);
const load = document.getElementById('load');
load.addEventListener('change', loadJson);

function loadJson() {
  if (this.files[0]) {
    reader.readAsText(this.files[0]);
  }
}

reader.onload = function() {
  let data = JSON.parse(reader.result);
  let image = new Image();
  image.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  };
  image.src = data.image;
};
