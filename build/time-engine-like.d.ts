export declare abstract class TimeEngineLike {
    abstract setTimeout: (cb: () => void, ms: number) => TimeoutLike;
    abstract now: () => number;
    sleep: (ms: number) => Cancellable;
}
export interface TimeoutLike {
    clear(): void;
}
export declare class Cancellable implements PromiseLike<void> {
    private timeout;
    private manual;
    constructor(ms: number, engine: TimeEngineLike);
    cancel(err: Error): void;
    then<TResult1 = void, TResult2 = never>(onFulfilled: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult2>(onRejected: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<void | TResult2>;
    finally(onFinally: () => void): Promise<void>;
}
