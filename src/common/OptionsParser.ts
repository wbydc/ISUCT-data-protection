import * as fs from 'fs';

import * as encoders from '../encoders';

export type Operation = 'encode' | 'decode' | 'both';

export interface Options {
    /**
     * @property what to do with source
     */
    operation: Operation;
    /**
     * @property encoder name
     */
    encoder: string;
    /**
     * @property source
     */
    source: Buffer; 
    /**
     * @property key
     */
    key: Buffer;
    /**
     * @property filename of source (if file)
     */
    sourceFile?: string;
}

export default class OptionsParser {
    /**
     * Parse arguments into program options
     * 
     * @param args process arguments 
     * @returns program options
     */
    public parse(args: string[]): Options {
        const operation: string | void = args.shift();
        if (!operation || operation !== 'encode' && operation !== 'decode' && operation !== 'both') {
            throw new Error('Please pass proper operation');
        }

        const encoder: string | void = args.shift();
        if (!encoder || !encoders.default[encoder]) {
            throw new Error('Please pass proper endcoder');
        }

        const { data: source, file: sourceFile } = this.posibleFileInput(args);
        if (!source) {
            throw new Error('Please pass proper key');
        }

        const { data: key } = this.posibleFileInput(args);
        if (!key) {
            throw new Error('Please pass proper key');
        }

        return {
            operation,
            encoder,
            source,
            key,
            sourceFile,
        };
    }

    /**
     * Handle if file passed
     * 
     * @param args process arguments 
     * @returns argument data and path to file if needed
     */
    private posibleFileInput(args: string[]): { data?: Buffer, file?: string } {
        const result: { data?: Buffer, file?: string } = {};
        const input: string | void = args.shift();
        if (!input) {
            throw new Error('Please pass proper key');
        }
        if (input === '-f') {
            result.file = args.shift();
            if (!result.file) {
            throw new Error('Please pass proper file path');
            }
            result.data = fs.readFileSync(result.file);
        } else {
            result.data = Buffer.from(input);
        }
        return result;
    }
}