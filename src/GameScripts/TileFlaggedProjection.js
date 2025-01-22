export class TileFlagged_Projection {
    constructor() {
        this.event = [];
        this.eventsProjection = new Map();
    }

    addEvent({ Event }) {
        this.returnSpecificEventFlaggedStatus({ index: Event.index })

        let SpecifiedEvent = {
            index: Event.index,
            isFlagged: true,
        };

        // Hashmap projection
        this.eventsProjection.set(SpecifiedEvent.index, SpecifiedEvent.isFlagged);
        
        this.event.push(SpecifiedEvent);
       
        this.returnEvents(); // Just for testing ignore this
    }

    returnSpecificEventFlaggedStatus({ index }) {  
        if (this.eventsProjection.has(index)) {
            let value = this.eventsProjection.get(index);
            console.log(value)
        } 
        
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

    returnProjectionLatestSnapshot() {
        return this.eventsProjection;
    }
}
