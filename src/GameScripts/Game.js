import { eventBus } from "./EventBus";

class MineSweeperGame {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.tileAmount = 0;
        this.bombIndexes = new Set()
        this.adjacentCheckQueue = []
        this.checkedTiles = new Set()
    }

    setHeightWidth({ height, width }) {
        this.height = height;
        this.width = width;
        this.tileAmount = (width * height);
    }

    GenerateBomb() {
        const generatedBombIndexSet = eventBus.emit("GenerateBombs", {max: this.height * this.width, amount: 2});
        this.bombIndexes = generatedBombIndexSet;
    }

    TilePressed({ index }) {
        console.log("DEALING,")
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
        
        // If the index is 0 then check it's corner if also 0
        if (this.getAdjacentNumber({ index: index }) === 0) {
            this.checkedTiles.add(index);
            this.getAllCornersThatNotInSet({index: index})
            
        }
        
        

        return id // For unittest
    }
    
    //TODO: THIS ONLY PUT STUFF THAT CORNERS WITH ADJACENT 0
    getAllCornersThatNotInSet({ index }) {
        const corners = this.getAllCorners({index: index});
        for (let i = 0; i < corners.length; i++) {
            if (!this.checkedTiles.has(corners[i])) {
                this.adjacentCheckQueue.push(corners[i]);
                this.checkedTiles.add(corners[i])
            }
        }
        
        
    }




    checker() {
        while (this.adjacentCheckQueue.length > 0) {
            const currentPop = this.adjacentCheckQueue.shift();
            if (this.getAdjacentNumber({ index: currentPop }) === 0) {
                console.log(currentPop)
                // TODO: DOES NOT GET RID OF TILES MAKE A DIFFERENT ONE OR CALL IT ON TILE COMPONENT
                this.TilePressed({index: currentPop})
            }
        }
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
        
        const array = [topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight];
        const filteredArray = array.filter(item => item !== "");
        return filteredArray;
    }

    CheckIfCornerIsNotOnTheCheckTilesSet({ corners }) {
        const result = [];
        for (const corner of corners) {
            if (!this.checkedTiles.has(corner)) {
                result.push(corner);
            }
        }
        return result;
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