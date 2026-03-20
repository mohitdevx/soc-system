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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteAction = exports.bruteForceDectection = void 0;
const redis_1 = require("../config/redis");
const axios_1 = __importDefault(require("axios"));
// BrutFoce Detection System 
const bruteForceDectection = (stream) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('this funcion called');
    const { ip_addr, date_time } = stream.data;
    const clinet = yield redis_1.redis;
    const value = yield clinet.json.get(ip_addr);
    if (value) {
        yield clinet.json.numIncrBy(ip_addr, '.count', 1);
        yield clinet.json.set(ip_addr, '.lastseen', date_time);
        const current = yield clinet.json.get(ip_addr, { path: ".count" });
        if (current >= 5) {
            console.log("brute force dectected !");
            stream.signal = true;
            console.log("this is signal", stream.signal);
            stream.data = {
                action: `sudo iptables -A INPUT -s ${ip_addr} -j DROP`
            };
            return;
        }
    }
    else {
        yield clinet.json.set(ip_addr, '.', {
            count: 1,
            datetime: date_time
        });
    }
});
exports.bruteForceDectection = bruteForceDectection;
const bruteAction = (stream_1, ...args_1) => __awaiter(void 0, [stream_1, ...args_1], void 0, function* (stream, urls = []) {
    console.log(stream === null || stream === void 0 ? void 0 : stream.signal);
    if (!stream.signal) {
        console.log("no signal found!");
        return;
    }
    yield axios_1.default.post('http://localhost:5000/agent/action', stream.data).then((res) => {
        console.log(`This Request is from action =>`, res.data);
    }).catch((err) => {
        console.log(err);
    });
});
exports.bruteAction = bruteAction;
