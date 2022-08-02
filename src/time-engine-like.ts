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

export class Cancellable extends ManualPromise<void> {
	private timeout: TimeoutLike;
	public constructor(
		ms: number,
		engine: TimeEngineLike,
	) {
		super();
		this.timeout = engine.setTimeout(
			this.resolve,
			ms,
		);
	}

	public cancel(
		err: Error = new Cancelled(),
	): void {
		this.timeout.clear();
		this.reject(err);
	}
}

export class Cancelled extends Error { }
