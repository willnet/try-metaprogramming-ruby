// Simple Model
export const problem = {
  "section": "06_codes_generate_codes",
  "id": "01_simple_model",
  "title": "Simple Model",
  "description": "ActiveRecordライクなモデルの実装問題。変更追跡機能付きのattr_accessorとrestoreメソッドを学びます。",
  "problemCode": `# 次の仕様を満たす、SimpleModelモジュールを作成してください
#
# 1. include されたクラスがattr_accessorを使用すると、以下の追加動作を行う
#   1. 作成したアクセサのreaderメソッドは、通常通りの動作を行う
#   2. 作成したアクセサのwriterメソッドは、通常に加え以下の動作を行う
#     1. 何らかの方法で、writerメソッドを利用した値の書き込み履歴を記憶する
#     2. いずれかのwriterメソッド経由で更新をした履歴がある場合、 \`true\` を返すメソッド \`changed?\` を作成する
#     3. 個別のwriterメソッド経由で更新した履歴を取得できるメソッド、 \`ATTR_changed?\` を作成する
#       1. 例として、\`attr_accessor :name, :desc\`　とした時、このオブジェクトに対して \`obj.name = 'hoge'\` という操作を行ったとする
#       2. \`obj.name_changed?\` は \`true\` を返すが、 \`obj.desc_changed?\` は \`false\` を返す
#       3. 参考として、この時 \`obj.changed?\` は \`true\` を返す
# 2. initializeメソッドはハッシュを受け取り、attr_accessorで作成したアトリビュートと同名のキーがあれば、自動でインスタンス変数に記録する
#   1. ただし、この動作をwriterメソッドの履歴に残してはいけない
# 3. 履歴がある場合、すべての操作履歴を放棄し、値も初期状態に戻す \`restore!\` メソッドを作成する

module SimpleModel
end`,
  "answerCode": `# 問題の解説
#
# includeされたクラスのattr_accessorメソッドの挙動を変更するために、まずincludedフックメソッドを利用します。
#
# 初期値を管理する\`_histories\`と\`_initial\`属性をattr_accessorで用意しておきます。
# historiesやinitialといった名前はクラスのメソッド定義などと衝突する可能性が高いので、\`_\`を先頭につけて回避するようにしています。
# \`_histories\`は、writerメソッドを呼び出した時に、その値を記憶するためのハッシュです。キーは属性名、値はその属性に対する書き込み履歴の配列です。
# \`_initial\`は、初期値を記憶するためのハッシュです。キーは属性名、値はその属性の初期値です。
#
# includedの中で対象のクラスをextendして、クラスメソッドであるattr_accessorメソッドを再定義します。
# readerメソッドは通常通りの動作を行う、と仕様にあるのでattr_readerを呼び出しています。
# writerメソッドは、通常に加え以下の動作を行うと仕様にあるので、独自に定義します。writerメソッドの中で、\`_histories\`に書き込み履歴を追記させています。
# そのうえで、instance_variable_setで属性の値を書き換えています。
#
# initializeメソッドを定義し、\`_initial\`と\`_histories\`の初期化と\`_initial\`への初期値の記憶を行っています。
# 残りの\`restore\`, \`changed?\`, \`ATTR_changed?\`メソッドは、\`_initial\`と\`_histories\`を活用することで問題なく実装できるはずです。
#
module SimpleModel
  def self.included(klass)
    klass.attr_accessor :_histories, :_initial
    klass.extend(ClassMethods)
  end

  def initialize(args = {})
    self._initial = args
    self._histories = {}
    args.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def restore!
    self._histories = {}
    _initial.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def changed?
    !_histories.empty?
  end

  module ClassMethods
    def attr_accessor(*syms)
      syms.each { |sym| attr_reader sym }
      syms.each do |sym|
        define_method "#{sym}=" do |value|
          (_histories[sym] ||= []).push(value)
          instance_variable_set("@#{sym}", value)
        end

        define_method "#{sym}_changed?" do
          !!_histories[sym]
        end
      end
    end
  end
end`,
  "testCode": `require 'minitest'

class TestSimpleModel < Minitest::Test
  class Product
    include SimpleModel

    attr_accessor :name, :description
  end

  def test_accessor
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    assert_equal 'SmarterHR', obj.name
    assert_equal 'more smart SmartHR', obj.description
  end

  def test_writer
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = 'Ultra SmarterHR'
    obj.description = 'more smart SmarterHR'
    assert_equal 'Ultra SmarterHR', obj.name
    assert_equal 'more smart SmarterHR', obj.description
  end

  def test_watching_not_changes_attrs
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    assert_equal false, obj.changed?
  end

  def test_watching_changes_attrs
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = 'SuperSmarterHR'
    assert_equal true, obj.changed?
  end

  def test_watching_changes_each_attrs
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = 'SuperSmarterHR'
    assert_equal true, obj.name_changed?
    assert_equal false, obj.description_changed?
  end

  def test_restore_changes
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = 'Ultra SmarterHR'
    obj.description = 'more smart SmarterHR'
    obj.restore!
    assert_equal 'SmarterHR', obj.name
    assert_equal 'more smart SmartHR', obj.description
    assert_equal false, obj.changed?
  end

  def test_random_read
    name  = SecureRandom.hex
    desc  = SecureRandom.hex
    obj = Product.new(name: name, description: desc)
    assert_equal name, obj.name
    assert_equal desc, obj.description
  end

  def test_random_write
    name  = SecureRandom.hex
    desc  = SecureRandom.hex
    obj = Product.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = name
    obj.description = desc
    assert_equal name, obj.name
    assert_equal desc, obj.description
  end

  class MultipleAccessorsProduct
    include SimpleModel

    attr_accessor :name
    attr_accessor :description
  end

  def test_multiple_accessors
    obj = MultipleAccessorsProduct.new(name: 'SmarterHR', description: 'more smart SmartHR')
    assert_equal 'SmarterHR', obj.name
    assert_equal 'more smart SmartHR', obj.description
  end

  def test_multiple_accessors_writer
    obj = MultipleAccessorsProduct.new(name: 'SmarterHR', description: 'more smart SmartHR')
    obj.name = 'Ultra SmarterHR'
    obj.description = 'more smart SmarterHR'
    assert_equal 'Ultra SmarterHR', obj.name
    assert_equal 'more smart SmarterHR', obj.description
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
