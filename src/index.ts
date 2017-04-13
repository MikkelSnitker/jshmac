export interface HashStatic {
    hash(data: Uint8Array): Uint8Array;
    BLOCK_LENGTH: number;
}


const IPAD = 0x36;
const OPAD = 0x5C;

export default class {
    constructor(public hash: HashStatic) {

    }

    public sign(key: Uint8Array, message: Uint8Array): Uint8Array {

        if (key.byteLength > this.hash.BLOCK_LENGTH) {
            key = this.hash.hash(key);
        }
        const algKey = new Uint8Array(this.hash.BLOCK_LENGTH);

        for (let i = 0; i < key.length; i++)
            algKey[i] = key[i];

        const ipad = new Uint8Array(this.hash.BLOCK_LENGTH).fill(IPAD).map((x, index) => x ^ algKey[index]);
        const opad = new Uint8Array(this.hash.BLOCK_LENGTH).fill(OPAD).map((x, index) => x ^ algKey[index]);

        const a = new Uint8Array(ipad.byteLength + message.byteLength);
        a.set(ipad);
        a.set(message, ipad.byteLength);

        const b = this.hash.hash(a);
        const c = new Uint8Array(opad.byteLength + b.byteLength);
        c.set(opad);
        c.set(b, opad.byteLength);

        return this.hash.hash(c)
    }
}

