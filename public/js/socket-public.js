var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    console.log('estoy en estado actual');
    actualizaHTML(data.atender);
});

socket.on('ultimos4', function(data) {
    console.log('estoy en primero');
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.atender);
});

function actualizaHTML(atender) {
    for (var i = 0; i <= atender.length - 1; i++) {
        lblTickets[i].text('Tickets ' + atender[i].numero);
        lblEscritorios[i].text('Modulo ' + atender[i].modulo);
    }
}