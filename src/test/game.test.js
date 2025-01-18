/* eslint-disable no-undef */
import { MineSweeper } from "../GameScripts/Game";


describe('MineSweeperGameCornerChecker', () => {  

    beforeEach(() => {
        MineSweeper.setHeightWidth({height: 5, width: 5});
    });


    test('Get the corners of the tile with complete sides.', () => {
        const result = MineSweeper.getAllCorners({index: 6});
        const expectedResult = [0,1,2,5,7,10,11,12];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no left side.', () => {
        const result = MineSweeper.getAllCorners({index: 5});
        const expectedResult = [0,1,6,10,11];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no right side.', () => {
        const result = MineSweeper.getAllCorners({index: 9});
        const expectedResult = [3,4,8,13,14];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no top side.', () => {
        const result = MineSweeper.getAllCorners({index: 2});
        const expectedResult = [1,3,6,7,8];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no bottom side.', () => {
        const result = MineSweeper.getAllCorners({index: 21});
        const expectedResult = [15,16,17,20,22];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no left and top side.', () => {
        const result = MineSweeper.getAllCorners({index: 0});
        const expectedResult = [1,5,6];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no right and top side.', () => {
        const result = MineSweeper.getAllCorners({index: 4});
        const expectedResult = [3,8,9];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no left and bottom side.', () => {
        const result = MineSweeper.getAllCorners({index: 20});
        const expectedResult = [15,16,21];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })

    test('Get the corners of the tile with no right and bottom side.', () => {
        const result = MineSweeper.getAllCorners({index: 24});
        const expectedResult = [18,19,23];
        console.log("result", result)
        expect(result).toEqual(expectedResult);
    })





    
})