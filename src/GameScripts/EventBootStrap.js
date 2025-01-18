import { MineSweeper } from "./Game";
import { EventStore } from "./EventStore";
import { ProjectionManager } from "./ProjectionManager";

const BootStrapList = new Map();

const TilePressed = ({ index }) => {
    MineSweeper.TilePressed({ index: index });
};

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

const ReturnSpecificProjectionEvents = ({ ProjectionType }) => {
    return ProjectionManager.returnSpecificProjectionEvent({ ProjectionType:ProjectionType });
};

const ReturnNewSpecificProjectionEvent = ({ ProjectionType }) => {
    return ProjectionManager.returnNewSpecificProjectionEvent({ ProjectionType:ProjectionType });
};

const ReturnNewSpecificProjectionEventIndexOnly = ({ ProjectionType }) => {
    return ProjectionManager.returnNewSpecificProjectionEventIndexOnly({ ProjectionType:ProjectionType });
};

const GenerateBombs = ({ amount }) => {
    return MineSweeper.GenerateBomb({amount: amount});
}

const CheckIfIndexIsBomb = ({ index }) => {
    return MineSweeper.isTileUncoveredBomb({ index:index })
};

const GetAdjacentNumber = ({ index }) => {
    return MineSweeper.getAdjacentNumber({ index: index });
}

BootStrapList.set("TilePressed", TilePressed);
BootStrapList.set("SetBoardSize", SetBoardSize);
BootStrapList.set("SendTileUncoveredEventToEventStore", SendTileUncoveredEventToEventStore);
BootStrapList.set("ApplyEventToProjectionManager", ApplyEventToProjectionManager);
BootStrapList.set("ReturnSpecificProjectionEvents", ReturnSpecificProjectionEvents);
BootStrapList.set("ReturnNewSpecificProjectionEvent", ReturnNewSpecificProjectionEvent);
BootStrapList.set("ReturnNewSpecificProjectionEventIndexOnly", ReturnNewSpecificProjectionEventIndexOnly);
BootStrapList.set("GenerateBombs", GenerateBombs);
BootStrapList.set("CheckIfIndexIsBomb", CheckIfIndexIsBomb);
BootStrapList.set("GetAdjacentNumber", GetAdjacentNumber);
BootStrapList.set("CreateEventForTilesWithZeroAdjacentCheckQueue", CreateEventForTilesWithZeroAdjacentCheckQueue)


export default BootStrapList;





