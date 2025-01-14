/* eslint-disable no-undef */
import { EventStore } from "../GameScripts/EventStore";
import { MineSweeper } from "../GameScripts/Game";

describe('EventStore', () => {
    test('Check if tile uncovered event store is successfully store the event', () => {
        const randomIndex = Math.floor(Math.random() * 100);
        const id = MineSweeper.TilePressed({ index: randomIndex });
        const Event = EventStore.getSpecificEvent({ EventId: id });
        console.log(`Random Index: ${randomIndex}`);
        console.log(`Event ID: ${id}`);
        console.log("Event Found:", Event);

        expect(Event).not.toBeNull();

    })
  })
    