/* eslint-disable no-unused-vars */
import { eventBus } from "./EventBus";

class MineSweeperGame {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.tileAmount = 0;
        this.bombIndexes = new Set()
    }

    setHeightWidth({ height, width }) {
        this.height = height;
        this.width = width;
        this.tileAmount = (width * height);
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
            adjacentNumber: this.getAdjacentNumber({ index: index }), // UNFINISHED
        }

        eventBus.emit("SendTileUncoveredEventToEventStore", { Event: Event })

        return id // For unittest
    }

    // TODO: MAKE TEST THEN OPTIMIZE
    getAllCorners({ index }) {
        let leftExist = true;
        let rightExist = true;
        let topExist = true;
        let bottomExist = true;
        if (index % this.width === 0) {
            leftExist = false;
        } else if ((index + 1) % this.width === 0) {
            rightExist= false;
        }

        if ((index - this.width) < 0 && (index - (this.width + 1)) < 0 && (index - (this.width + 2)) < 0) {
            topExist = false;
        } else if ((index + this.width) >= this.tileAmount ) {
            bottomExist = false;
        }

        
        let topLeft = leftExist ? topExist ? Math.floor((index - this.width)) - 1: "" : ""; 
        let topCenter = topExist ? Math.floor((index - this.width)) : "";
        let topRight = rightExist ? topExist ? Math.floor((index - this.width)) + 1: "": "";
        let left = leftExist ? index - 1: "";
        let right = rightExist ? index + 1: "";
        let bottomLeft = leftExist ? bottomExist ? Math.floor((index + this.width)) - 1: "" : ""; 
        let bottomCenter = bottomExist ?  Math.floor((index + this.width)) : "";
        let bottomRight = rightExist ? bottomExist ? Math.floor((index + this.width)) + 1: "": "";
        return [topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight];
    }

    getAdjacentNumber({ index }) {
        const corners = this.getAllCorners({ index: index });
        let bombCount = 0;
        console.log(this.bombIndexes);
        for (let i = 0; i < corners.length; i++) {
           
            this.bombIndexes.has(corners[i])? bombCount += 1: "";
        }
        return bombCount;
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