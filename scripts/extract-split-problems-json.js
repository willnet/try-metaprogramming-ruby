// Extract split problems to JSON for testing
import { splitProblems } from '../src/split-problems.js';
import fs from 'fs';
import path from 'path';

const outputPath = path.join(process.cwd(), 'test/split-problems.json');
fs.writeFileSync(outputPath, JSON.stringify(splitProblems, null, 2));

console.log(`Extracted ${splitProblems.length} split problems to test/split-problems.json`);