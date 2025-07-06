const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Analyzing answerCode comments in ${problemFiles.length} files\n`);

let totalAnswerLines = 0;
let totalAnswerCommentLines = 0;

// Process each problem file
problemFiles.forEach(filename => {
  const filePath = path.join(problemsDir, filename);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the answerCode field
    const answerCodeMatch = content.match(/"answerCode":\s*`([\s\S]*?)`/);
    
    if (answerCodeMatch) {
      const answerCode = answerCodeMatch[1];
      const lines = answerCode.split('\n');
      
      let commentLines = [];
      let codeLines = [];
      let consecutiveComments = [];
      
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        totalAnswerLines++;
        
        if (trimmed.startsWith('#')) {
          totalAnswerCommentLines++;
          commentLines.push(line);
          consecutiveComments.push({
            lineNumber: index + 1,
            content: line
          });
        } else if (trimmed === '') {
          // Empty line - could be part of comment block or code
          if (consecutiveComments.length > 0) {
            consecutiveComments.push({
              lineNumber: index + 1,
              content: line
            });
          }
        } else {
          // Non-comment line
          if (consecutiveComments.length > 0) {
            // End of comment block
            console.log(`${filename}: Comment block found (lines ${consecutiveComments[0].lineNumber}-${consecutiveComments[consecutiveComments.length-1].lineNumber}):`);
            consecutiveComments.forEach(comment => {
              console.log(`  ${comment.lineNumber}: ${comment.content}`);
            });
            console.log('');
            consecutiveComments = [];
          }
          codeLines.push(line);
        }
      });
      
      // Handle any remaining comment block at the end
      if (consecutiveComments.length > 0) {
        console.log(`${filename}: Comment block found (lines ${consecutiveComments[0].lineNumber}-${consecutiveComments[consecutiveComments.length-1].lineNumber}):`);
        consecutiveComments.forEach(comment => {
          console.log(`  ${comment.lineNumber}: ${comment.content}`);
        });
        console.log('');
      }
      
      console.log(`${filename}: ${commentLines.length} comment lines, ${codeLines.length} code lines`);
      console.log('---');
    } else {
      console.log(`${filename}: No answerCode found`);
    }
  } catch (error) {
    console.error(`Error processing ${filename}: ${error.message}`);
  }
});

console.log(`\nSummary:`);
console.log(`Total answerCode lines: ${totalAnswerLines}`);
console.log(`Total comment lines: ${totalAnswerCommentLines}`);
console.log(`Comment ratio: ${((totalAnswerCommentLines / totalAnswerLines) * 100).toFixed(1)}%`);