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
//const clear = document.getElementById('clear');

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
    TogetherJS.send({
        type: 'drawAllFigures',
        figuras: figuras
    });
});

TogetherJS.hub.on('drawAllFigures', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    console.log(msg.figuras);
    for (i in msg.figuras) {
        switch (msg.figuras[i].tipo) {
            case 'rectangulo':
                drawRect(
                    msg.figuras[i].color,
                    msg.figuras[i].x,
                    msg.figuras[i].y,
                    msg.figuras[i].tamanio
                );
                break;
            case 'circulo':
                drawCircle(
                    msg.figuras[i].color,
                    msg.figuras[i].x,
                    msg.figuras[i].y,
                    msg.figuras[i].tamanio
                );
                break;
            case 'triangulo':
                drawTriangulo(
                    msg.figuras[i].color,
                    msg.figuras[i].x,
                    msg.figuras[i].y,
                    msg.figuras[i].tamanio
                );
                break;
            case 'estrella':
                drawEstrella(
                    msg.figuras[i].color,
                    msg.figuras[i].x,
                    msg.figuras[i].y,
                    msg.figuras[i].tamanio
                );
                break;
            default:
                break;
        }
    }
    figuras = msg.figuras;
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

function drawCircle(color, x, y, rad) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, rad, 0, Math.PI * 2, true);
    context.fill();
    var objeto = new Object();
    objeto['color'] = color;
    objeto['x'] = x;
    objeto['y'] = y;
    objeto['tipo'] = 'circulo';
    objeto['tamanio'] = rad;
    figuras.push(objeto);
    console.log(figuras);
}

function drawRect(color, x, y, ancho) {
    context.beginPath();
    context.fillStyle = color;
    context.rect(x - ancho / 2, y - ancho / 2, ancho, ancho);
    context.fill();
    var objeto = new Object();
    objeto['color'] = color;
    objeto['x'] = x;
    objeto['y'] = y;
    objeto['tipo'] = 'rectangulo';
    objeto['tamanio'] = ancho;
    figuras.push(objeto);
}

function drawTriangulo(color, x, y, tam) {
    console.log(color, x, y, tam);
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x, y);
    context.lineTo(x + 60 * tam, y);
    context.lineTo(x + 30 * tam, y - 60 * tam);
    context.fill();
    var objeto = new Object();
    objeto['color'] = color;
    objeto['x'] = x;
    objeto['y'] = y;
    objeto['tipo'] = 'triangulo';
    objeto['tamanio'] = tam;
    figuras.push(objeto);
}

function drawEstrella(color, x, y, tam) {
    console.log(color, x, y, tam);
    var outerRadius = 16 * tam;
    var innerRadius = (16 * tam) / 2;
    var rot = (Math.PI / 2) * 3;
    var ex = x;
    var ey = y;
    var step = Math.PI / 5;
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x, y - outerRadius);
    for (i = 0; i < 5; i++) {
        ex = x + Math.cos(rot) * outerRadius;
        ey = y + Math.sin(rot) * outerRadius;
        context.lineTo(ex, ey);
        rot += step;

        ex = x + Math.cos(rot) * innerRadius;
        ey = y + Math.sin(rot) * innerRadius;
        context.lineTo(ex, ey);
        rot += step;
    }
    context.lineTo(x, y - outerRadius);
    context.closePath();
    context.lineWidth = 5;
    context.fill();
    var objeto = new Object();
    objeto['color'] = color;
    objeto['x'] = x;
    objeto['y'] = y;
    objeto['tipo'] = 'estrella';
    objeto['tamanio'] = tam;
    figuras.push(objeto);
}

//Dibujar Circulo
DibujaCir.onclick = function() {
    console.log(figuras);
    dibuja = false;
    color = document.getElementById('inputColor').value;
    rad = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(event) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        if (rad) {
            drawCircle(color, x, y, rad);
        } else {
            drawCircle(color, x, y, 20);
            rad = 20;
        }
        canvas.removeEventListener('click', onClick);
        if (TogetherJS.running) {
            TogetherJS.send({
                type: 'drawCircle',
                color: color,
                x: x,
                y: y,
                tamanio: rad
            });
        }
    }
};

TogetherJS.hub.on('drawCircle', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    drawCircle(msg.color, msg.x, msg.y, msg.tamanio);
});

//Dibujar Rectangulo
DibujaRec.onclick = function() {
    color = document.getElementById('inputColor').value;
    ancho = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        if (ancho) {
            drawRect(color, x, y, ancho);
        } else {
            drawRect(color, x, y, 20);
            ancho = 20;
        }
        canvas.removeEventListener('click', onClick);
        if (TogetherJS.running) {
            TogetherJS.send({
                type: 'drawRect',
                color: color,
                x: x,
                y: y,
                tamanio: ancho
            });
        }
    }
};

TogetherJS.hub.on('drawRect', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    drawRect(msg.color, msg.x, msg.y, msg.tamanio);
});

//Dibujar Triangulo
DibujaTrian.onclick = function() {
    let color = document.getElementById('inputColor').value;
    let tam = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        if (tam) {
            drawTriangulo(color, x, y, tam);
        } else {
            drawTriangulo(color, x, y, 1);
            tam = 1;
        }
        canvas.removeEventListener('click', onClick);
        if (TogetherJS.running) {
            TogetherJS.send({
                type: 'drawTriangulo',
                color: color,
                x: x,
                y: y,
                tamanio: tam
            });
        }
    }
};

TogetherJS.hub.on('drawTriangulo', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    console.log(msg.color, msg.x, msg.y, msg.tamanio);
    drawTriangulo(msg.color, msg.x, msg.y, msg.tamanio);
});

//Dibujar estrella
DibujaEstr.onclick = function() {
    let color = document.getElementById('inputColor').value;
    let tam = parseInt(document.getElementById('inputTam').value);
    canvas.addEventListener('click', onClick);
    function onClick(evt) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        if (tam) {
            drawEstrella(color, x, y, tam);
        } else {
            drawEstrella(color, x, y, 1);
            tam = 1;
        }
        canvas.removeEventListener('click', onClick);
        if (TogetherJS.running) {
            TogetherJS.send({
                type: 'drawEstrella',
                color: color,
                x: x,
                y: y,
                tamanio: tam
            });
        }
    }
};

TogetherJS.hub.on('drawEstrella', function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    drawEstrella(msg.color, msg.x, msg.y, msg.tamanio);
});

//Limpiar lienzo
// clear.onclick = function() {
//     context.clearRect(0, 0, 1200, 500);
//     lines = [];
//     figuras = [];
// };

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
            figuras: JSON.stringify(figuras),
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
