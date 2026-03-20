"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEngine = void 0;
class AppEngine {
    constructor(dataStreams) {
        this.processes = [];
        this.dataStreams = dataStreams;
    }
    register(func) {
        this.processes.push(func);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const stream of this.dataStreams.streams) {
                for (const process of this.processes) {
                    if ((process === null || process === void 0 ? void 0 : process.name) === (stream === null || stream === void 0 ? void 0 : stream.log_name)) {
                        yield process.func(stream);
                    }
                }
            }
        });
    }
}
exports.AppEngine = AppEngine;
