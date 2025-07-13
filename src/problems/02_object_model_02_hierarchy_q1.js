// Hierarchy Q1
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q1",
  "title": "Hierarchy Q1",
  "title_en": "Hierarchy Q1",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q1)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q1)",
  "detailedDescription": "前提: M1モジュールは変更しないこと\n\n次の動作をする C1 class を実装する\n- C1.ancestors.first(2) が [C1, M1] となる\n- C1.new.name が 'C1' を返す",
  "detailedDescription_en": "Premise: Do not modify the M1 module.\n\nImplement a C1 class that behaves as follows\n- C1.ancestors.first(2) returns [C1, M1]\n- C1.new.name returns 'C1'",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nclass C1\n  def name\n    'C1'\n  end\nend\n",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nclass C1\n  include M1\n\n  def name\n    'C1'\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\n  def test_c1_ancestors\n    assert_equal [C1, M1], C1.ancestors.first(2)\n  end\n\n  def test_c1_name\n    assert_equal 'C1', C1.new.name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "この問題では、クラスの継承チェーン（ancestors）を理解し、モジュールのインクルードを適切に使用する必要があります。\n\n`include M1`を使用することで、M1モジュールがC1クラスの継承チェーンに挿入されます。継承チェーンの順序は、クラス自身が最初に来て、その次にインクルードされたモジュールが来ます。\n\nC1クラスに`name`メソッドを定義することで、M1モジュールの同名メソッドをオーバーライドし、'C1'を返すようにしています。",
  "answerExplanation_en": "This quiz requires understanding the class inheritance chain (ancestors) and proper use of module inclusion.\n\nBy using `include M1`, the M1 module is inserted into C1 class's inheritance chain. The order of the inheritance chain places the class itself first, followed by included modules.\n\nBy defining a `name` method in the C1 class, we override the method of the same name from the M1 module, returning 'C1' instead."
};
