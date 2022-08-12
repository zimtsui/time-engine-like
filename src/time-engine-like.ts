import { ManualPromise } from '@zimtsui/manual-promise';


export abstract class TimeEngineLike {
	public abstract setTimeout(
		cb: () => void,
		ms: number,
	): TimeoutLike;
	public abstract now(): number;
	public sleep(ms: number): Cancellable {
		return new Cancellable(ms, this);
	}
}

export interface TimeoutLike {
	clear(): void;
}

export class Cancellable implements PromiseLike<void> {
	private timeout: TimeoutLike;
	private manual = new ManualPromise<void>();

	public constructor(
		ms: number,
		engine: TimeEngineLike,
	) {
		this.timeout = engine.setTimeout(
			this.manual.resolve,
			ms,
		);
	}

	public cancel(err: Error): void {
		this.timeout.clear();
		this.manual.reject(err);
	}

	public then<TResult1 = void, TResult2 = never>(
		onFulfilled: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined,
		onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined,
	): Promise<TResult1 | TResult2> {
		return this.manual.then(onFulfilled, onRejected);
	}

	public catch<TResult2>(
		onRejected: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined,
	): Promise<void | TResult2> {
		return this.manual.catch(onRejected);
	}

	public finally(onFinally: () => void): Promise<void> {
		return this.manual.finally(onFinally);
	}
}
