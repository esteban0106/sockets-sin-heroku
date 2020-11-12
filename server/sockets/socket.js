const { io } = require('../server');
const { TicketControl } = require('../classes/ticket');

const ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let next = ticketControl.siguiente();

        console.log(next);

        callback(next);
    });

    //emitir estado actual

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        atender: ticketControl.getAtender()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.modulo) {
            return callback({
                err: true,
                message: 'El modulo es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.modulo);

        callback(atenderTicket);
    });

    client.broadcast.emit('ultimos4', {
        atender: ticketControl.getAtender()
    });


});