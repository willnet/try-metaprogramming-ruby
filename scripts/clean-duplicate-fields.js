const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Cleaning duplicate answerExplanation fields in ${problemFiles.length} files\n`);

// Process each problem file
problemFiles.forEach(filename => {
  const filePath = path.join(problemsDir, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Count answerExplanation occurrences
    const explanationMatches = content.match(/"answerExplanation":/g);
    const explanationCount = explanationMatches ? explanationMatches.length : 0;
    
    if (explanationCount > 1) {
      console.log(`  ⚠ Found ${explanationCount} answerExplanation fields - cleaning up`);
      
      // Remove all answerExplanation fields first
      content = content.replace(/"answerExplanation":\s*`[\s\S]*?`,?\n?\s*/g, '');
      
      // Write the cleaned content back
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✓ Removed duplicate answerExplanation fields`);
    } else if (explanationCount === 1) {
      console.log(`  ✓ Has 1 answerExplanation field - OK`);
    } else {
      console.log(`  ✓ No answerExplanation field - OK`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}: ${error.message}`);
  }
  
  console.log('');
});

console.log('Script completed!');