import IEncoder from "../../common/IEncoder";

type Char = number;
type CharTable = Char[][];

type ReorderMapItem = { value: Char, index: number };

export default class Encoder implements IEncoder {
    encode(source: Buffer, key: Buffer): Buffer {
        const table: CharTable = this.toCharTable(source, key, true);
        
        const result: Char[] = table.reduce((col: Char[], acc: Char[]) => [...col, ...acc], [] as Char[]);

        return Buffer.from(result);
    }
    decode(source: Buffer, key: Buffer): Buffer {
        const table: CharTable = this.toCharTable(source, key, false);

        const result: Char[] = [];
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
     * Creates table of chars and reorders it according to key
     * 
     * @param source data to map
     * @param key encryption key
     * @param en encode/decode flag, flips table fill logic
     */
    private toCharTable(source: Buffer, key: Buffer, en: Boolean): CharTable {
        const cols: number = key.length;
        const rows: number = Math.ceil(source.length / cols);
        const table: CharTable = Array(cols).fill([]).map(() => Array(rows) as number[]);
        
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

        const orderedTable: CharTable = Array(table.length) as CharTable;
        for (let i: number = 0; i < key.length; i++) {
            orderedTable[map[i].index] = table[i];
        }

        return orderedTable;
    }
}