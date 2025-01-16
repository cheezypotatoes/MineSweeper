import { eventBus } from "./EventBus";

class Event_Store {
    constructor() {
        this.store = []
    }

    addLatestEventToProjectionManager({ Event }) {
        this.store.push(Event);
        eventBus.emit("ApplyEventToProjectionManager", { Event: this.getLatestEvent() })
    }

    getSpecificEvent({ EventId }) {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].id === EventId) {
                return this.store[i];
            }
        }
        return null;
    }

    getEvents() {
        return this.store;
    }

    getLatestEvent() {
        return this.store[this.store.length - 1]
    }
}

const EventStore = new Event_Store()

export { EventStore };