// TryOut
export const problem = {
  "section": "00_setup",
  "id": "01_try_out",
  "title": "TryOut",
  "description": "基本的なクラス実装の練習。コンストラクタ、メソッド、アクセサなどの基本的な機能を実装します。",
  "detailedDescription": `このクラスの仕様
  コンストラクタは、2つまたは3つの引数を受け付ける。引数はそれぞれ、ファーストネーム、ミドルネーム、ラストネームの順で、ミドルネームは省略が可能。
  full_nameメソッドを持つ。これは、ファーストネーム、ミドルネーム、ラストネームを半角スペース1つで結合した文字列を返す。ただし、ミドルネームが省略されている場合に、ファーストネームとラストネームの間には1つのスペースしか置かない
  first_name=メソッドを持つ。これは、引数の内容でファーストネームを書き換える。
  upcase_full_nameメソッドを持つ。これは、full_nameメソッドの結果をすべて大文字で返す。このメソッドは副作用を持たない。
  upcase_full_name! メソッドを持つ。これは、upcase_full_nameの副作用を持つバージョンで、ファーストネーム、ミドルネーム、ラストネームをすべて大文字に変え、オブジェクトはその状態を記憶する`,
  "problemCode": `class TryOut
end`,
  "answerCode": `# 問題の解説
#
# ミドルネームが渡されないことがある、というのをどう扱うかがこの問題のポイントです。
# \`def initialize(first_name, middle_name = nil, last_name)\`のようにメソッドを定義することで
# 簡潔に仕様を満たすことができます。
# あとはスペースで各要素を区切るやり方としてArray#joinを使っているのもポイントです。
# これ以外にも複数の解法があります。この回答通りになっていなくても問題ありません。
class TryOut
  attr_writer :first_name

  def initialize(first_name, middle_name = nil, last_name)
    @first_name = first_name
    @middle_name = middle_name
    @last_name = last_name
  end

  def full_name
    [@first_name, @middle_name, @last_name].compact.join(' ')
  end

  def upcase_full_name
    full_name.upcase
  end

  def upcase_full_name!
    @first_name.upcase!
    @middle_name&.upcase!
    @last_name.upcase!
    full_name
  end
end`,
  "testCode": `require 'minitest'

class TryOutTest < Minitest::Test
  def test_first_last_name
    target = TryOut.new("John", "Wick")
    assert_equal "John Wick", target.full_name
  end

  def test_first_middle_last_name
    target = TryOut.new("Keanu", "Charies",  "Reeves")
    assert_equal "Keanu Charies Reeves", target.full_name
  end

  def test_first_name_accessor
    target = TryOut.new("Henrik", "Vanger")
    target.first_name = "Martin"
    assert_equal "Martin Vanger", target.full_name
  end

  def test_upcase_full_name
    target = TryOut.new("Arthur", "Fleck")
    assert_equal "ARTHUR FLECK", target.upcase_full_name
  end

  def test_upcase_full_name_no_side_effect
    target = TryOut.new("Lorraine", "Broughton")
    target.upcase_full_name
    assert_equal "Lorraine Broughton", target.full_name
  end

  def test_upcase_full_name_bang
    target = TryOut.new("Earl", "Stone")
    assert_equal "EARL STONE", target.upcase_full_name!
  end

  def test_upcase_full_name_bang_has_side_effect
    target = TryOut.new("Murphy", "McManus")
    target.upcase_full_name!
    assert_equal "MURPHY MCMANUS", target.full_name
  end

  def test_too_few_arguments
    assert_raises (ArgumentError) {TryOut.new("John")}
  end

  def test_too_many_arguments
    assert_raises (ArgumentError) {TryOut.new("John", "Milton", "Cage", "Jr")}
  end
end

# 明示的にテストを実行するためのコード
def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end`
};
