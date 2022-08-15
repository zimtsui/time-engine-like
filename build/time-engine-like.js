"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancellable = exports.TimeEngineLike = void 0;
const manual_promise_1 = require("@zimtsui/manual-promise");
const autobind_decorator_1 = require("autobind-decorator");
class TimeEngineLike {
    /**
     * @decorator boundMethod
     */
    sleep(ms) {
        return new Cancellable(ms, this);
    }
}
__decorate([
    autobind_decorator_1.boundMethod
], TimeEngineLike.prototype, "sleep", null);
exports.TimeEngineLike = TimeEngineLike;
class Cancellable {
    constructor(ms, engine) {
        this.manual = new manual_promise_1.ManualPromise();
        this.timeout = engine.setTimeout(this.manual.resolve, ms);
    }
    /**
     * @decorator boundMethod
     */
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
__decorate([
    autobind_decorator_1.boundMethod
], Cancellable.prototype, "cancel", null);
exports.Cancellable = Cancellable;
//# sourceMappingURL=time-engine-like.js.map