import { eventBus } from "./EventBus";
class MineSweeperGame {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.tileAmount = 0;
        this.bombIndexes = new Set() // Stores all index that has a bomb.
        this.adjacentCheckQueue = [] // Queue + Stack on what to check for adjacent number.
        this.checkedTiles = new Set() // Avoids rechecking the tile index (avoids StackOverflow).
    }

    setHeightWidth({ height, width }) {
        this.height = height;
        this.width = width;
        this.tileAmount = (width * height);
    }

    GenerateBomb({ amount = 2 }) {
        
        const max = this.height *  this.width

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
       
        this.bombIndexes = bombIndexSet;
        return bombIndexSet;
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
            adjacentNumber: this.getAdjacentNumber({ index: index }),
        }

        eventBus.emit("SendTileUncoveredEventToEventStore", { Event: Event });
        
        // If the index adjacent number is 0 then check it's corner if also 0.
        if (this.getAdjacentNumber({ index: index }) === 0 || this.checkedTiles.size === 0) {
            this.checkedTiles.add(index);
            this.getAllCornersThatNotInSet({index: index})
        } 
        
        return id // For unittest
    }
    
    
    getAllCornersThatNotInSet({ index }) {
        const corners = this.getAllCorners({index: index});
        for (let i = 0; i < corners.length; i++) {
            if (!this.checkedTiles.has(corners[i])) {
                this.adjacentCheckQueue.push(corners[i]);
                this.checkedTiles.add(corners[i])
            }
        }
    }

    // When changing the code while running, all tiles will go adjacent 0 due to react moment
    createEventForTilesWithZeroAdjacentCheckQueue() {
        while (this.adjacentCheckQueue.length > 0) {
            const currentPop = this.adjacentCheckQueue.shift();
            if (this.bombIndexes.has(currentPop)) {
                continue;
            }
            this.TilePressed({index: currentPop})
        }    
    }

    getAllCorners({ index }) {
        // N = index
        // Left does not exist if N is divisible by width.
        // Right does not exist if (N + 1) is divisible by width.
        // Top does not exist if (N - width) && (N - width + 1) && (N - width + 2) is negative, since some part can only have 1-2 top tiles.
        // Bottom does not exist if (N + width > tile).

        let leftExist = index % this.width === 0? false : true
        let rightExist = (index + 1) % this.width === 0? false : true
        let topExist = (index - this.width) < 0 && (index - (this.width + 1)) < 0 && (index - (this.width + 2)) < 0? false : true
        let bottomExist = (index + this.width) >= this.tileAmount? false : true
        
        let topLeft = leftExist ? topExist ? Math.floor((index - this.width)) - 1: "" : ""; 
        let topCenter = topExist ? Math.floor((index - this.width)) : "";
        let topRight = rightExist ? topExist ? Math.floor((index - this.width)) + 1: "": "";
        let left = leftExist ? index - 1: "";
        let right = rightExist ? index + 1: "";
        let bottomLeft = leftExist ? bottomExist ? Math.floor((index + this.width)) - 1: "" : ""; 
        let bottomCenter = bottomExist ?  Math.floor((index + this.width)) : "";
        let bottomRight = rightExist ? bottomExist ? Math.floor((index + this.width)) + 1: "": "";
        
        // Get rid of "" using filter.
        return [topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight].filter(item => item !== "");;
    }

    getAdjacentNumber({ index }) {
        const corners = this.getAllCorners({ index: index });
        let bombCount = 0;
        
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