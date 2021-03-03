import IEncoder from "../../common/IEncoder";

type Byte = number;
type ByteTable = Byte[][];

type ReorderMapItem = { value: Byte, index: number };

export default class Encoder implements IEncoder {
    encode(source: Buffer, key: Buffer): Buffer {
        const table: ByteTable = this.toByteTable(source, key, true);
        
        const result: Byte[] = table.reduce(
            (col: Byte[], acc: Byte[]) => [...col, ...acc],
            [] as Byte[]
        );

        return Buffer.from(result);
    }
    decode(source: Buffer, key: Buffer): Buffer {
        const table: ByteTable = this.toByteTable(source, key, false);

        const result: Byte[] = [];
        for (let i: number = 0; i < table[0].length; i++) {
            for (let j: number = 0; j < table.length; j++) {
                result.push(table[j][i]);
            }
        }
        // trim spaces at the end
        for (let i: number = result.length - 1; i > 0; i--) {
            if (result[i] === 32) {
                result.pop();
            } else {
                break;
            }
        }

        return Buffer.from(result);
    }

    /**
     * Creates table of Bytes and reorders it according to key
     * 
     * @param source data to map
     * @param key encryption key
     * @param en encode/decode flag, flips table fill logic
     */
    private toByteTable(source: Buffer, key: Buffer, en: Boolean): ByteTable {
        const cols: number = key.length;
        const rows: number = Math.ceil(source.length / cols);
        const table: ByteTable = Array(cols).fill([]).map(() => Array(rows) as number[]);
        
        for (let j: number = 0; j < rows; j++) {
            for (let i: number = 0; i < cols; i++) {
                const index = en ? (j * cols + i) : (i * rows + j);
                table[i][j] = source[index] || 32;
            }
        }

        const map: ReorderMapItem[] = [];
        for (let i: number = 0; i < key.length; i++) {
            map.push({
                value: key[i],
                index: i,
            });
        }
        map.sort((a: ReorderMapItem, b: ReorderMapItem): number => {
            return a.value === b.value ? 0 : (a.value < b.value) ? -1 : 1;
        });

        const orderedTable: ByteTable = Array(table.length) as ByteTable;
        for (let i: number = 0; i < key.length; i++) {
            orderedTable[map[i].index] = table[i];
        }

        return orderedTable;
    }
}