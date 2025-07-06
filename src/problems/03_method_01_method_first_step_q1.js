// Method First Step Q1
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q1",
  "title": "Method First Step Q1",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q1)",
  "problemCode": "# Q1.\n# 次の動作をする F1 class を実装する\n# - 1. \"def\"キーワードを使わずにF1クラスにhelloインスタンスメソッドを定義すること\n#      戻り値は \"hello\" であること\n# - 2. \"def\"キーワードを使わずにF1クラスにworldクラスメソッドを定義すること\n#      戻り値は \"world\" であること\n# - 3. 定義していないメソッドを実行したときにエラーを発生させず、\"NoMethodError\"という文字列を返すこと\n# - 4. `F1.new.respond_to?(定義していないメソッド名)` を実行したときにtrueを返すこと\n\nclass F1\nend",
  "answerCode": "# Q1. 問題の解説\n#\n# define_methodとdefine_singleton_methodとmethod_missingの素振り用の問題です。\n# define_singleton_methodは3章にはまだ出てきていませんが、これを知らないと3章の問題を解くのが難しくなるので覚えておいてください\n# respond_to_missing?は、respond_to?メソッド実行時にメソッドが定義されていない場合に呼ばれるメソッドです。method_missingを定義する場合は\n# 必ず定義しておきましょう。\n#\nclass F1\n  define_method :hello do\n    'hello'\n  end\n\n  define_singleton_method :world do\n    'world'\n  end\n\n  def method_missing(*args)\n    'NoMethodError'\n  end\n\n  def respond_to_missing?(*args)\n    true\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestMethodFirstStep < Minitest::Test\ndef test_hello\n    assert_equal F1.new.hello, 'hello'\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
