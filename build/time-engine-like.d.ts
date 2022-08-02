import { ManualPromise } from '@zimtsui/manual-promise';
export declare abstract class TimeEngineLike {
    abstract setTimeout(cb: () => void, ms: number): TimeoutLike;
    abstract now(): number;
    sleep(ms: number): Cancellable;
}
export interface TimeoutLike {
    clear(): void;
}
export declare class Cancellable extends ManualPromise<void> {
    private timeout;
    constructor(ms: number, engine: TimeEngineLike);
    cancel(err?: Error): void;
}
export declare class Cancelled extends Error {
}
