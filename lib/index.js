"use strict";
var IPAD = 0x36;
var OPAD = 0x5C;
var default_1 = (function () {
    function default_1(hash) {
        this.hash = hash;
    }
    default_1.prototype.sign = function (key, message) {
        if (key.byteLength > this.hash.BLOCK_LENGTH) {
            key = this.hash.hash(key);
        }
        var algKey = new Uint8Array(this.hash.BLOCK_LENGTH);
        for (var i = 0; i < key.length; i++)
            algKey[i] = key[i];
        var ipad = new Uint8Array(this.hash.BLOCK_LENGTH).fill(IPAD).map(function (x, index) { return x ^ algKey[index]; });
        var opad = new Uint8Array(this.hash.BLOCK_LENGTH).fill(OPAD).map(function (x, index) { return x ^ algKey[index]; });
        var a = new Uint8Array(ipad.byteLength + message.byteLength);
        a.set(ipad);
        a.set(message, ipad.byteLength);
        var b = this.hash.hash(a);
        var c = new Uint8Array(opad.byteLength + b.byteLength);
        c.set(opad);
        c.set(b, opad.byteLength);
        return this.hash.hash(c);
    };
    return default_1;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=index.js.map