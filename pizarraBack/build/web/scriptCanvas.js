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
const inputColor = document.getElementById('inputColor');

/* Botones para figuras */

const DibujaCir = document.getElementById('DibujaCir');
const DibujaRec = document.getElementById('DibujaRec');
const DibujaTrian = document.getElementById('DibujaTrian');
const DibujaEstr = document.getElementById('DibujaEstr');
const clear = document.getElementById('clear');
var color,
    rad,
    altura,
    ancho,
    tam,
    circulo,
    rectangulo,
    triangulo,
    Estrella,
    confirmar;

/* Eventos para los botones */
btnBlack.addEventListener('click', setColor);
btnRed.addEventListener('click', setColor);
btnYellow.addEventListener('click', setColor);
btnBlue.addEventListener('click', setColor);
btnGreen.addEventListener('click', setColor);
btnErase.addEventListener('click', setColor);
inputColor.addEventListener('change', setColorA);

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
var figuras = [];

/* Funciones para incrementar o decrementar ancho de linea */
function increaseWidth(event) {
    lineWidth += 2;
}

function decreaseWidth(event) {
    if (lineWidth != 1) lineWidth -= 2;
    console.log(lineWidth);
}

/* Funcion para cambiar color */
function setColor(event) {
    color = event.target.id;
}
function setColorA(event) {
    color = event.target.value;
}
/* Funcion para habilitar o deshabilitar 
 dibujar en el canvas */
function start_stop_Drawing(event) {
    if (event.type === 'mouseup' || event.type === 'mouseover') {
        dibuja = false;
    } else if (event.type === 'mousedown') {
        //console.log(event);
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
        objeto['color'] = color;
        objeto['x1'] = x1;
        objeto['y1'] = y1;
        objeto['x2'] = x2;
        objeto['y2'] = y2;
        objeto['lineWidth'] = lineWidth;
        lines.push(objeto);
    }
}

/* Función para dibujar líneas de otros usuarios */
TogetherJS.hub.on('draw', function(msg) {
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
TogetherJS.hub.on('togetherjs.hello', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    TogetherJS.send({
        type: 'drawAllLines',
        lines: lines
    });
});

TogetherJS.hub.on('drawAllLines', function(msg) {
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

/* Funciones dibujar figuras */

//Dibujar Circulo
DibujaCir.onclick = function() {
    console.log(figuras);
    var objeto = new Object();
    color = document.getElementById('inputColor').value;
    rad = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(event) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        circulo.beginPath();
        if (rad) {
            circulo.arc(x, y, rad, 0, Math.PI * 2, true);
            objeto['tamanio'] = rad;
        } else {
            circulo.arc(x, y, 20, 0, Math.PI * 2, true);
            objeto['tamanio'] = 20;
        }
        circulo.fill();
        canvas.removeEventListener('click', onClick);
        objeto['color'] = color;
        objeto['x'] = x;
        objeto['y'] = y;
        objeto['tipo'] = 'circulo';
        figuras.push(objeto);
    }

    (function() {
        circulo = canvas.getContext('2d');
        if (color) circulo.fillStyle = color;
        else circulo.fillStyle = 'red';
    })();
};

//Dibujar Rectangulo
DibujaRec.onclick = function() {
    var objeto = new Object();
    color = document.getElementById('inputColor').value;
    ancho = parseInt(document.getElementById('inputTam').value);
    altura = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        rectangulo.beginPath();
        if (ancho) {
            rectangulo.rect(x - ancho / 2, y - altura / 2, ancho, altura);
            objeto['tamanio'] = ancho;
        } else {
            rectangulo.rect(x - 20 / 2, y - 20 / 2, 20, 20);
            objeto['tamanio'] = 20;
        }
        rectangulo.fill();
        objeto['color'] = color;
        objeto['x'] = x;
        objeto['y'] = y;
        objeto['tipo'] = 'rectangulo';
        figuras.push(objeto);
        canvas.removeEventListener('click', onClick);
    }

    (function() {
        rectangulo = canvas.getContext('2d');
        if (color) rectangulo.fillStyle = color;
        else rectangulo.fillStyle = 'red';
    })();
};

//Dibujar Triangulo
DibujaTrian.onclick = function() {
    var objeto = new Object();
    let color = document.getElementById('inputColor').value;
    let tam = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        triangulo.beginPath();
        if (tam) {
            triangulo.moveTo(x, y);
            triangulo.lineTo(x + 60 * tam, y);
            triangulo.lineTo(x + 30 * tam, y - 60 * tam);
            objeto['tamanio'] = tam;
        } else {
            triangulo.moveTo(x, y);
            triangulo.lineTo(x + 60, y);
            triangulo.lineTo(x + 30, y - 60);
            objeto['tamanio'] = 1;
        }
        triangulo.closePath();
        triangulo.fill();
        objeto['color'] = color;
        objeto['x'] = x;
        objeto['y'] = y;
        objeto['tipo'] = 'triangulo';
        figuras.push(objeto);
        canvas.removeEventListener('click', onClick);
    }

    (function() {
        triangulo = canvas.getContext('2d');
        if (color) triangulo.fillStyle = color;
        else triangulo.fillStyle = 'red';
    })();
};

//Limpiar lienzo
clear.onclick = function() {
    context.clearRect(0, 0, 1200, 500);
    lines = [];
    figuras = [];
};

//Dibujar estrella
DibujaEstr.onclick = function() {
    var objeto = new Object();
    let color = document.getElementById('inputColor').value;
    let tam = parseInt(document.getElementById('inputTam').value);
    Estrella = canvas.getContext('2d');
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        if (tam) {
            drawStar(x, y, 5, 16 * tam, (16 * tam) / 2);
            objeto['tamanio'] = tam;
        } else {
            drawStar(x, y, 5, 16, 8);
            objeto['tamanio'] = 1;
        }
        objeto['color'] = color;
        objeto['x'] = x;
        objeto['y'] = y;
        objeto['tipo'] = 'estrella';
        figuras.push(objeto);
        canvas.removeEventListener('click', onClick);
    }

    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        var rot = (Math.PI / 2) * 3;
        var ex = cx;
        var ey = cy;
        var step = Math.PI / spikes;
        Estrella.strokeSyle = '#000';
        Estrella.beginPath();
        Estrella.moveTo(cx, cy - outerRadius);
        for (i = 0; i < spikes; i++) {
            ex = cx + Math.cos(rot) * outerRadius;
            ey = cy + Math.sin(rot) * outerRadius;
            Estrella.lineTo(ex, ey);
            rot += step;

            ex = cx + Math.cos(rot) * innerRadius;
            ey = cy + Math.sin(rot) * innerRadius;
            Estrella.lineTo(ex, ey);
            rot += step;
        }
        Estrella.lineTo(cx, cy - outerRadius);
        Estrella.closePath();
        Estrella.lineWidth = 5;
        if (color) Estrella.fillStyle = color;
        else Estrella.fillStyle = 'orange';
        Estrella.fill();
    }
};

/* Guadar Archivo*/

/* Obtenemos boton para guardar */
const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', saveCanvas);

/* Funcion para convertir en JSON  */
function saveCanvas() {
    const usr = obtenerValorParametro('idUsr');
    const ide = obtenerValorParametro('idArchivo');
    const nombre = window.prompt('teclea el nombre');
    $.ajax({
        url: 'guardarCanvas',
        data: {
            datos: JSON.stringify(lines),
            usr: usr,
            idArchivo: ide,
            nombre: nombre
        },
        type: 'post',
        cache: false,
        success: function(data) {
            alert(data);
            window.location.href = 'http://localhost:3000/main/';
        },
        error: function() {
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
