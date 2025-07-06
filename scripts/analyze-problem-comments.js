// 問題ファイルのコメントパターンを分析するスクリプト
import fs from 'fs';
import path from 'path';

const problemsDir = 'src/problems';

// 問題ファイルのproblemCodeを分析する関数
function analyzeProblemCode(problemCode, filename) {
  const lines = problemCode.split('\n');
  const analysis = {
    filename,
    totalLines: lines.length,
    commentLines: [],
    codeLines: [],
    emptyLines: [],
    commentPattern: 'unknown'
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineInfo = {
      number: index + 1,
      content: line,
      trimmed
    };

    if (trimmed === '') {
      analysis.emptyLines.push(lineInfo);
    } else if (trimmed.startsWith('#')) {
      analysis.commentLines.push(lineInfo);
    } else {
      analysis.codeLines.push(lineInfo);
    }
  });

  // コメントパターンを分析
  if (analysis.commentLines.length === 0) {
    analysis.commentPattern = 'no_comments';
  } else if (analysis.codeLines.length === 0) {
    analysis.commentPattern = 'comments_only';
  } else {
    // コメントとコードの配置パターンを確認
    const firstComment = analysis.commentLines[0]?.number || Infinity;
    const firstCode = analysis.codeLines[0]?.number || Infinity;
    
    if (firstComment < firstCode) {
      analysis.commentPattern = 'comments_before_code';
    } else {
      analysis.commentPattern = 'mixed_or_comments_after';
    }
  }

  return analysis;
}

// 問題ファイルをインポートして分析
async function analyzeAllProblems() {
  console.log('Analyzing comment patterns in all problem files...\n');
  
  const files = fs.readdirSync(problemsDir)
    .filter(file => file.endsWith('.js') && !file.includes('problems.js'))
    .sort();

  const analyses = [];

  for (const filename of files) {
    try {
      const filePath = path.join(problemsDir, filename);
      const module = await import(`../${filePath}`);
      const problem = module.problem;
      
      if (problem && problem.problemCode) {
        const analysis = analyzeProblemCode(problem.problemCode, filename);
        analyses.push(analysis);

        // 各問題の詳細結果を表示
        console.log(`📄 ${filename}`);
        console.log(`   Total lines: ${analysis.totalLines}`);
        console.log(`   Comment lines: ${analysis.commentLines.length}`);
        console.log(`   Code lines: ${analysis.codeLines.length}`);
        console.log(`   Empty lines: ${analysis.emptyLines.length}`);
        console.log(`   Pattern: ${analysis.commentPattern}`);
        
        if (analysis.commentLines.length > 0) {
          console.log(`   First comment: "${analysis.commentLines[0].trimmed}"`);
          if (analysis.commentLines.length > 1) {
            console.log(`   Last comment: "${analysis.commentLines[analysis.commentLines.length - 1].trimmed}"`);
          }
        }
        
        console.log('');
      }
    } catch (error) {
      console.error(`Error analyzing ${filename}:`, error.message);
    }
  }

  // 全体の統計を表示
  console.log('\n📊 Overall Statistics:');
  console.log(`Total problems analyzed: ${analyses.length}`);
  
  const patternCounts = {};
  analyses.forEach(analysis => {
    patternCounts[analysis.commentPattern] = (patternCounts[analysis.commentPattern] || 0) + 1;
  });
  
  console.log('\nComment patterns:');
  Object.entries(patternCounts).forEach(([pattern, count]) => {
    console.log(`  ${pattern}: ${count} files`);
  });

  const totalCommentLines = analyses.reduce((sum, a) => sum + a.commentLines.length, 0);
  const totalCodeLines = analyses.reduce((sum, a) => sum + a.codeLines.length, 0);
  
  console.log(`\nTotal comment lines across all problems: ${totalCommentLines}`);
  console.log(`Total code lines across all problems: ${totalCodeLines}`);
  console.log(`Comment ratio: ${(totalCommentLines / (totalCommentLines + totalCodeLines) * 100).toFixed(1)}%`);

  return analyses;
}

// メイン実行
analyzeAllProblems().catch(console.error);