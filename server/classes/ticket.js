const fs = require('fs');

class Ticket {

    constructor(numero, modulo) {
        this.numero = numero;
        this.modulo = modulo;
    }
}
class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.atender = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.atender = data.atender;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getAtender() {
        return this.atender;
    }

    atenderTicket(modulo) {

        if (this.tickets.length === 0) {
            return 'Todos fueron atendidos';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimina la primera posición del arreglo

        let atenderTicket = new Ticket(numeroTicket, modulo);

        this.atender.unshift(atenderTicket); //Agrega el ticket al inicio del arreglo

        if (this.atender.length > 4) {
            this.atender.splice(-1, 1); // elimina el ultimo elemento del arreglo
        }

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.atender = [];
        console.log('Se a reiniciado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            atender: this.atender
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}



module.exports = {
    TicketControl
}