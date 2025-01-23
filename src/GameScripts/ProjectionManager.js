import { TileUncovered_Projection } from "./TileUncoveredProjection"
import { TileFlagged_Projection } from "./TileFlaggedProjection";

class ProjectionManagerClass {
    constructor() {
        this.projections = {
            UncoveredTile: new TileUncovered_Projection(),
            FlaggedTile: new TileFlagged_Projection(),
        }

        this.projectionSpecialMethods = {
            FlaggedTile: new Map([
                ["returnProjectionLatestSnapshot", () => this.projections["FlaggedTile"].returnProjectionLatestSnapshot()]
            ])
        };
        
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

    
    callProjectionSpecialMethod({ ProjectionType, MethodName }) { 
        return this.projectionSpecialMethods[ProjectionType].get(MethodName)();     
    }
    
    
}

export const ProjectionManager = new ProjectionManagerClass();