/* eslint-disable no-undef */
import { EventStore } from "../GameScripts/EventStore/EventStore";
import { MineSweeper } from "../GameScripts/Game";

describe('EventStore', () => {

    beforeEach(() => {
        EventStore.clearEvents();
    });

    test('Check if the tile uncovered event store successfully stored the event.', () => {
        const randomIndex = Math.floor(Math.random() * 100);
        const id = MineSweeper.TilePressed({ index: randomIndex });
        const Event = EventStore.getSpecificEvent({ EventId: id });
        console.log(`Random Index: ${randomIndex}`);
        console.log(`Event ID: ${id}`);
        console.log("Event Found:", Event);

        expect(Event).not.toBeNull();
    })

    test('Check if the event store event list works. (1)', () => {
        const randomIndex = Math.floor(Math.random() * 100);
        MineSweeper.TilePressed({ index: randomIndex });
        const eventList = EventStore.getEvents();
        expect(eventList.length).toBeGreaterThan(0);
    })

    test('Check if the event store event list works. (2)', () => {

        for (let i = 1; i <= 2; i++) {
            const randomIndex = Math.floor(Math.random() * 100);
            MineSweeper.TilePressed({ index: randomIndex });
            console.log("Added event")
        }
    
        const eventList = EventStore.getEvents();
        console.log(eventList)
        expect(eventList.length).toBe(2);
    })


  })
    