// problems.jsからJSONを抽出するスクリプト
import { problems } from '../src/problems.js';
import fs from 'fs';
import path from 'path';

// JSONファイルとして出力
const outputPath = path.join(process.cwd(), 'test/problems.json');
fs.writeFileSync(outputPath, JSON.stringify(problems, null, 2));
console.log(`Extracted ${problems.length} problems to test/problems.json`);