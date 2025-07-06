const fs = require('fs');
const path = require('path');

// Translation mappings for common terms and patterns
const translations = {
  // Common Japanese patterns to English
  "について": "about",
  "理解を深める問題": "problem to deepen understanding",
  "学びます": "learn",
  "基本的な": "basic",
  "問題": "problem",
  "クラス": "class",
  "メソッド": "method",
  "インスタンス": "instance",
  "オブジェクト": "object",
  "ブロック": "block",
  "定義": "definition",
  "実行": "execution",
  "例": "example",
  "解説": "explanation"
};

// Files that already have English translations (skip these)
const filesWithEnglish = new Set([
  '00_setup_01_try_out.js',
  '02_object_model_01_hoge_q1.js'
]);

// Manual translations for specific problems
const manualTranslations = {
  '02_object_model_02_hierarchy_q1.js': {
    title_en: 'Hierarchy Q1',
    description_en: 'A problem to deepen understanding of Ruby\'s object model. Learn about class hierarchy, inheritance, and method lookup. (Q1)',
    detailedDescription_en: 'Q1.\nExplain the inheritance hierarchy of the String class\nWrite code that prints the class hierarchy from String to the top',
    answerExplanation_en: 'Q1. Problem Explanation\n\nYou can use the superclass method to trace the inheritance hierarchy. Starting from String class, you can follow the chain: String -> Object -> BasicObject. BasicObject is the root class in Ruby, and its superclass is nil.'
  },
  
  '02_object_model_02_hierarchy_q2.js': {
    title_en: 'Hierarchy Q2',
    description_en: 'A problem to deepen understanding of Ruby\'s object model. Learn about class hierarchy, inheritance, and method lookup. (Q2)',
    detailedDescription_en: 'Q2.\nFind what class the Integer class inherits from\nWrite code that prints the superclass of Integer',
    answerExplanation_en: 'Q2. Problem Explanation\n\nInteger class inherits from Numeric class. You can verify this by calling Integer.superclass which returns Numeric.'
  },
  
  '03_method_01_method_first_step_q1.js': {
    title_en: 'Method First Step Q1',
    description_en: 'Basic problems about Ruby methods. Learn about method definition, calling, and scope. (Q1)',
    detailedDescription_en: 'Q1.\nDefine a greet method that returns "Hello, World!"\nThe method should be callable without any arguments',
    answerExplanation_en: 'Q1. Problem Explanation\n\nThis is a basic method definition exercise. Simply define a method that returns the specified string.'
  }
};

function addEnglishTranslations() {
  const problemsDir = '/Users/willnet/ghq/github.com/willnet/try-metaprogramming-ruby/src/problems';
  const files = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));
  
  console.log(`Found ${files.length} problem files`);
  
  files.forEach(filename => {
    if (filesWithEnglish.has(filename)) {
      console.log(`Skipping ${filename} (already has English)`);
      return;
    }
    
    const filePath = path.join(problemsDir, filename);
    console.log(`Processing ${filename}...`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if already has English fields
      if (content.includes('_en":')) {
        console.log(`${filename} already has English fields, skipping`);
        return;
      }
      
      let newContent = content;
      
      // Get manual translation if available
      const manual = manualTranslations[filename];
      
      if (manual) {
        // Add title_en
        newContent = newContent.replace(
          /"title": "([^"]+)",/,
          `"title": "$1",\n  "title_en": "${manual.title_en}",`
        );
        
        // Add description_en
        newContent = newContent.replace(
          /"description": "([^"]+)",/,
          `"description": "$1",\n  "description_en": "${manual.description_en}",`
        );
        
        // Add detailedDescription_en
        newContent = newContent.replace(
          /("detailedDescription": `[^`]+`),/,
          `$1,\n  "detailedDescription_en": \`${manual.detailedDescription_en}\`,`
        );
        
        // Add answerExplanation_en
        newContent = newContent.replace(
          /("answerExplanation": `[^`]+`),/,
          `$1,\n  "answerExplanation_en": \`${manual.answerExplanation_en}\`,`
        );
      } else {
        // Use generic translations for files without manual translations
        const baseTitle = filename.replace('.js', '').replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
        
        // Add title_en (keep same as title for now)
        newContent = newContent.replace(
          /"title": "([^"]+)",/,
          `"title": "$1",\n  "title_en": "$1",`
        );
        
        // Add description_en (basic translation)
        newContent = newContent.replace(
          /"description": "([^"]+)",/,
          (match, desc) => {
            const englishDesc = desc
              .replace(/Ruby.*について.*問題/, 'A problem about Ruby concepts')
              .replace(/学びます.*\(Q\d+\)/, 'Learn various concepts.')
              .replace(/\(Q\d+\)/, match => match);
            return `"description": "${desc}",\n  "description_en": "${englishDesc}",`;
          }
        );
        
        // Add placeholder detailedDescription_en
        newContent = newContent.replace(
          /("detailedDescription": `[^`]+`),/,
          `$1,\n  "detailedDescription_en": \`[English translation needed]\`,`
        );
        
        // Add placeholder answerExplanation_en
        newContent = newContent.replace(
          /("answerExplanation": `[^`]+`),/,
          `$1,\n  "answerExplanation_en": \`[English translation needed]\`,`
        );
      }
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✓ Updated ${filename}`);
      
    } catch (error) {
      console.error(`Error processing ${filename}: ${error.message}`);
    }
  });
}

addEnglishTranslations();