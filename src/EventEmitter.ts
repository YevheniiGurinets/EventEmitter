export abstract class EventEmitterBase<Events, K = keyof Events|symbol> {
    abstract addListener(event: K, listener: (...args: any[]) => void): this;
    abstract on(event: K, listener: (...args: any[]) => void): this;
    abstract once(event: K, listener: (...args: any[]) => void): this;
    abstract removeListener(event: K, listener: (...args: any[]) => void): this;
    abstract removeAllListeners(event?: K): this;
    abstract setMaxListeners(n: number): this;
    abstract getMaxListeners(): number;
    abstract listeners(event: K): Function[];
    abstract emit(event: K, ...args: any[]): boolean;
    abstract listenerCount(type: K): number;
    // Added in Node 6...
    abstract prependListener(event: K, listener: (...args: any[]) => void): this;
    abstract prependOnceListener(event: K, listener: (...args: any[]) => void): this;
    abstract eventNames(): (K)[];
}
