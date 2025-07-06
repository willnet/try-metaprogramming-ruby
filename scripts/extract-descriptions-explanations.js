// Description and Explanation extraction script
// Extract detailedDescription and answerExplanation from JavaScript problem files to separate markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path settings
const problemsDir = path.join(__dirname, '../src/problems');
const outputDescriptionsDir = path.join(__dirname, '../src/ruby/descriptions');
const outputExplanationsDir = path.join(__dirname, '../src/ruby/explanations');

// Statistics
let extractedDescriptions = 0;
let extractedExplanations = 0;
let skippedDescriptions = 0;
let skippedExplanations = 0;

// Get problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${problemFiles.length} problem files to process...`);

for (const filename of problemFiles) {
  const filepath = path.join(problemsDir, filename);
  const baseName = filename.replace('.js', '');
  
  try {
    // Use dynamic import to load ES6 modules
    const { problem } = await import(`file://${filepath}`);
    
    console.log(`\nProcessing: ${filename}`);
    console.log(`  Title: ${problem.title || 'No title'}`);
    
    // Extract detailedDescription (Japanese and English)
    if (problem.detailedDescription || problem.detailedDescription_en) {
      const descriptionFilePath = path.join(outputDescriptionsDir, `${baseName}.md`);
      
      let content = '';
      
      if (problem.detailedDescription && problem.detailedDescription.trim()) {
        content += '# 日本語\n\n';
        content += problem.detailedDescription.trim() + '\n\n';
      }
      
      if (problem.detailedDescription_en && problem.detailedDescription_en.trim()) {
        content += '# English\n\n';
        content += problem.detailedDescription_en.trim() + '\n';
      }
      
      if (content) {
        fs.writeFileSync(descriptionFilePath, content);
        console.log(`  ✓ Extracted detailedDescription -> ${baseName}.md`);
        extractedDescriptions++;
      } else {
        console.log(`  - Skipped detailedDescription (empty)`);
        skippedDescriptions++;
      }
    } else {
      console.log(`  - Skipped detailedDescription (missing)`);
      skippedDescriptions++;
    }
    
    // Extract answerExplanation (Japanese and English)
    if (problem.answerExplanation || problem.answerExplanation_en) {
      const explanationFilePath = path.join(outputExplanationsDir, `${baseName}.md`);
      
      let content = '';
      
      if (problem.answerExplanation && problem.answerExplanation.trim()) {
        content += '# 日本語\n\n';
        content += problem.answerExplanation.trim() + '\n\n';
      }
      
      if (problem.answerExplanation_en && problem.answerExplanation_en.trim()) {
        content += '# English\n\n';
        content += problem.answerExplanation_en.trim() + '\n';
      }
      
      if (content) {
        fs.writeFileSync(explanationFilePath, content);
        console.log(`  ✓ Extracted answerExplanation -> ${baseName}.md`);
        extractedExplanations++;
      } else {
        console.log(`  - Skipped answerExplanation (empty)`);
        skippedExplanations++;
      }
    } else {
      console.log(`  - Skipped answerExplanation (missing)`);
      skippedExplanations++;
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

// Result report
console.log('\n' + '='.repeat(50));
console.log('EXTRACTION COMPLETE');
console.log('='.repeat(50));
console.log(`Problem files processed: ${problemFiles.length}`);
console.log(`Descriptions extracted: ${extractedDescriptions} (skipped: ${skippedDescriptions})`);
console.log(`Explanations extracted: ${extractedExplanations} (skipped: ${skippedExplanations})`);
console.log(`\nFiles created in:`);
console.log(`  Descriptions: ${outputDescriptionsDir}`);
console.log(`  Explanations: ${outputExplanationsDir}`);