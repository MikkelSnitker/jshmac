export interface HashStatic {
    hash(data: Uint8Array): Uint8Array;
    BLOCK_LENGTH: number;
}
export default class  {
    hash: HashStatic;
    constructor(hash: HashStatic);
    sign(key: Uint8Array, message: Uint8Array): Uint8Array;
}
