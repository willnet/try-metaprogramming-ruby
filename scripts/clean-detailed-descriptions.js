const fs = require('fs');
const path = require('path');

// Problem files directory
const problemsDir = path.join(__dirname, '../src/problems');

// Get all problem files
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${problemFiles.length} problem files`);

// Process each problem file
problemFiles.forEach(filename => {
  const filePath = path.join(problemsDir, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the detailedDescription field
    const detailedDescriptionMatch = content.match(/("detailedDescription":\s*`)([\s\S]*?)(`)/);
    
    if (detailedDescriptionMatch) {
      const originalDescription = detailedDescriptionMatch[2];
      
      // Remove '#' symbols from the beginning of each line (including indented lines)
      const cleanedDescription = originalDescription
        .split('\n')
        .map(line => line.replace(/^(\s*)#\s?/, '$1'))
        .join('\n');
      
      // Replace the detailedDescription content
      const newContent = content.replace(
        detailedDescriptionMatch[0],
        `${detailedDescriptionMatch[1]}${cleanedDescription}${detailedDescriptionMatch[3]}`
      );
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✓ Updated detailedDescription`);
    } else {
      console.log(`  ⚠ No detailedDescription found`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}: ${error.message}`);
  }
});

console.log('\nScript completed!');