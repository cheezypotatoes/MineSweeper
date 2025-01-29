import { TileUncovered_Projection } from "./Projections/TileUncoveredProjection"
import { TileFlagged_Projection } from "./Projections/TileFlaggedProjection";

class ProjectionManagerClass {
    constructor() {
        this.projections = {
            UncoveredTile: new TileUncovered_Projection(),
            FlaggedTile: new TileFlagged_Projection(),
        }

        this.projectionSpecialMethods = {
            FlaggedTile: new Map([
                ["returnProjectionLatestSnapshot", () => this.projections["FlaggedTile"].returnProjectionLatestSnapshot()],
                ["returnEventProjectionSize", () => this.projections["FlaggedTile"].returnEventProjectionSize()],
                ["returnProjectionLatestSnapshotAsArray", () => this.projections["FlaggedTile"].returnProjectionLatestSnapshotAsArray()],
                ["ifIndexIsFlaggedTrueThenUnflag", (Data) => this.projections["FlaggedTile"].ifIndexIsFlaggedTrueThenUnflag({ Data: Data })],
            ]),
            UncoveredTile: new Map([
                ["returnEvents", () => this.projections["UncoveredTile"].returnEvents()],
                ["returnLatestEventIndexOnly", () => {this.projections["UncoveredTile"].returnLatestEventIndexOnly()}]
            ])
        };
        
    }

    // Give the latest events to the projections.
    applyEvents({ Event }) {
        let projectionMatched = this.projections[Event.type];
        projectionMatched.addEvent({ Event: Event })
    } 

    
    callProjectionSpecialMethod({ ProjectionType, MethodName, Data = {} }) { 
        return this.projectionSpecialMethods[ProjectionType].get(MethodName)(Data);     
    }

    clearEvents() {
        for (const key in this.projections) {
            const instance = this.projections[key];
            instance.clearEvents();
        }
    }
    
    
}

export const ProjectionManager = new ProjectionManagerClass();