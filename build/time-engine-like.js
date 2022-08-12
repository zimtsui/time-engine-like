"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancellable = exports.TimeEngineLike = void 0;
const manual_promise_1 = require("@zimtsui/manual-promise");
class TimeEngineLike {
    sleep(ms) {
        return new Cancellable(ms, this);
    }
}
exports.TimeEngineLike = TimeEngineLike;
class Cancellable {
    constructor(ms, engine) {
        this.manual = new manual_promise_1.ManualPromise();
        this.timeout = engine.setTimeout(this.manual.resolve, ms);
    }
    cancel(err) {
        this.timeout.clear();
        this.manual.reject(err);
    }
    then(onFulfilled, onRejected) {
        return this.manual.then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this.manual.catch(onRejected);
    }
    finally(onFinally) {
        return this.manual.finally(onFinally);
    }
}
exports.Cancellable = Cancellable;
//# sourceMappingURL=time-engine-like.js.map