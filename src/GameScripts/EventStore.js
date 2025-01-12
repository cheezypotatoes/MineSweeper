

class Event_Store {
    constructor() {
        self.store = []
    }

    add(index, isBomb) {
        const event = {
            index: index,
            isBomb: isBomb,
        };

        self.store.push(event);
    }

    getEvents() {
        return this.store;
    }
}

const EventStore = Event_Store()

export { EventStore };