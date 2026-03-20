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
exports.logParser = void 0;
// Log Parser 
const logParser = (stream) => __awaiter(void 0, void 0, void 0, function* () {
    const { raw } = stream;
    const regex = /^(\S+) (\S+) (\S+) \[(.*?)\] "((\S+) (\S+) (\S+))" (\d{3}) (\d+|-) "(.*?)" "(.*?)"/;
    const match = raw.match(regex);
    if (match) {
        const parsed = {
            "ip_addr": match[1],
            "date_time": match[4],
            "Request": {
                method: match[6],
                path: match[7],
                version: match[8]
            },
            "status_code": parseInt(match[9]),
            "size": match[10] === '-' ? 0 : parseInt(match[10]),
            "user_agent": match[12]
        };
        stream.data = parsed;
        return;
    }
});
exports.logParser = logParser;
