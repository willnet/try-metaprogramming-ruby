// Method First Step Q2
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q2",
  "title": "Method First Step Q2",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q2)",
  "problemCode": "# Q2.\n# 次の動作をする F2 classを実装する\n# - 1. 実行するとhiインスタンスメソッドを定義するadd_hiメソッドを定義すること\n\nclass F2\nend",
  "answerCode": "# Q2. 問題の解説\n#\n# メソッドを実行したら新しいメソッドができる、ということを実感してもらうための問題です。この回答のようなdefがネストする実装は普通はやりませんが、\n# 「特定の処理を実行する時に動的にメソッドを生やす」という場面は、メタプロをしていればそれなりにあります。\n#\nclass F2\n  def add_hi\n    def hi\n    end\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestMethodFirstStep < Minitest::Test\ndef test_world\n    assert_equal F1.world, 'world'\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
