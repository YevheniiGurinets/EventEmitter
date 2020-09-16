const EventEmitter = require('../index')

describe('EventEmitter', () => {
  let instance;
  beforeEach(() => {
    instance = new EventEmitter();
  })

  test('addListener, on, emit', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    instance
      .addListener('myEvent', listener)
      .on('myEvent', cb)

    instance.emit('myEvent', 1, 2, 3)
    expect(listener).toHaveBeenCalledWith(1,2,3)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(1,2,3)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('removeListener', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    instance.addListener('qwe', listener)
    instance.addListener('qwe', cb)

    instance.emit('qwe')
    expect(instance.emit('qwe')).toBe(true);

    expect(instance.emit('eweqweqweqwe')).toBe(false);

    instance.removeListener('qwe', cb);

    instance.emit('qwe')
    expect(listener).toHaveBeenCalledTimes(3)
    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('once', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    instance
      .once('myEvent', listener)
      .once('myEvent', cb)

    expect(instance.emit('myEvent', 1, 2)).toBe(true);
    expect(instance.emit('myEvent', 1, 2)).toBe(false);

    expect(listener).toHaveBeenCalledWith(1,2)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(1,2)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('once - removeListener', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    const once = jest.fn();
    instance
      .on('myEvent', listener)
      .once('myEvent', listener)
      .once('myEvent', cb)
      .once('once', once)

    expect(instance.emit('myEvent')).toBe(true);
    expect(instance.emit('myEvent')).toBe(true);

    expect(listener).toHaveBeenCalledTimes(3)
    expect(cb).toHaveBeenCalledTimes(1)

    instance.removeListener('myEvent', listener)
    expect(instance.emit('myEvent')).toBe(false);
    expect(listener).toHaveBeenCalledTimes(3)

    instance.removeListener('once', once)
    expect(instance.emit('once')).toBe(false);
    expect(once).toHaveBeenCalledTimes(0)
  })

  test('listenerCount', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    instance
      .once('myEvent', listener)
      .once('myEvent', cb)
      .addListener('myEvent', () => {})
      .on('myEvent', () => {})
      .addListener('on', () => {})
      .on('on', () => {})

    expect(instance.listenerCount('myEvent')).toBe(4);
    expect(instance.listenerCount('on')).toBe(2);
  })

  test('eventNames', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    instance
      .once('myEvent', listener)
      .once('myEvent', cb)
      .addListener('myEvent', () => {})
      .on('myEvent', () => {})
      .addListener('on', () => {})
      .on('on', () => {})

    expect(instance.eventNames()).toBe(['myEvent', 'on']);
  })

  test('listeners', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    const noop = () => {};
    instance
      .once('myEvent', listener)
      .addListener('myEvent', cb)
      .on('myEvent', noop)

    expect(instance.listeners('myEvent')).toBe([listener, cb, noop]);
  })

  test('listeners', () => {
    const listener = jest.fn();
    const cb = jest.fn();
    const noop = () => {};
    instance
      .once('myEvent', listener)
      .addListener('myEvent', cb)
      .on('myEvent', noop)

    instance.removeAllListeners('myEvent');
    expect(instance.emit('myEvent')).toBe(false);
  })
});
