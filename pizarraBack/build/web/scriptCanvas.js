/* Obtenemos el canvas */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.lineJoin = 'bevel';
context.lineCap = 'round';
context.globalCompositeOperation = 'source-over';

/* Agregamos eventos al canvas */
canvas.addEventListener('mousemove', handle_mouseMove);
canvas.addEventListener('mousedown', start_stop_Drawing);
canvas.addEventListener('mouseup', start_stop_Drawing);
document.addEventListener('mouseover', start_stop_Drawing);

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
var color = '#37B2F0';
var lineWidth = 3;
var lines = [];

/* Funciones para incrementar o decrementar ancho de linea */
function increaseWidth(event) {
    lineWidth += 2;
}

function decreaseWidth(event) {
    if (lineWidth != 1)
        lineWidth -= 2;
    console.log(lineWidth);
}

/* Funcion para cambiar color */
function setColor(event) {
    color = event.target.id;
}

/* Funcion para habilitar o deshabilitar 
 dibujar en el canvas */
function start_stop_Drawing(event) {
    if (event.type === 'mouseup' || event.type === 'mouseover') {
        dibuja = false;
    } else if (event.type === 'mousedown') {
        console.log(event);
        dibuja = true;
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
    }
}

/* Funcion para dibujar en el canvas */
function handle_mouseMove(event) {
    if (dibuja) {
        drawLine(
                color,
                x,
                y,
                event.pageX - this.offsetLeft,
                event.pageY - this.offsetTop,
                context,
                lineWidth,
                true
                );
        /* Dibujar para los demás usuarios */
        if (TogetherJS.running) {
            TogetherJS.send({
                type: 'draw',
                color: color,
                x1: x,
                y1: y,
                x2: event.pageX - this.offsetLeft,
                y2: event.pageY - this.offsetTop,
                lineWidth: lineWidth
            });
        }
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
    }
}

/* Función que dibuja la línea */
function drawLine(color, x1, y1, x2, y2, context, lineWidth, save) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    /* Guardamos las líneas que se dibujaron, si se llama la funcion
     desde la comunicación de Together, no se guarda */
    if (save) {
        var objeto = new Object();
        objeto["color"] = color;
        objeto["x1"] = x1;
        objeto["y1"] = y1;
        objeto["x2"] = x2;
        objeto["y2"] = y2;
        objeto["lineWidth"] = lineWidth;
        lines.push(objeto);
    }
}

/* Función para dibujar líneas de otros usuarios */
TogetherJS.hub.on('draw', function (msg) {
    if (!msg.sameUrl) {
        return;
    }
    drawLine(
            msg.color,
            msg.x1,
            msg.y1,
            msg.x2,
            msg.y2,
            context,
            msg.lineWidth,
            true
            );
});

/* Funciones para dibujar el canvas cuando un nuevo
 usuario se une a la sesión */
TogetherJS.hub.on('togetherjs.hello', function (msg) {
    if (!msg.sameUrl) {
        return;
    }
    TogetherJS.send({
        type: 'drawAllLines',
        lines: lines
    });
});

TogetherJS.hub.on('drawAllLines', function (msg) {
    if (!msg.sameUrl) {
        return;
    }
    for (i in msg.lines) {
        drawLine(
                msg.lines[i].color,
                msg.lines[i].x1,
                msg.lines[i].y1,
                msg.lines[i].x2,
                msg.lines[i].y2,
                context,
                msg.lines[i].lineWidth,
                false
                );
    }
    lines = msg.lines;
});

/* Guadar Archivo*/

/* Obtenemos boton para guardar */
const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', saveCanvas);

/* Funcion para convertir en JSON  */
function saveCanvas() {
    const usr = obtenerValorParametro('idUsr');
    const ide = obtenerValorParametro('idArchivo');
    const nombre = window.prompt("teclea el nombre");
    $.ajax({
        url: 'guardarCanvas',
        data: {datos: JSON.stringify(lines), usr: usr, idArchivo: ide, nombre: nombre},
        type: 'post',
        cache: false,
        success: function (data) {
            alert(data);
            window.location.href = "http://localhost:3000/main/";
        },
        error: function () {
            alert('error');
        }
    });
}

/*Función para obtener los parámetros de la url.*/
function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
            return sParametro[1];
        }
    }
    return null;
}