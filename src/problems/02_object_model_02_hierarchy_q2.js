// Hierarchy Q2
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q2",
  "title": "Hierarchy Q2",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q2)",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q2.\n# 次の動作をする C2 class を実装する\n# - C2.ancestors.first(2) が [M1, C2] となる\n# - C2.new.name が 'M1' を返す\nclass C2\n  def name\n    'C2'\n  end\nend",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q2. 問題の解説\n#\n# M1をC2にprependすると、継承ツリーはM2の次にC2が位置することになり、仕様を満たせます。\n#\nclass C2\n  prepend M1\n\n  def name\n    'C2'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\ndef test_c2_ancestors\n    assert_equal [M1, C2], C2.ancestors.first(2)\n  end\n\ndef test_c2_name\n    assert_equal 'M1', C2.new.name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
