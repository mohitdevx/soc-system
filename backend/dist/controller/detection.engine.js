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
exports.dectectionEngine = void 0;
class dectectionEngine {
    constructor(dataStreams) {
        this.processes = [];
        this.dataStreams = dataStreams;
    }
    register(func) {
        this.processes.push(func);
    }
    run() {
        this.dataStreams.streams.forEach((stream) => {
            this.processes.forEach((process) => __awaiter(this, void 0, void 0, function* () {
                if ((process === null || process === void 0 ? void 0 : process.name) === (stream === null || stream === void 0 ? void 0 : stream.log_name)) {
                    // console.log(stream.data)
                    yield process.func(stream);
                }
            }));
        });
    }
}
exports.dectectionEngine = dectectionEngine;
