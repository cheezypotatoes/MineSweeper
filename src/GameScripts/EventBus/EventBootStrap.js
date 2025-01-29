import { MineSweeper } from "../Game";
import { EventStore } from "../EventStore/EventStore";
import { ProjectionManager } from "../EventStore/ProjectionManager";

const BootStrapList = new Map();

const TilePressed = ({ index }) => {
    MineSweeper.TilePressed({ index: index });
};

const CreateFlagEvent = ({ index }) => {
    MineSweeper.CreateFlagEvent({ index: index });
}

const SetBoardSize = ({ height, width }) => {
    MineSweeper.setHeightWidth({ height: height, width: width }) 
};

const CreateEventForTilesWithZeroAdjacentCheckQueue = () => {
    MineSweeper.createEventForTilesWithZeroAdjacentCheckQueue();
};

const SendTileUncoveredEventToEventStore = ({ Event }) => {
    EventStore.addLatestEventToProjectionManager({Event: Event});
};

const ApplyEventToProjectionManager = ({ Event }) => {
    ProjectionManager.applyEvents({ Event: Event });
}

const ReturnNewSpecificProjectionEvent = ({ ProjectionType }) => {
    return ProjectionManager.returnNewSpecificProjectionEvent({ ProjectionType:ProjectionType });
};

const ReturnNewSpecificProjectionEventIndexOnly = ({ ProjectionType }) => {
    return ProjectionManager.returnNewSpecificProjectionEventIndexOnly({ ProjectionType:ProjectionType });
};

const ReturnTileFlaggedLatestProjectionSnapshot = () => { 
    return ProjectionManager.returnProjectionLatestSnapshot({ ProjectionType: "FlaggedTile" });
}

const ReturnProjectionSpecialMethod = ({ ProjectionType, MethodName, Data }) => { 
    return ProjectionManager.callProjectionSpecialMethod({ ProjectionType: ProjectionType, MethodName: MethodName, Data: Data });
}

const GenerateBombs = ({ amount }) => {
    return MineSweeper.GenerateBomb({amount: amount});
}

const CheckIfIndexIsBomb = ({ index }) => {
    return MineSweeper.isTileUncoveredBomb({ index:index })
};

const GetAdjacentNumber = ({ index }) => {
    return MineSweeper.getAdjacentNumber({ index: index });
}

const returnGameStatus = () => {
    return MineSweeper.returnGameStatus();
}

const ResetEntireData = () => {
    EventStore.clearEvents();
    ProjectionManager.clearEvents();
    MineSweeper.resetGame();
    console.log("DELETED SUCCESSFULLY")
}

BootStrapList.set("TilePressed", TilePressed);
BootStrapList.set("CreateFlagEvent", CreateFlagEvent);
BootStrapList.set("SetBoardSize", SetBoardSize);
BootStrapList.set("SendTileUncoveredEventToEventStore", SendTileUncoveredEventToEventStore);
BootStrapList.set("ApplyEventToProjectionManager", ApplyEventToProjectionManager);
BootStrapList.set("ReturnNewSpecificProjectionEvent", ReturnNewSpecificProjectionEvent);
BootStrapList.set("ReturnNewSpecificProjectionEventIndexOnly", ReturnNewSpecificProjectionEventIndexOnly);
BootStrapList.set("ReturnTileFlaggedLatestProjectionSnapshot", ReturnTileFlaggedLatestProjectionSnapshot);
BootStrapList.set("ReturnProjectionSpecialMethod", ReturnProjectionSpecialMethod);
BootStrapList.set("GenerateBombs", GenerateBombs);
BootStrapList.set("CheckIfIndexIsBomb", CheckIfIndexIsBomb);
BootStrapList.set("GetAdjacentNumber", GetAdjacentNumber);
BootStrapList.set("CreateEventForTilesWithZeroAdjacentCheckQueue", CreateEventForTilesWithZeroAdjacentCheckQueue)
BootStrapList.set("ResetEntireData", ResetEntireData);
BootStrapList.set("returnGameStatus", returnGameStatus);


export default BootStrapList;





