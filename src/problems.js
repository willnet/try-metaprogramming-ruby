// メタプログラミングRuby問題集のデータ統合ファイル
import { setupProblems } from './problems/00_setup.js';
import { objectModelProblems } from './problems/02_object_model.js';
import { methodProblems } from './problems/03_method.js';
import { blockProblems } from './problems/04_block.js';
import { classDefinitionProblems } from './problems/05_class_definition.js';
import { codesGenerateCodesProblems } from './problems/06_codes_generate_codes.js';

export const problems = [
  ...setupProblems,
  ...objectModelProblems,
  ...methodProblems,
  ...blockProblems,
  ...classDefinitionProblems,
  ...codesGenerateCodesProblems
];