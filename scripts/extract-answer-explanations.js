const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Extracting answer explanations from ${problemFiles.length} files\n`);

// Helper function to safely extract string values from JavaScript object literals
function extractJsonStringValue(content, fieldName) {
  const regex = new RegExp(`"${fieldName}":\\s*\`([\\s\\S]*?)\``);
  const match = content.match(regex);
  return match ? match[1] : null;
}

// Helper function to separate comments from code
function separateCommentsFromCode(codeString) {
  const lines = codeString.split('\n');
  let explanationLines = [];
  let codeLines = [];
  let inCommentBlock = false;
  let commentBlock = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#')) {
      // Comment line
      if (!inCommentBlock) {
        inCommentBlock = true;
        commentBlock = [];
      }
      commentBlock.push(line);
    } else if (trimmed === '' && inCommentBlock) {
      // Empty line in comment block
      commentBlock.push(line);
    } else {
      // Non-comment line
      if (inCommentBlock) {
        // End of comment block
        explanationLines.push(...commentBlock);
        commentBlock = [];
        inCommentBlock = false;
      }
      
      if (trimmed !== '') {
        codeLines.push(line);
      }
    }
  }
  
  // Handle any remaining comment block at the end
  if (inCommentBlock && commentBlock.length > 0) {
    explanationLines.push(...commentBlock);
  }
  
  return {
    explanation: explanationLines.join('\n').trim(),
    code: codeLines.join('\n').trim()
  };
}

// Process each problem file
problemFiles.forEach(filename => {
  const filePath = path.join(problemsDir, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the answerCode field
    const answerCode = extractJsonStringValue(content, 'answerCode');
    
    if (answerCode) {
      const { explanation, code } = separateCommentsFromCode(answerCode);
      
      console.log(`  Explanation lines: ${explanation.split('\n').length}`);
      console.log(`  Code lines: ${code.split('\n').length}`);
      
      // Find the answerCode field in the content and replace it
      const answerCodeRegex = /"answerCode":\s*`([\s\S]*?)`/;
      const match = content.match(answerCodeRegex);
      
      if (match) {
        // Create the new structure with answerExplanation and updated answerCode
        const newAnswerCodeSection = `"answerExplanation": \`${explanation}\`,\n  "answerCode": \`${code}\``;
        
        // Replace the original answerCode field
        const newContent = content.replace(answerCodeRegex, newAnswerCodeSection);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`  ✓ Updated with answerExplanation field`);
      } else {
        console.log(`  ⚠ Could not find answerCode field pattern`);
      }
    } else {
      console.log(`  ⚠ No answerCode found`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}: ${error.message}`);
  }
  
  console.log('');
});

console.log('Script completed!');