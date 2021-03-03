import IEncoder from "../common/IEncoder";
import Encoder from "../encoders/lab3/Encoder";

describe("Test lab3 encoder", () => {
    const source: Buffer = Buffer.from("eecode this message");
    const sourceEncoded: Buffer = Buffer.from([
        0x5d, 0x57, 0x50, 0x5a, 0x50, 0x53, 0x17,
        0x45, 0x50, 0x5b, 0x40, 0x15, 0x59, 0x53,
        0x44, 0x42, 0x59, 0x55, 0x56,
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
