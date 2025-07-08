// Scope Gates
export const problem = {
  "section": "05_class_definition",
  "id": "06_scope_gates",
  "title": "Scope Gates",
  "title_en": "Scope Gates",
  "description": "スコープゲートについての問題。ローカル変数をクラス定義を越えて使用する方法を学びます。",
  "description_en": "A problem about scope gates. Learn how to use local variables across class definitions.",
  "detailedDescription": "次の toplevellocal ローカル変数の中身を返す MyGreeting#say を実装してみてください。ただし、下のMyGreetingは編集しないものとします。toplevellocal ローカル変数の定義の下の行から編集してください。ヒント: スコープゲートを乗り越える方法について書籍にありましたね",
  "detailedDescription_en": "Implement MyGreeting#say that returns the contents of the toplevellocal local variable below. However, do not edit the MyGreeting below. Edit from the line below the definition of the toplevellocal local variable. Hint: There was information in the book about how to overcome scope gates.",
  "problemCode": "class MyGreeting\n  # Do not edit this class\nend\n\ntoplevellocal = 'hi'\n# Edit from this line below to implement MyGreeting#say that returns toplevellocal\n",
  "answerCode": "class MyGreeting\n  # Do not edit this class\nend\n\ntoplevellocal = 'hi'\n# Edit from this line below to implement MyGreeting#say that returns toplevellocal\n\nMyGreeting.class_eval do\n  define_method(:say) do\n    toplevellocal\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestScopeGates < Minitest::Test\n  def test_my_greeting_say_returns_toplevel_variable\n    greeting = MyGreeting.new\n    assert_equal 'hi', greeting.say\n  end\n\n  def test_my_greeting_responds_to_say\n    greeting = MyGreeting.new\n    assert greeting.respond_to?(:say)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "スコープゲートを越える方法の練習です。class_evalとdefine_methodを組み合わせることで、ローカル変数をクロージャとして捕獲し、メソッド内で使用できるようになります。",
  "answerExplanation_en": "This is practice for crossing scope gates. By combining class_eval and define_method, you can capture local variables as closures and use them within methods."
};
