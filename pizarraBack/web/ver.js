function drawLine(color, x1, y1, x2, y2, context, lineWidth) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function dibuja(lineas) {
    for (i in lineas) {
        drawLine(
            lineas[i].color,
            lineas[i].x1,
            lineas[i].y1,
            lineas[i].x2,
            lineas[i].y2,
            context,
            lineas[i].lineWidth
        );
    }
}
function drawCircle(color, x, y, rad) {
    console.log(color, x, y, rad);
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, rad, 0, Math.PI * 2, true);
    context.fill();
}

function drawRect(color, x, y, ancho) {
    console.log(color, x, y, ancho);
    context.beginPath();
    context.fillStyle = color;
    context.rect(x - ancho / 2, y - ancho / 2, ancho, ancho);
    context.fill();
}

function drawTriangulo(color, x, y, tam) {
    console.log(color, x, y, tam);
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x, y);
    context.lineTo(x + 60 * tam, y);
    context.lineTo(x + 30 * tam, y - 60 * tam);
    context.fill();
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
}

function dibujaFiguras(figuras) {
    for (i in figuras) {
        switch (figuras[i].tipo) {
            case 'rectangulo':
                drawRect(
                    figuras[i].color,
                    parseInt(figuras[i].x),
                    parseInt(figuras[i].y),
                    parseInt(figuras[i].tamanio)
                );
                break;
            case 'circulo':
                drawCircle(
                    figuras[i].color,
                    parseInt(figuras[i].x),
                    parseInt(figuras[i].y),
                    parseInt(figuras[i].tamanio)
                );
                break;
            case 'triangulo':
                drawTriangulo(
                    figuras[i].color,
                    parseInt(figuras[i].x),
                    parseInt(figuras[i].y),
                    parseInt(figuras[i].tamanio)
                );
                break;
            case 'estrella':
                drawEstrella(
                    figuras[i].color,
                    parseInt(figuras[i].x),
                    parseInt(figuras[i].y),
                    parseInt(figuras[i].tamanio)
                );
                break;
            default:
                break;
        }
    }
}

function dibujaCanvas() {
    const idUser = obtenerValorParametro('idUsr');
    const idArchivo = obtenerValorParametro('idArchivo');
    const nombre = obtenerValorParametro('nombre');
    $.ajax({
        url: 'cargarCanvasXML',
        data: { idUser: idUser, idArchivo: idArchivo, nombre: nombre },
        type: 'get',
        cache: false,
        success: function(data) {
            dibuja(JSON.parse(data));
        },
        error: function() {
            alert('error');
        }
    });
    $.ajax({
        url: 'cargarCanvasXML',
        data: {
            idUser: idUser,
            idArchivo: idArchivo,
            nombre: nombre,
            fig: true
        },
        type: 'get',
        cache: false,
        success: function(data) {
            dibujaFiguras(JSON.parse(data));
        },
        error: function() {
            alert('error');
        }
    });
}

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

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.lineJoin = 'bevel';
context.lineCap = 'round';
context.globalCompositeOperation = 'source-over';

window.onload = dibujaCanvas;
drawEstrella('black', 216, 309, 1);
