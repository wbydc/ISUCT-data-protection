import IEncoder from "../common/IEncoder";
import Encoder from "../encoders/lab2/Encoder";

describe("Test lab2 encoder", () => {
    const source: Buffer = Buffer.from("encode this message");
    const sourceEncoded: Buffer = Buffer.from([
        0x9d, 0xa0, 0x96, 0xa4, 0x98, 0x9b, 0x57,
        0xa5, 0xa0, 0x9b, 0xa6, 0x55, 0xa1, 0x9b,
        0xaa, 0xa4, 0x99, 0x99, 0x98
    ]);
    const key: Buffer = Buffer.from("82354671");
    const encoder: IEncoder = new Encoder();

    it("should encode source", async () => {
        const encoded: Buffer = encoder.encode(source, key);

        expect(encoded).toEqual(sourceEncoded);
    });

    it("should decode encripted", async () => {
        const decoded: Buffer = encoder.decode(sourceEncoded, key);

        expect(decoded).toEqual(source);
    });
});