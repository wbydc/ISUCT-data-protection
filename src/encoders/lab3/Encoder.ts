import IEncoder from "../../common/IEncoder";

export default class Encoder implements IEncoder {
    encode(source: Buffer, key: Buffer): Buffer {
        const result: Uint8Array = source.map(
            (byte: number, index: number) =>
                byte ^ key[index % key.length]
        );

        return Buffer.from(result);
    }
    decode(source: Buffer, key: Buffer): Buffer {
        return this.encode(source, key);
    }
};