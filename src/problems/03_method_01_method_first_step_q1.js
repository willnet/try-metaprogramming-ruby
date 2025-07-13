// Method First Step Q1
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q1",
  "title": "Method First Step Q1",
  "title_en": "Method First Step Q1",
  "detailedDescription": "次の動作をする F1 class を実装する\n\n1. \"def\"キーワードを使わずにF1クラスにhelloインスタンスメソッドを定義すること。戻り値は \"hello\" であること\n2. \"def\"キーワードを使わずにF1クラスにworldクラスメソッドを定義すること。戻り値は \"world\" であること\n3. 定義していないメソッドを実行したときにエラーを発生させず、\"NoMethodError\"という文字列を返すこと\n4. `F1.new.respond_to?(定義していないメソッド名)` を実行したときにtrueを返すこと",
  "detailedDescription_en": "Implement an F1 class that behaves as follows\n\n1. Define a hello instance method in F1 class without using the \"def\" keyword. The return value should be \"hello\"\n2. Define a world class method in F1 class without using the \"def\" keyword. The return value should be \"world\"\n3. When executing an undefined method, do not raise an error but return the string \"NoMethodError\"\n4. When executing `F1.new.respond_to?(undefined_method_name)`, return true",
  "problemCode": "class F1\nend\n",
  "answerExplanation": "define_methodとdefine_singleton_methodとmethod_missingの素振り用の問題です。\ndefine_singleton_methodは3章にはまだ出てきていませんが、これを知らないと3章の問題を解くのが難しくなるので覚えておいてください\nrespond_to_missing?は、respond_to?メソッド実行時にメソッドが定義されていない場合に呼ばれるメソッドです。method_missingを定義する場合は\n必ず定義しておきましょう。",
  "answerExplanation_en": "This is a practice quiz for define_method, define_singleton_method, and method_missing.\ndefine_singleton_method doesn't appear in Chapter 3 yet, but you need to know this to solve Chapter 3 quizzes, so please remember it.\nrespond_to_missing? is a method called when respond_to? method is executed and the method is not defined. Always define this when you define method_missing.",
  "answerCode": "class F1\n  define_method :hello do\n    'hello'\n  end\n\n  define_singleton_method :world do\n    'world'\n  end\n\n  def method_missing(*args)\n    'NoMethodError'\n  end\n\n  def respond_to_missing?(*args)\n    true\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestMethodFirstStep < Minitest::Test\n  def test_hello\n    assert_equal F1.new.hello, 'hello'\n  end\n\n  def test_world\n    assert_equal F1.world, 'world'\n  end\n\n  def test_method_missing\n    assert_equal F1.new.send(SecureRandom.alphanumeric), 'NoMethodError'\n  end\n\n  def test_respond_to\n    assert F1.new.respond_to?(SecureRandom.alphanumeric)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
