/* eslint-disable no-undef */
import { EventStore } from "../GameScripts/EventStore";
import { MineSweeper } from "../GameScripts/Game";

describe('EventStore', () => {
    test('Check if tile uncovered event store is successfully store the event', () => {
        const id = MineSweeper.TilePressed({ index: 1 });
        const Event = EventStore.getSpecificEvent({ EventId: id });
        console.log(`Event ID: ${id}`)
        console.log("Event Found:", Event);

        expect(Event).not.toBeNull();

    })
  })
    