import { TileUncovered_Projection } from "./TileUncoveredProjection"

class ProjectionManagerClass {
    constructor() {
        this.projections = {
            UncoveredTile: new TileUncovered_Projection(),
        }
    }

    // Give the latest events to the projections.
    applyEvents({ Events }) {
        this.clearAllProjections();
        for (let i = 0; i < Events.length; i++) {
            let currentEvent = Events[i];
            let projectionMatched = this.projections[currentEvent.type];
            projectionMatched.addEvent({ Event: currentEvent })
        }
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
}

export const ProjectionManager = new ProjectionManagerClass();