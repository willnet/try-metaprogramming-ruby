// Hierarchy Q5
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q5",
  "title": "Hierarchy Q5",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q5)",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q5.\n# 次の動作をする M1Refinements module を実装する\n# - M1Refinements は M1 の name インスタンスメソッドをリファインし,\n#   リファインされた name メソッドは \"Refined M1\" を返す\n# - C5.new.another_name が文字列 \"M1\" を返す\n# - C5.new.other_name が文字列 \"Refined M1\" を返す\nmodule M1Refinements\nend\n\nclass C5\n  include M1\n\n  def another_name\n    name\n  end\n\n  using M1Refinements\n\n  def other_name\n    name\n  end\nend",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q5. 問題の解説\n#\n# refinementsの練習問題です。\n# refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。\nmodule M1Refinements\n  refine M1 do\n    def name\n      'Refined M1'\n    end\n  end\nend\n\nclass C5\n  include M1\n\n  def another_name\n    name\n  end\n\n  using M1Refinements\n\n  def other_name\n    name\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\ndef test_c5_another_name\n    assert_equal \"M1\", C5.new.another_name\n  end\n\ndef test_c5_other_name\n    assert_equal \"Refined M1\", C5.new.other_name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
