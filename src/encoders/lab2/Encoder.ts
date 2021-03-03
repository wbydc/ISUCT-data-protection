import IEncoder from "../../common/IEncoder";

export default class Encoder implements IEncoder {
    encode(source: Buffer, key: Buffer): Buffer {
        const result: Uint8Array = source.map(
            (byte: number, index: number) =>
                (byte + key[index % key.length]) % 256
        );

        return Buffer.from(result);
    }
    decode(source: Buffer, key: Buffer): Buffer {
        const result: Uint8Array = source.map(
            (byte: number, index: number) =>
                (256 + byte - key[index % key.length]) % 256
        );
        
        return Buffer.from(result);
    }
};