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
        Object.entries(this.projections).forEach(([type, instance]) => {
            instance.clearEvents();
            console.log("Clearing: ", type);
        });
    }
}

export const ProjectionManager = new ProjectionManagerClass();