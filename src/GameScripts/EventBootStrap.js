const BootStrapList = new Map();


const TilePressed = ({ index }) => {
    console.log(`Tile index: ${index} was pressed`);
};

const GenerateBombs = ({max, amount}) => {
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

BootStrapList.set("TilePressed", TilePressed);
BootStrapList.set("GenerateBombs", GenerateBombs);


export default BootStrapList;





