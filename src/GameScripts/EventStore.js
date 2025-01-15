import { eventBus } from "./EventBus";

class Event_Store {
    constructor() {
        this.store = []
    }

    add({ Event }) {
        this.store.push(Event);
        eventBus.emit("ApplyEventToProjectionManager", { Events: this.store })
    }

    getSpecificEvent({ EventId }) {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].id === EventId) {
                return this.store[i];
            }
        }
        return null;
    }

    clearEvents() {
        this.store = [];
    }

    getEvents() {
        return this.store;
    }
}

const EventStore = new Event_Store()

export { EventStore };