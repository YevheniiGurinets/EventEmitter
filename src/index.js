class EventEmitter {
    constructor() {}

    addListener(event, listener) {};
    on(event, listener) {};
    once(event, listener) {};
    removeListener(event, listener) {};
    removeAllListeners(event) {};
    setMaxListeners(n) {};
    getMaxListeners() {};
    listeners(event) {};
    emit(event, ...args) {};
    listenerCount(type) {};
    prependListener(event, listener) {};
    prependOnceListener(event, listener) {};
    eventNames() {};
}

module.exports = EventEmitter;
