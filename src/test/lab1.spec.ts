import IEncoder from "../common/IEncoder";
import Encoder from "../encoders/lab1/Encoder";

describe("Test lab1 encoder", () => {
    const source: Buffer = Buffer.from("encode this message");
    const sourceEncoded: Buffer = Buffer.from("ts nigcsedm o  ee  s eha");
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
