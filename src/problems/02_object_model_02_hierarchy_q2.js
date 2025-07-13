// Hierarchy Q2
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q2",
  "title": "Hierarchy Q2",
  "title_en": "Hierarchy Q2",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q2)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q2)",
  "detailedDescription": "前提: M1モジュールは変更しないこと\n\n次の動作をする C2 class を実装する\n- C2.ancestors.first(2) が [M1, C2] となる\n- C2.new.name が 'M1' を返す",
  "detailedDescription_en": "Premise: Do not modify the M1 module.\n\nImplement a C2 class that behaves as follows\n- C2.ancestors.first(2) returns [M1, C2]\n- C2.new.name returns 'M1'",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nclass C2\n  def name\n    'C2'\n  end\nend\n",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nclass C2\n  prepend M1\n\n  def name\n    'C2'\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\n  def test_c2_ancestors\n    assert_equal [M1, C2], C2.ancestors.first(2)\n  end\n\n  def test_c2_name\n    assert_equal 'M1', C2.new.name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "この問題では、`prepend`の動作を理解することが重要です。\n\n`prepend`は`include`とは異なり、モジュールをクラスの継承チェーンの**前**に挿入します。つまり、`prepend M1`を使用すると、継承チェーンは[M1, C2, ...]となります。\n\nこの結果、C2クラスで`name`メソッドを定義しても、M1モジュールの`name`メソッドが優先されるため、`C2.new.name`は'M1'を返します。これは、メソッド探索が継承チェーンの先頭から行われるためです。",
  "answerExplanation_en": "Understanding how `prepend` works is crucial for this quiz.\n\nUnlike `include`, `prepend` inserts the module **before** the class in the inheritance chain. When using `prepend M1`, the inheritance chain becomes [M1, C2, ...].\n\nAs a result, even though we define a `name` method in the C2 class, the `name` method from the M1 module takes precedence, so `C2.new.name` returns 'M1'. This is because method lookup starts from the beginning of the inheritance chain."
};
