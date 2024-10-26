"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyRequestMessage = void 0;
var getKeyRequestMessage = function (address, expiredAt) {
    return "key request for ".concat(address, " expired at ").concat(expiredAt);
};
exports.getKeyRequestMessage = getKeyRequestMessage;
