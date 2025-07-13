// Class Configuration
export const problem = {
  "section": "05_class_definition",
  "id": "04_class_configuration",
  "title": "Class Configuration",
  "title_en": "Class Configuration",
  "detailedDescription": "次のようなExConfigクラスを作成してください。ただし、グローバル変数、クラス変数は使わないものとします。\n\n使用例:\n\n```\nExConfig.config = 'hello'\nExConfig.config #=> 'hello'\nex = ExConfig.new\nex.config #=> 'hello'\nex.config = 'world'\nExConfig.config #=> 'world'\n```",
  "detailedDescription_en": "Create an ExConfig class as follows. However, do not use global variables or class variables.\n\nUsage example:\n\n```\nExConfig.config = 'hello'\nExConfig.config #=> 'hello'\nex = ExConfig.new\nex.config #=> 'hello'\nex.config = 'world'\nExConfig.config #=> 'world'\n```",
  "problemCode": "class ExConfig\nend\n",
  "answerCode": "class ExConfig\n  class << self\n    attr_writer :config\n  end\n\n  class << self\n    attr_reader :config\n  end\n\n  def config\n    self.class.config\n  end\n\n  def config=(value)\n    self.class.config = value\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestClassConfiguration < Minitest::Test\n  def test_exconfig\n    ExConfig.config = 'hello'\n    assert_equal 'hello', ExConfig.config\n    ex = ExConfig.new\n    assert_equal 'hello', ex.config\n    ex.config = 'world'\n    assert_equal 'world', ExConfig.config\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "クラス変数やグローバル変数を使わずに、クラスレベルとインスタンスレベルで状態を共有する方法の練習です。インスタンス変数をクラスの特異メソッドで管理することで実現できます。",
  "answerExplanation_en": "This is practice for sharing state between class and instance levels without using class variables or global variables. This can be achieved by managing instance variables through class singleton methods."
};
