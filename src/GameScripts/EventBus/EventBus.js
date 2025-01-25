import BootStrapList from "./EventBootStrap";

class EventBus {
    constructor() {
        this.events = {};
    }

    peek() {
        Object.values(this.events).forEach((FunctionArray) => {
            console.log(FunctionArray);
        });
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
          this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        let returnData = [];

        if (this.events[event]) {
            returnData = this.events[event].map(callback => callback(data));
        }
        return returnData.length === 1 ? returnData[0] : returnData
    }

    unsubscribe(event, callback) {
        if (!this.events[event]) return;

        const eventIndex = this.events[event].indexOf(callback);
        if (eventIndex !== -1) {
            this.events[event].splice(eventIndex, 1);
        }
    }
}

const eventBus = new EventBus();

BootStrapList.forEach((func, key) => {
    eventBus.subscribe(key, func);
});

export {eventBus};