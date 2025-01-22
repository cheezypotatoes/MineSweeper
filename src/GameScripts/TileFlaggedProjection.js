export class TileFlagged_Projection {
    constructor() {
        this.events = [];
    }

    addEvent({ Event }) {

        let SpecifiedEvent = {
            index: Event.index,
            isFlagged: Event.isFlagged,
        };
        this.events.push(SpecifiedEvent);
       
        this.returnEvents(); // Just for testing ignore this
    }

    returnSpecificEventFlaggedStatus({ index }) {  
        return this.event[index].isFlagged;
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
}
