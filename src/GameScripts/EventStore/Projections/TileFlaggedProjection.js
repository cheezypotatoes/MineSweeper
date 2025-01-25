export class TileFlagged_Projection {
    constructor() {
        this.event = []; //TODO: GET RID OF THIS MAYBE
        this.eventsProjection = new Map();
    }

    addEvent({ Event }) {
        
        let SpecifiedEvent = {
            index: Event.index,
            isFlagged: this.returnSpecificEventFlaggedStatus({ index: Event.index }),
        };

        // Hashmap projection
        this.eventsProjection.set(SpecifiedEvent.index, SpecifiedEvent.isFlagged);
        
        this.event.push(SpecifiedEvent);
       
        this.returnEvents(); // Just for testing ignore this
    }

    // TODO: OPTIMIZE THIS FUNCTION
    returnSpecificEventFlaggedStatus({ index }) {  
        if (this.eventsProjection.has(index)) {
            let value = this.eventsProjection.get(index);
            
            if (value === true) {
                this.eventsProjection.set(index, false);
                return false;
            } else {
                this.eventsProjection.set(index, true);
                return true;
            }
            
        } else {
            return true;
        }
        
    }

    returnEvents() {
        return this.event;
    }

    returnLatestEvent() {
        return this.events[this.events.length - 1];
    }

    returnLatestEventIndexOnly() {
        return this.events[this.events.length - 1].index;
    }

    // Only returns all true values should change function name later
    returnProjectionLatestSnapshot() {
        let returnMap = new Map();
        for (const [key, value] of this.eventsProjection) {
            if (value === true) {
                returnMap.set(key, value);
            }
        }
        return returnMap;  
    }

    clearEvents() {
        this.eventsProjection = new Map();
        this.event = [];
    }
}
