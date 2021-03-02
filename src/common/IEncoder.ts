/**
 * Encoder interface
 */
export default interface IEncoder {
    /**
     * Encode function
     * 
     * @param source data to encode
     * @param key encryption key
     */
    encode(source: Buffer, key: Buffer): Buffer;
    /**
     * Decode function
     * 
     * @param source data to encode
     * @param key encryption key
     */
    decode(source: Buffer, key: Buffer): Buffer;
}