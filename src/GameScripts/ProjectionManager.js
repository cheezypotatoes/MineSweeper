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

    clearEvents() {
        for (const key in this.projections) {
            const instance = this.projections[key];
            instance.clearEvents();
        }
    }
    
    
}

export const ProjectionManager = new ProjectionManagerClass();