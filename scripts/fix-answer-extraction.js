const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Fixing answer extraction in ${problemFiles.length} files\n`);

// Helper function to check if a file has answerExplanation field
function hasAnswerExplanation(content) {
  return content.includes('"answerExplanation"');
}

// Helper function to properly separate comments from Ruby code
function separateCommentsFromRubyCode(rubyCode) {
  const lines = rubyCode.split('\n');
  const commentLines = [];
  const codeLines = [];
  
  let inCommentBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#')) {
      // Comment line
      commentLines.push(line);
      inCommentBlock = true;
    } else if (trimmed === '' && inCommentBlock) {
      // Empty line within comment block
      commentLines.push(line);
    } else if (trimmed === '' && !inCommentBlock) {
      // Empty line outside comment block - add to code
      codeLines.push(line);
    } else {
      // Non-comment, non-empty line
      inCommentBlock = false;
      codeLines.push(line);
    }
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
    
    if (hasAnswerExplanation(content)) {
      console.log(`  ⚠ File already has answerExplanation - skipping`);
      return;
    }
    
    // Extract the original answerCode field using a more robust pattern
    const answerCodeMatch = content.match(/"answerCode":\s*`([\s\S]*?)`(?=,\s*"|\s*})/);
    
    if (answerCodeMatch) {
      const originalAnswerCode = answerCodeMatch[1];
      const { explanation, code } = separateCommentsFromRubyCode(originalAnswerCode);
      
      if (explanation.trim()) {
        console.log(`  ✓ Found explanation: ${explanation.split('\n').length} lines`);
        console.log(`  ✓ Found code: ${code.split('\n').length} lines`);
        
        // Replace the answerCode field with answerExplanation + answerCode
        const replacement = `"answerExplanation": \`${explanation}\`,\n  "answerCode": \`${code}\``;
        const newContent = content.replace(answerCodeMatch[0], replacement);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`  ✓ Updated with separated explanation and code`);
      } else {
        console.log(`  ⚠ No comments found in answerCode`);
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