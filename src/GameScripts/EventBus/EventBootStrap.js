import { MineSweeper } from "../Game";
import { EventStore } from "../EventStore/EventStore";
import { ProjectionManager } from "../EventStore/ProjectionManager";

const BootStrapList = new Map();


// MineSweeper functions
const TilePressed = ({ index }) => {MineSweeper.TilePressed({ index: index });};
const CreateFlagEvent = ({ index }) => {MineSweeper.CreateFlagEvent({ index: index });};
const SetBoardSize = ({ height, width }) => {MineSweeper.setHeightWidth({ height: height, width: width }) };
const CreateEventForTilesWithZeroAdjacentCheckQueue = () => {MineSweeper.createEventForTilesWithZeroAdjacentCheckQueue();};
const GenerateBombs = ({ amount }) => {return MineSweeper.GenerateBomb({amount: amount});}
const CheckIfIndexIsBomb = ({ index }) => {return MineSweeper.isTileUncoveredBomb({ index:index })};
const GetAdjacentNumber = ({ index }) => {return MineSweeper.getAdjacentNumber({ index: index });};
const returnGameStatus = () => {return MineSweeper.returnGameStatus();};
BootStrapList.set("TilePressed", TilePressed);
BootStrapList.set("CreateFlagEvent", CreateFlagEvent);
BootStrapList.set("SetBoardSize", SetBoardSize);
BootStrapList.set("CreateEventForTilesWithZeroAdjacentCheckQueue", CreateEventForTilesWithZeroAdjacentCheckQueue)
BootStrapList.set("GenerateBombs", GenerateBombs);
BootStrapList.set("CheckIfIndexIsBomb", CheckIfIndexIsBomb);
BootStrapList.set("GetAdjacentNumber", GetAdjacentNumber);
BootStrapList.set("returnGameStatus", returnGameStatus);


// EventStore Functions
const SendTileUncoveredEventToEventStore = ({ Event }) => {EventStore.addLatestEventToProjectionManager({Event: Event});};
BootStrapList.set("SendTileUncoveredEventToEventStore", SendTileUncoveredEventToEventStore);


// ProjectionManager Functions
const ApplyEventToProjectionManager = ({ Event }) => {ProjectionManager.applyEvents({ Event: Event });};
const ReturnProjectionSpecialMethod = ({ ProjectionType, MethodName, Data }) => {return ProjectionManager.callProjectionSpecialMethod({ ProjectionType: ProjectionType, MethodName: MethodName, Data: Data });};
BootStrapList.set("ApplyEventToProjectionManager", ApplyEventToProjectionManager);
BootStrapList.set("ReturnProjectionSpecialMethod", ReturnProjectionSpecialMethod);

// Uses all
const ResetEntireData = () => {
    EventStore.clearEvents();
    ProjectionManager.clearEvents();
    MineSweeper.resetGame();
    console.log("DELETED SUCCESSFULLY")}
BootStrapList.set("ResetEntireData", ResetEntireData);
export default BootStrapList;





