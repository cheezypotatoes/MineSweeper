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

    returnBombIndex() {
        return this.bombIndexes;
    }
}

const MineSweeper = new MineSweeperGame();

export { MineSweeper };