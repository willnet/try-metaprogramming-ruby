// Hierarchy Q3
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q3",
  "title": "Hierarchy Q3",
  "title_en": "Hierarchy Q3",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q3)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q3)",
  "detailedDescription": "次の動作をする C3 class, MySuperClass class を実装する\n- C3.ancestors.first(6) が [M1, C3, M2, M3, MySuperClass, M4] となる\n- C3.new.name が 'M1' を返す",
  "detailedDescription_en": "Implement C3 class and MySuperClass class that behave as follows\n- C3.ancestors.first(6) returns [M1, C3, M2, M3, MySuperClass, M4]\n- C3.new.name returns 'M1'",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\nclass C3\n  def name\n    'C3'\n  end\nend",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q3. 問題の解説\n#\n# モジュールを複数includeしたり、スーパークラスを明示的に定義したときの\n# 継承ツリーがどうなるかの理解を問う問題です\n#\nclass MySuperClass\n  include M4\nend\n\nclass C3 < MySuperClass\n  prepend M1\n  include M3\n  include M2\n\n  def name\n    'C3'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\ndef test_c3_ancestors\n    assert_equal [M1, C3, M2, M3, MySuperClass, M4], C3.ancestors.first(6)\n  end\n\ndef test_c3_name\n    assert_equal 'M1', C3.new.name\n  end\n\ndef test_c3_super_class\n    assert MySuperClass.kind_of?(Class)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend",
  "answerExplanation": "",
  "answerExplanation_en": ""
};
