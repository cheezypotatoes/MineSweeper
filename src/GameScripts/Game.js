import { eventBus } from "./EventBus";

class MineSweeperGame {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.bombIndexes = new Set()
    }

    setHeightWidth({ height, width }) {
        this.height = height;
        this.width = width;
    }

    GenerateBomb() {
        const generatedBombIndexSet = eventBus.emit("GenerateBombs", {max: this.height * this.width, amount: 5});
        this.bombIndexes = generatedBombIndexSet;
    }

    TilePressed({ index }) {
        let Event = {
            type: "UncoveredTile",
            index: index,
            timeStamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            isBomb: this.bombIndexes.has(index) ? true: false, // UNFINISHED
            isFlagged: false, // UNFINISHED
            adjacentNumber: 0, // UNFINISHED
        }

        eventBus.emit("SendTileUncoveredEventToEventStore", { event: Event })
    }

    returnBombIndex() {
        return this.bombIndexes;
    }
}

const MineSweeper = new MineSweeperGame();

export { MineSweeper };