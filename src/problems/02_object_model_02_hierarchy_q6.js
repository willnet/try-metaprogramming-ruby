// Hierarchy Q6
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q6",
  "title": "Hierarchy Q6",
  "title_en": "Hierarchy Q6",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q6)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q6)",
  "detailedDescription": "Q6.\n次の動作をする C6 class を実装する\n- M1Refinements は Q5 で実装したものをそのまま使う\n- C6.new.name が 'Refined M1' を返すように C6 に name メソッドを実装する",
  "detailedDescription_en": "Q6.\nImplement C6 class that behaves as follows\n- M1Refinements uses the same implementation from Q5\n- Implement a name method in C6 so that C6.new.name returns 'Refined M1'",
  "problemCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\nclass C6\n  include M1\n  using M1Refinements\nend",
  "answerCode": "module M1\n  def name\n    'M1'\n  end\nend\n\nmodule M2\n  def name\n    'M2'\n  end\nend\n\nmodule M3\n  def name\n    'M3'\n  end\nend\n\nmodule M4\n  def name\n    'M4'\n  end\nend\n\n# NOTE: これより上の行は変更しないこと\n\n# Q6. 問題の解説\n#\n# Q5の解説でも書いたように、refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。\n# なので、問題として用意したコードのままだとなにもrefineされず、もともとのC6#nameは'M1'を返します。\n# using以降の行でM1#nameを呼び出すC6#nameを定義するとrefineした実装が呼び出されます。\n#\nclass C6\n  include M1\n  using M1Refinements\n\n  def name\n    super\n  end\nend",
  "testCode": "require 'minitest'\n\n# M1 module definition (needed for refinements)\nmodule M1\n  def name\n    'M1'\n  end\nend\n\n# M1Refinements definition (needed for Q6)\nmodule M1Refinements\n  refine M1 do\n    def name\n      'Refined M1'\n    end\n  end\nend\n\nclass TestHierarchy < Minitest::Test\ndef test_c6_name\n    assert_equal \"Refined M1\", C6.new.name\n\n    C6.include(Module.new do\n      def name = \"other\"\n    end)\n    assert_equal \"other\", C6.new.name\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend",
  "answerExplanation": "",
  "answerExplanation_en": ""
};
