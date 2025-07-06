// Hierarchy Q1
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q1",
  "title": "Hierarchy Q1",
  "title_en": "Hierarchy Q1",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q1)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q1)",
  "detailedDescription": "次の動作をする C1 class を実装する\n- C1.ancestors.first(2) が [C1, M1] となる\n- C1.new.name が 'C1' を返す",
  "detailedDescription_en": "Implement a C1 class that behaves as follows\n- C1.ancestors.first(2) returns [C1, M1]\n- C1.new.name returns 'C1'",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\nclass C1\n  def name\n    'C1'\n  end\nend",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q1. 問題の解説\n#\n# M1をC1にincludeすると、継承ツリーはC1の次にM1が位置することになり、仕様を満たせます。\n#\nclass C1\n  include M1\n\n  def name\n    'C1'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\ndef test_c1_ancestors\n    assert_equal [C1, M1], C1.ancestors.first(2)\n  end\n\ndef test_c1_name\n    assert_equal 'C1', C1.new.name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend",
  "answerExplanation": "",
  "answerExplanation_en": ""
};
