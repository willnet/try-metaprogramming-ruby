// Method Wrapping
export const problem = {
  "section": "05_class_definition",
  "id": "05_method_wrapping",
  "title": "Method Wrapping",
  "title_en": "Method Wrapping",
  "description": "メソッドラッピングについての問題。既存メソッドの前後に処理を追加する方法を学びます。",
  "description_en": "A problem about method wrapping. Learn how to add processing before and after existing methods.",
  "detailedDescription": "ExOver#helloというメソッドがライブラリとして定義されているとします。ExOver#helloメソッドを実行したとき、helloメソッドの前にExOver#before、helloメソッドの後にExOver#afterを実行させるようにExOverを変更しましょう。ただしExOver#hello, ExOver#before, ExOver#afterの実装はそれぞれテスト側で定義しているので実装不要(変更不可)です。",
  "detailedDescription_en": "Assume that a method called ExOver#hello is defined as a library. When executing the ExOver#hello method, modify ExOver to execute ExOver#before before the hello method and ExOver#after after the hello method. However, the implementations of ExOver#hello, ExOver#before, and ExOver#after are each defined on the test side, so implementation is not required (cannot be changed).",
  "problemCode": "class ExOver\nend\n",
  "answerCode": "module HelloWrapper\n  def hello\n    before\n    super\n    after\n  end\nend\n\nclass ExOver\n  prepend HelloWrapper\nend\n",
  "testCode": "require 'minitest'\n\nclass ExOver\n  attr_accessor :result\n\n  def initialize\n    self.result = ''\n  end\n\n  def before\n    result << 'before'\n  end\n\n  def hello\n    result << 'hello'\n  end\n\n  def after\n    result << 'after'\n  end\nend\n\nclass TestMethodWrapping < Minitest::Test\n  def test_exover\n    exover = ExOver.new\n    assert_equal 'beforehelloafter', exover.hello\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "既存メソッドのラッピング（アスペクト指向プログラミング）の練習です。alias_methodで元のメソッドを保存し、新しい実装で前後に処理を追加します。",
  "answerExplanation_en": "This is practice for method wrapping (aspect-oriented programming). Use alias_method to save the original method, then create a new implementation that adds processing before and after."
};
