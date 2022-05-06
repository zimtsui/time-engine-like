export interface TimeEngineLike {
    setTimeout(cb: () => void, ms: number): TimeoutLike;
    now(): number;
}
export interface TimeoutLike {
    clear(): void;
}
