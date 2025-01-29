export class TileFlagged_Projection {
    constructor() {
        this.eventsProjection = new Map();
    }

    addEvent({ Event }) {
        
        let SpecifiedEvent = {
            index: Event.index,
            isFlagged: this.returnSpecificEventFlaggedStatus({ index: Event.index }),
        };

        // Hashmap projection
        this.eventsProjection.set(SpecifiedEvent.index, SpecifiedEvent.isFlagged);
       
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

    // TODO: CLEAN
    returnProjectionLatestSnapshotAsArray() {
        const map = this.returnProjectionLatestSnapshot();
        const newArray = Array.from(map, ([key]) => key);
        return newArray;
    }

    clearEvents() {
        this.eventsProjection = new Map();
        this.event = [];
    }

    returnEventProjectionSize() {
        let count = 0

        for (const [,value] of this.eventsProjection) { 
            if (value === true) {
                count += 1;
            }
        }
        return count;
    }

    checkFlaggedStatus({ index }) {
        if (this.eventsProjection.has(index)) {
            return this.eventsProjection.get(index);
        } else {
            return false;
        }
    }

    unflagTileDueToAutomaticRemoval({ index }) {
        if (this.eventsProjection.has(index)) {
            this.eventsProjection.set(index, false);
        }
    }

    ifIndexIsFlaggedTrueThenUnflag({ Data }) {
        if (this.eventsProjection.has(Data.index)) {
            this.eventsProjection.set(Data.index, false);
        }
    }
}
