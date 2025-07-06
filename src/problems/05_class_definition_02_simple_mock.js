// Simple Mock
export const problem = {
  "section": "05_class_definition",
  "id": "02_simple_mock",
  "title": "Simple Mock",
  "description": "シンプルなモックフレームワークの作成問題。モックオブジェクトの作成、メソッド呼び出し回数の追跡などを学びます。",
  "detailedDescription": `次の仕様を満たすモジュール SimpleMock を作成してください

SimpleMockは、次の2つの方法でモックオブジェクトを作成できます
特に、2の方法では、他のオブジェクトにモック機能を付与します
この時、もとのオブジェクトの能力が失われてはいけません
また、これの方法で作成したオブジェクトを、以後モック化されたオブジェクトと呼びます
1.
\`\`\`
# SimpleMock.new
# \`\`\`
#
# 2.
# \`\`\`
# obj = SomeClass.new
# SimpleMock.mock(obj)
# \`\`\`
#
# モック化したオブジェクトは、expectsメソッドに応答します
# expectsメソッドには2つの引数があり、それぞれ応答を期待するメソッド名と、そのメソッドを呼び出したときの戻り値です
# \`\`\`
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.imitated_method #=> true
# \`\`\`
# モック化したオブジェクトは、expectsの第一引数に渡した名前のメソッド呼び出しに反応するようになります
# そして、第2引数に渡したオブジェクトを返します
#
# モック化したオブジェクトは、watchメソッドとcalled_timesメソッドに応答します
# これらのメソッドは、それぞれ1つの引数を受け取ります
# watchメソッドに渡した名前のメソッドが呼び出されるたび、モック化したオブジェクトは内部でその回数を数えます
# そしてその回数は、called_timesメソッドに同じ名前の引数が渡された時、その時点での回数を参照することができます
# \`\`\`
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.watch(:imitated_method)
# obj.imitated_method #=> true
# obj.imitated_method #=> true
# obj.called_times(:imitated_method) #=> 2
# \`\`\``,
  "problemCode": ``,
  "answerCode": `# 問題の解説
# まずmockメソッドの実装から考えます。「もとのオブジェクトの能力が失われてはいけない」という仕様から、引数として受け付けたオブジェクトに
# SimpleMockをextendすることでモック化に必要なメソッドであるexpects, watch, called_timesを追加するようにします。
#
# expectsメソッドを実行したとき、レシーバとなるオブジェクトにだけメソッドを追加したいのでdefine_singleton_methodを利用して動的にメソッドを追加します。
# メソッドの内容は、次のようにexpectsメソッドに続けてwatchメソッドが実行されたときに備えて、
# カウンター用のインスタンス変数\`@counter\`(キーがexpectsで指定されたメソッド名、値が実行回数のハッシュ)を用意して
# watchが実行されていたら(つまり対応する\`@counter\`の値があれば)それをインクリメントするようにします。
#
# \`\`\`ruby
# obj = Object.new
# obj = SimpleMock(obj)
# obj.expects(:hoge, true)
# obj.watch(:hoge)
# obj.hoge #=> true
# \`\`\`\`
#
# また、watchを実行したときにexpects経由で定義したメソッドを上書きしないように、expectsしたメソッド名を\`@expects\`に配列として保存しておきます。
# watchでは\`@expects\`を見て、すでにexpectsで定義済みであればメソッドを上書きしないようにします。
# そうしないとwatchメソッドを実行したときに、モックメソッドの戻り値の情報が失われてしまいます。
#
# 次にnewメソッドの実装を考えます。仕様から、SimpleMockはモジュールであることを求められていますが、
# 同時にモジュールには存在しないnewメソッドを持つようにも求められています。
# これを、クラスメソッドのnewを明示的に定義することで満たします。このとき何らかのオブジェクトをmockメソッドの引数にして、
# 戻り値を返すようにすれば要件は満たせますが、モック用のオブジェクトとしては余計なメソッドをなるべく持たない方が扱いやすいので、
# Object.newをmockメソッドの引数にしています。
#
module SimpleMock
  def self.mock(obj)
    obj.extend(SimpleMock)
    obj
  end

  def self.new
    obj = Object.new
    mock(obj)
  end

  def expects(name, value)
    define_singleton_method(name) do
      @counter[name] += 1 if @counter&.key?(name)
      value
    end
    @expects ||= []
    @expects.push(name.to_sym)
  end

  def watch(name)
    (@counter ||= {})[name] = 0

    return if @expects&.include?(name.to_sym)

    define_singleton_method(name) do
      @counter[name] += 1
    end
  end

  def called_times(name)
    @counter[name]
  end
end`,
  "testCode": `require 'minitest'

class TestSimpleMock < Minitest::Test
  class ClassForMockTest
    def hoge; "hoge"; end
  end

  def test_mock_initialize
    obj = SimpleMock.new
    assert_kind_of SimpleMock, obj
  end

  def test_mock_extend
    obj = ClassForMockTest.new
    SimpleMock.mock(obj)

    assert_kind_of SimpleMock, obj
  end

  def test_mock_retuns_setted_value_when_instance
    obj = SimpleMock.new
    expected = SecureRandom.hex
    obj.expects(:imitated_method, expected)

    assert_equal obj.imitated_method, expected
  end

  def test_mock_returns_setted_value_when_extended
    obj = ClassForMockTest.new
    SimpleMock.mock(obj)
    expected = SecureRandom.hex
    obj.expects(:imitated_method, expected)

    assert_equal obj.imitated_method, expected
  end

  def test_mock_counts_how_many_times_called_method
    obj = SimpleMock.mock(ClassForMockTest.new)
    obj.watch(:hoge)

    obj.hoge
    obj.hoge
    obj.hoge

    assert_equal 3, obj.called_times(:hoge)
  end

  def test_mock_counts_how_many_times_called_mocked_method
    obj = SimpleMock.new
    obj.expects(:imitated_method, true)
    obj.watch(:imitated_method)

    obj.imitated_method
    obj.imitated_method

    assert_equal 2, obj.called_times(:imitated_method)
  end

  def test_mock_returns_value_and_counts_how_many_times
    obj = SimpleMock.new
    obj.expects(:imitated_method, 'hoge')
    obj.watch(:imitated_method)

    assert_equal('hoge', obj.imitated_method)
    assert_equal('hoge', obj.imitated_method)

    assert_equal 2, obj.called_times(:imitated_method)
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
