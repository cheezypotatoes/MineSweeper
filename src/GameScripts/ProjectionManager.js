import { TileUncovered_Projection } from "./TileUncoveredProjection"

class ProjectionManagerClass {
    constructor() {
        this.projections = {
            UncoveredTile: new TileUncovered_Projection(),
        }
    }

    // Give the latest events to the projections.
    applyEvents({ Event }) {
        let projectionMatched = this.projections[Event.type];
        projectionMatched.addEvent({ Event: Event })
    } 

    // Clear all projection to re-apply all events
    clearAllProjections() {
        Object.entries(this.projections).forEach(([, instance]) => {
            instance.clearEvents();
        });
    }

    returnSpecificProjectionEvent({ ProjectionType }) {
        return this.projections[ProjectionType].returnEvents();
    }

    returnNewSpecificProjectionEvent({ ProjectionType }) {
        return this.projections[ProjectionType].returnLatestEvent();
    }

    returnNewSpecificProjectionEventIndexOnly ({ ProjectionType }) {
        return this.projections[ProjectionType].returnLatestEventIndexOnly();
    }
    
}

export const ProjectionManager = new ProjectionManagerClass();