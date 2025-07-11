// Hierarchy Q5
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q5",
  "title": "Hierarchy Q5",
  "title_en": "Hierarchy Q5",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q5)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q5)",
  "detailedDescription": "前提: M1モジュールは変更しないこと\n\n次の動作をする M1Refinements module を実装する\n- M1Refinements は M1 の name インスタンスメソッドをリファインし,\n  リファインされた name メソッドは \"Refined M1\" を返す\n- C5.new.another_name が文字列 \"M1\" を返す\n- C5.new.other_name が文字列 \"Refined M1\" を返す",
  "detailedDescription_en": "Premise: Do not modify the M1 module.\n\nImplement M1Refinements module that behaves as follows\n- M1Refinements refines the name instance method of M1,\n  and the refined name method returns \"Refined M1\"\n- C5.new.another_name returns the string \"M1\"\n- C5.new.other_name returns the string \"Refined M1\"",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M1Refinements\nend\n\nclass C5\n  include M1\n\n  def another_name\n    name\n  end\n\n  using M1Refinements\n\n  def other_name\n    name\n  end\nend\n",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M1Refinements\n  refine M1 do\n    def name\n      'Refined M1'\n    end\n  end\nend\n\nclass C5\n  include M1\n\n  def another_name\n    name\n  end\n\n  using M1Refinements\n\n  def other_name\n    name\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestHierarchy < Minitest::Test\n  def test_c5_another_name\n    assert_equal 'M1', C5.new.another_name\n  end\n\n  def test_c5_other_name\n    assert_equal 'Refined M1', C5.new.other_name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "この問題は、Rubyのrefinementsという機能の理解を問うものです。\n\nrefinementsの重要な特徴：\n1. `refine`でモジュールやクラスのメソッドを局所的に書き換えることができる\n2. `using`でrefinementを有効化する\n3. refinementの効果範囲は、`using`が呼ばれた場所から、そのスコープの終わりまで\n\nこの問題のポイント：\n- `another_name`メソッドは`using M1Refinements`より前に定義されているため、元のM1の`name`メソッドを呼び出す（'M1'を返す）\n- `other_name`メソッドは`using M1Refinements`より後に定義されているため、リファインされた`name`メソッドを呼び出す（'Refined M1'を返す）\n\nrefinementsは、既存のクラスやモジュールを安全に拡張する方法として導入された機能で、グローバルな影響を与えずに局所的な変更を可能にします。",
  "answerExplanation_en": "This problem tests understanding of Ruby's refinements feature.\n\nKey characteristics of refinements:\n1. `refine` allows local modification of module or class methods\n2. `using` activates the refinement\n3. The scope of a refinement is from where `using` is called to the end of that scope\n\nKey points in this problem:\n- The `another_name` method is defined before `using M1Refinements`, so it calls the original M1's `name` method (returns 'M1')\n- The `other_name` method is defined after `using M1Refinements`, so it calls the refined `name` method (returns 'Refined M1')\n\nRefinements were introduced as a way to safely extend existing classes or modules, allowing local modifications without global impact."
};
