/* eslint-disable no-undef */
import { eventBus } from '../GameScripts/EventBus/EventBus';



describe('Projection', () => {
   

    test('Check if TileUncoveredProjection successfully resets', () => {
            eventBus.emit("TilePressed", {index: 1});
            eventBus.emit("TilePressed", {index: 2});
            eventBus.emit("TilePressed", {index: 3});
            eventBus.emit("TilePressed", {index: 4});
            eventBus.emit("ResetEntireData");
            const events = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "UncoveredTile", MethodName: "returnEvents"});
        
            console.log("Events: ", events);
            expect(events).toEqual([]);
    });


    test('Check if TileUncoveredProjection successfully adds events', () => {
            eventBus.emit("TilePressed", {index: 1});
            eventBus.emit("TilePressed", {index: 2});
            eventBus.emit("TilePressed", {index: 3});
            eventBus.emit("TilePressed", {index: 4});
            const events = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "UncoveredTile", MethodName: "returnEvents"});
            console.log("Events: ", events);
            expect(events.length).toEqual(4);
    });

    test('Check if TileFlaggedProjection successfully resets', () => {
            eventBus.emit("CreateFlagEvent", {index: 1});
            eventBus.emit("CreateFlagEvent", {index: 2});
            eventBus.emit("CreateFlagEvent", {index: 3});
            eventBus.emit("CreateFlagEvent", {index: 4});
            eventBus.emit("ResetEntireData");
            const size = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnEventProjectionSize"});

            console.log("Size: ", size);
            expect(size).toEqual(0);
    });

    test('Check if TileFlaggedProjection successfully adds events', () => {
        eventBus.emit("CreateFlagEvent", {index: 1});
        eventBus.emit("CreateFlagEvent", {index: 2});
        eventBus.emit("CreateFlagEvent", {index: 3});
        eventBus.emit("CreateFlagEvent", {index: 4});
        const size = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnEventProjectionSize"});
        console.log("Size: ", size);
        expect(size).toEqual(4);
});


    
})
 