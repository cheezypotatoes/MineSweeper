import { eventBus } from "./EventBus/EventBus";
class MineSweeperGame {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.tileAmount = 0;
        this.bombIndexes = new Set() // Stores all index that has a bomb.
        this.adjacentCheckQueue = [] // Queue + Stack on what to check for adjacent number.
        this.checkedTiles = new Set() // Avoids rechecking the tile index (avoids StackOverflow).
        this.BombUncovered = false;
        this.tileUncoveredAmount = 0;
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

    ReRandomizedSpecificBomb({ index }) {
        if (!this.bombIndexes.has(index)) {return;}
        this.bombIndexes.delete(index);
        let newBombIndex = Math.floor(Math.random() * this.tileAmount);
        while (this.bombIndexes.has(newBombIndex)) {
            newBombIndex = Math.floor(Math.random() * this.tileAmount);
        }
        this.bombIndexes.add(newBombIndex);
    }

    TilePressed({ index, automaticUncovered }) {
        if (this.BombUncovered) {return;}
        this.tileUncoveredAmount++;
        const id = `id_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
        let Event = {
            id: id,
            type: "UncoveredTile",
            automaticUncovered: automaticUncovered === undefined? false : true,
            index: index,
            timeStamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            isBomb: this.bombIndexes.has(index) ? true: false,
            adjacentNumber: this.getAdjacentNumber({ index: index }),
        }

        if (this.checkedTiles.size === 0 && this.bombIndexes.has(index)) { 
            console.log("FIST BOMB")
            this.ReRandomizedSpecificBomb({ index: index });
        } else if (this.bombIndexes.has(index)) {
            this.BombUncovered = true
        }
        
        eventBus.emit("SendTileUncoveredEventToEventStore", { Event: Event });
        eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "ifIndexIsFlaggedTrueThenUnflag", Data:{index: index}});
        // If the index adjacent number is 0 then check it's corner if also 0.
        if ((this.getAdjacentNumber({ index: index }) === 0 || this.checkedTiles.size === 0) && !this.BombUncovered) {
            this.checkedTiles.add(index);
            this.getAllCornersThatNotInSet({index: index});
        } 

        

        
        
        return id; // For unittest
    }

    CreateFlagEvent({ index }) { 
        const Event = {
            type: "FlaggedTile",
            id: `id_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
            index: index,
            isFlagged: true,
            timeStamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        };
        eventBus.emit("SendTileUncoveredEventToEventStore", { Event: Event });
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
            this.TilePressed({index: currentPop, automaticUncovered: true});
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

    returnGameStatus() {
        const flaggedTilesAmount = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnEventProjectionSize"});
        const tilesNeedToUncovered = this.tileAmount - this.bombIndexes.size;
        // If all tiles required to be uncovered is equal to the amount of tiles that are uncovered then return true.
        const requiredTileToUncovered = tilesNeedToUncovered === this.tileUncoveredAmount? true : false;
        // If all tiles required to be flagged is equal to the amount of tiles that are flagged then return true.
        // TODO: Might not be needed since the game will end if all tiles are uncovered.
        const tileNeedToBeFlagged = tilesNeedToUncovered + flaggedTilesAmount === this.tileAmount? true : false; 
        const IfWin = (requiredTileToUncovered && tileNeedToBeFlagged) ? true : false;
        return this.BombUncovered? "Lost": IfWin? "Win": "Playing";
    }

    // TODO: Make an array of functions that will be called when the game is reset.
    resetGame() {
        this.bombIndexes = new Set();
        this.adjacentCheckQueue = [];
        this.checkedTiles = new Set();
        this.BombUncovered = false;
        this.tileUncoveredAmount = 0;
    }
}

const MineSweeper = new MineSweeperGame();

export { MineSweeper };