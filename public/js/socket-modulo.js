var socket = io();
var searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El Módulo es necesario');
}

var modulo = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + modulo);

$('button').on('click', function() {

    socket.emit('atenderTicket', { modulo: modulo }, function(respuesta) {
        if (respuesta === 'Todos fueron atendidos') {
            label.text(respuesta);
            alert(respuesta);
            return;
        }

        label.text('Ticket ' + respuesta.numero);
    });

});