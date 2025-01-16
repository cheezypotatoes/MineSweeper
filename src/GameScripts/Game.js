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
        const generatedBombIndexSet = eventBus.emit("GenerateBombs", {max: this.height * this.width, amount: 3});
        this.bombIndexes = generatedBombIndexSet;
    }

    TilePressed({ index }) {
        const id = `id_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
        let Event = {
            id: id,
            type: "UncoveredTile",
            index: index,
            timeStamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            isBomb: this.bombIndexes.has(index) ? true: false, // UNFINISHED
            isFlagged: false, // UNFINISHED
            adjacentNumber: 0, // UNFINISHED
        }

        eventBus.emit("SendTileUncoveredEventToEventStore", { Event: Event })

        return id // For unittest
    }

    isTileUncoveredBomb({ index }) {
        return this.bombIndexes.has(index);
    }

    returnBombIndex() {
        return this.bombIndexes;
    }
}

const MineSweeper = new MineSweeperGame();

export { MineSweeper };