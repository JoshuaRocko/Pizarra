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

function dibujaCanvas() {
    const idUser = obtenerValorParametro('idUsr');
    const idArchivo = obtenerValorParametro('idArchivo');
    const nombre= obtenerValorParametro('nombre');
    $.ajax({
        url: 'cargarCanvasXML',
        data: {idUser: idUser, idArchivo: idArchivo, nombre: nombre},
        type: 'get',
        cache: false,
        success: function (data) {
            dibuja(JSON.parse(data));
        },
        error: function () {
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