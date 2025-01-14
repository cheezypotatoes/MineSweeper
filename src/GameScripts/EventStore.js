

class Event_Store {
    constructor() {
        self.store = []
    }

    add({ Event }) {
        self.store.push(Event);
    }

    getEvents() {
        return this.store;
    }
}

const EventStore = Event_Store()

export { EventStore };