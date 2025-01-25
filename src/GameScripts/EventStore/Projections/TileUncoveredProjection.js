export class TileUncovered_Projection {
    constructor() {
        this.events = [];
    }

    addEvent({ Event }) {

        let SpecifiedEvent = {
            index: Event.index,
            isBomb: Event.isBomb,
            adjacentNumber: Event.adjacentNumber,
        };
        this.events.push(SpecifiedEvent);
       

        this.returnEvents(); // Just for testing ignore this
    }

    returnEvents() {
        return this.events;
    }

    returnLatestEvent() {
        return this.events[this.events.length - 1];
    }

    returnLatestEventIndexOnly() {
        return this.events[this.events.length - 1].index;
    }

    clearEvents() {
        this.events = [];
    }
}
