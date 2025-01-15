export class TileUncovered_Projection {
    constructor() {
        this.events = [];
    }

    addEvent({ Event }) {

        let SpecifiedEvent = {
            index: Event.index,
            isBomb: Event.isBomb,
            isFlagged: Event.isFlagged,
            adjacentNumber: Event.adjacentNumber,
        };
        this.events.push(SpecifiedEvent);
       

        this.returnEvents(); // Just for testing ignore this
    }

    clearEvents() {
        this.events = [];
    }

    returnEvents() {
        return this.events;
    }
}
