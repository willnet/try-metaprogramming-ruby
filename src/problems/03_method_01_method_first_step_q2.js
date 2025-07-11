// Method First Step Q2
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q2",
  "title": "Method First Step Q2",
  "title_en": "Method First Step Q2",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q2)",
  "description_en": "Basic problems about Ruby method definition. Learn dynamic method definition without using the def keyword. (Q2)",
  "detailedDescription": "次の動作をする F2 classを実装する\n\n1. 実行するとhiインスタンスメソッドを定義するadd_hiメソッドを定義すること",
  "detailedDescription_en": "Implement F2 class that behaves as follows\n\n1. Define an add_hi method that defines a hi instance method when executed",
  "problemCode": "class F2\nend\n",
  "answerExplanation": "メソッドを実行したら新しいメソッドができる、ということを実感してもらうための問題です。この回答のようなdefがネストする実装は普通はやりませんが、\n「特定の処理を実行する時に動的にメソッドを生やす」という場面は、メタプロをしていればそれなりにあります。",
  "answerExplanation_en": "This is a problem to help you understand that \"executing a method creates a new method\". This kind of implementation with nested def is not usually done, but there are situations in metaprogramming where you \"dynamically create methods when executing specific processing\".",
  "answerCode": "class F2\n  def add_hi\n    def hi; end\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestMethodFirstStep < Minitest::Test\n  def test_add_hi\n    f2 = F2.new\n    refute f2.respond_to?(:hi)\n    f2.add_hi\n    assert f2.respond_to?(:hi)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
