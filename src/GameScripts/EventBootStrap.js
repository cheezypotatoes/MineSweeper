import { MineSweeper } from "./Game";
import { EventStore } from "./EventStore";
import { ProjectionManager } from "./ProjectionManager";

const BootStrapList = new Map();

const TilePressed = ({ index }) => {
    MineSweeper.TilePressed({ index: index });
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

const GenerateBombs = ({ max, amount }) => {
    if (max < amount) {return new Set();}

    let bombIndexSet = new Set();
    let i = 0;
    while (i < amount) {
        const bombIndex = Math.floor(Math.random() * max);
        if (!bombIndexSet.has(bombIndex)) {
            bombIndexSet.add(bombIndex);
            i += 1;
        }
    }
    return bombIndexSet;
}

const CheckIfIndexIsBomb = ({ index }) => {
    return MineSweeper.isTileUncoveredBomb({ index:index })
};

const GetAdjacentNumber = ({ index }) => {
    return MineSweeper.getAdjacentNumber({ index: index });
}

BootStrapList.set("TilePressed", TilePressed);
BootStrapList.set("SendTileUncoveredEventToEventStore", SendTileUncoveredEventToEventStore);
BootStrapList.set("ApplyEventToProjectionManager", ApplyEventToProjectionManager);
BootStrapList.set("ReturnSpecificProjectionEvents", ReturnSpecificProjectionEvents);
BootStrapList.set("ReturnNewSpecificProjectionEvent", ReturnNewSpecificProjectionEvent);
BootStrapList.set("ReturnNewSpecificProjectionEventIndexOnly", ReturnNewSpecificProjectionEventIndexOnly);
BootStrapList.set("GenerateBombs", GenerateBombs);
BootStrapList.set("CheckIfIndexIsBomb", CheckIfIndexIsBomb);
BootStrapList.set("GetAdjacentNumber", GetAdjacentNumber);


export default BootStrapList;





