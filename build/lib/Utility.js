"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest = require("restler");
const MIN_REQUEST_DELAY = 500;
const MAX_REQUEST_DELAY = 7000;
exports.makeRequest = function (fn, uri, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let completeCallback = (res, response) => {
                // in case we hit HTTP 429, delay requests by random timeout in between minRequestDelay and maxRequestDelay
                // http://help.trello.com/article/838-api-rate-limits
                if (response && response.statusCode === 429) {
                    setTimeout(() => {
                        fn(uri, options).once('complete', completeCallback);
                    }, Math.floor(Math.random() * (MAX_REQUEST_DELAY - MIN_REQUEST_DELAY)) + MIN_REQUEST_DELAY);
                }
                else if (res instanceof Error) {
                    reject(res);
                }
                else {
                    resolve(res);
                }
            };
            fn(uri, options).once('complete', completeCallback);
        });
    });
};
exports.methods = {
    'post': rest.post,
    'get': rest.get,
    'put': rest.put,
    'delete': rest.del
};
