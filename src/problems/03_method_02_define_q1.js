// Define Q1
export const problem = {
  "section": "03_method",
  "id": "02_define_q1",
  "title": "Define Q1",
  "title_en": "Define Q1",
  "detailedDescription": "次の動作をする A1 class を実装する\n\n- \"//\" を返す \"//\"メソッドが存在すること",
  "detailedDescription_en": "Implement A1 class that behaves as follows\n- A \"//\" method that returns \"//\" exists",
  "problemCode": "",
  "answerExplanation": "defだとSyntaxErrorになってしまうようなメソッド名でも、define_methodを使うことでメソッドとして定義することができます。",
  "answerExplanation_en": "Even method names that would cause a SyntaxError with def can be defined as methods using define_method.",
  "answerCode": "class A1\n  define_method '//' do\n    '//'\n  end\nend\n",
  "testCode": "require 'minitest'\nrequire 'securerandom'\n\nclass TestDefine < Minitest::Test\n  def test_answer_a1\n    assert_equal '//', A1.new.send('//'.to_sym)\n  end\n\n  def test_answer_a1_define\n    assert_equal true, A1.new.methods.include?(\"//\".to_sym)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
