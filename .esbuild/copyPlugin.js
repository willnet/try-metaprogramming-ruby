import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import * as glob from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function copyPlugin({ src, dest, patterns }) {
  return {
    name: "copy",
    setup(build) {
      build.onEnd(() => {
        const sourceDir = path.resolve(src);
        const destDir = path.resolve(dest);
        console.log(`CopyPlugin: sourceDir = ${sourceDir}, destDir = ${destDir}`);
        
        patterns.forEach((pattern) => {
          const srcFiles = glob.sync(path.resolve(sourceDir, pattern));
          console.log(`CopyPlugin: pattern "${pattern}" found ${srcFiles.length} files`);
          
          srcFiles.forEach((srcFile) => {
            const relSrcFile = path.relative(sourceDir, srcFile);
            const destFile = path.resolve(destDir, relSrcFile);
            console.log(`Copying ${srcFile} to ${destFile}`);
            
            try {
              fs.mkdirSync(path.dirname(destFile), { recursive: true });
              fs.copyFileSync(srcFile, destFile);
              
              // ファイルサイズを確認してログ出力
              const srcStats = fs.statSync(srcFile);
              const destStats = fs.statSync(destFile);
              console.log(`  Source: ${srcStats.size} bytes, Dest: ${destStats.size} bytes`);
            } catch (error) {
              console.error(`  Error copying file: ${error.message}`);
            }
          });
        });
      });
    },
  };
}
