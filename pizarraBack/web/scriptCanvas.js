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
var lines = [];
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
      lineWidth,
      true
    );
    x = evento.layerX - this.offsetLeft;
    y = evento.layerY - this.offsetTop;
  }
}

function dibujaLinea(color, x1, y1, x2, y2, context, lineWidth, save) {
  console.log(x1, y1, x2, y2);
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
  //guardamos las líneas que se dibujaron
  if (save) {
    lines.push([color, x1, y1, x2, y2, lineWidth]);
  }
  if (TogetherJS.running) {
    TogetherJS.send({
      type: 'draw',
      color: color,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      lineWidth: lineWidth
    });
  }
}

TogetherJS.hub.on('draw', function(msg) {
  if (!msg.sameUrl) {
    return;
  }
  draw(
    msg.color,
    msg.x1,
    msg.y1,
    msg.x2,
    msg.y2,
    context,
    msg.lineWidth,
    false
  );
});

$('.user-color-pick').click(function() {
  setColor(TogetherJS.require('peers').Self.color);
  changeMouse();
});

// /* Guadar Archivo*/

// /* Obtenemos boton para guardar */
// const saveBtn = document.getElementById('save');
// saveBtn.addEventListener('click', saveCanvas);

// /* Funcion para convertir en JSON  */

// function saveCanvas() {
//   let canvasContent = canvas.toDataURL();
//   let data = { image: canvasContent };
//   let dataJson = JSON.stringify(data);
//   console.log(dataJson);
// }

// /* Load Archivo */
// const reader = new FileReader();
// const load = document.getElementById('load');
// load.addEventListener('change', loadJson);

// function loadJson() {
//   if (this.files[0]) {
//     reader.readAsText(this.files[0]);
//   }
// }

// reader.onload = function() {
//   let data = JSON.parse(reader.result);
//   let image = new Image();
//   image.onload = () => {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.drawImage(image, 0, 0);
//   };
//   image.src = data.image;
// };
