"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancelled = exports.Cancellable = exports.TimeEngineLike = void 0;
const manual_promise_1 = require("@zimtsui/manual-promise");
class TimeEngineLike {
    sleep(ms) {
        return new Cancellable(ms, this);
    }
}
exports.TimeEngineLike = TimeEngineLike;
class Cancellable extends manual_promise_1.ManualPromise {
    constructor(ms, engine) {
        super();
        this.timeout = engine.setTimeout(this.resolve, ms);
    }
    cancel(err = new Cancelled()) {
        this.timeout.clear();
        this.reject(err);
    }
}
exports.Cancellable = Cancellable;
class Cancelled extends Error {
}
exports.Cancelled = Cancelled;
//# sourceMappingURL=time-engine-like.js.map