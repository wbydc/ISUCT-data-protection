import * as fs from "fs";
import IEncoder from "./common/IEncoder";
import OptionsParser, { Options } from "./common/OptionsParser";
import * as encoders from './encoders';

const args: string[] = [...process.argv].slice(2);
const options: Options = new OptionsParser().parse(args);

const encoder: IEncoder = new (encoders.default[options.encoder])();

if (options.operation === 'encode') {
    const encoded: Buffer = encoder.encode(options.source, options.key);
    if (options.sourceFile) {
        const filename = options.sourceFile + '.encoded';
        fs.writeFileSync(filename, encoded);
        console.log(`Encoded writen to ${filename}`);
    } else {
        console.log(`Encoded: ${encoded.toString()}`);
    }
}
if (options.operation === 'decode') {
    const decoded: Buffer = encoder.decode(options.source, options.key);
    if (options.sourceFile) {
        const filename = options.sourceFile + '.decoded';
        fs.writeFileSync(filename, decoded);
        console.log(`Decoded writen to ${filename}`);
    } else {
        console.log(`Decoded: ${decoded.toString()}`);
    }
}
if (options.operation === 'both') {
    const encoded: Buffer = encoder.encode(options.source, options.key);
    if (options.sourceFile) {
        const filename = options.sourceFile + '.encoded';
        fs.writeFileSync(filename, encoded);
        console.log(`Encoded writen to ${filename}`);
    } else {
        console.log(`Encoded: [${encoded.toString()}]`);
    }
    const decoded: Buffer = encoder.decode(encoded, options.key);
    if (options.sourceFile) {
        const filename = options.sourceFile + '.encoded.decoded';
        fs.writeFileSync(filename, decoded);
        console.log(`Decoded writen to ${filename}`);
    } else {
        console.log(`Decoded: [${decoded.toString()}]`);
    }
}