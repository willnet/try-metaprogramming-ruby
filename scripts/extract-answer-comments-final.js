const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Extracting answer comments from ${problemFiles.length} files\n`);

// Helper function to properly separate comments from Ruby code
function separateCommentsFromRubyCode(rubyCode) {
  const lines = rubyCode.split('\n');
  const commentLines = [];
  const codeLines = [];
  
  let i = 0;
  
  // Extract initial comment block
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#') || trimmed === '') {
      if (trimmed.startsWith('#')) {
        commentLines.push(line);
      } else if (commentLines.length > 0) {
        // Empty line within comment block
        commentLines.push(line);
      }
      i++;
    } else {
      // First non-comment line - break
      break;
    }
  }
  
  // Collect remaining lines as code
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#')) {
      // Inline comments within code - keep them with code
      codeLines.push(line);
    } else {
      codeLines.push(line);
    }
    i++;
  }
  
  return {
    explanation: commentLines.join('\n').trim(),
    code: codeLines.join('\n').trim()
  };
}

// Process each problem file
problemFiles.forEach(filename => {
  const filePath = path.join(problemsDir, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has answerExplanation
    if (content.includes('"answerExplanation"')) {
      console.log(`  ⚠ Already has answerExplanation - skipping`);
      return;
    }
    
    // Extract the answerCode field
    const answerCodeMatch = content.match(/"answerCode":\s*`([\s\S]*?)`(?=,\s*"|\s*})/);
    
    if (answerCodeMatch) {
      const originalAnswerCode = answerCodeMatch[1];
      const { explanation, code } = separateCommentsFromRubyCode(originalAnswerCode);
      
      if (explanation.trim()) {
        console.log(`  ✓ Found explanation: ${explanation.split('\n').length} lines`);
        console.log(`  ✓ Found code: ${code.split('\n').length} lines`);
        
        // Remove '#' from explanation lines for display
        const cleanedExplanation = explanation
          .split('\n')
          .map(line => line.replace(/^(\s*)#\s?/, '$1'))
          .join('\n')
          .trim();
        
        // Replace the answerCode field with answerExplanation + answerCode
        const replacement = `"answerExplanation": \`${cleanedExplanation}\`,\n  "answerCode": \`${code}\``;
        const newContent = content.replace(answerCodeMatch[0], replacement);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`  ✓ Successfully extracted explanation and updated file`);
      } else {
        console.log(`  ⚠ No comment block found at beginning of answerCode`);
      }
    } else {
      console.log(`  ⚠ No answerCode field found`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}: ${error.message}`);
  }
  
  console.log('');
});

console.log('Script completed!');