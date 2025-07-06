// Simple Bot
export const problem = {
  "section": "04_block",
  "id": "03_simple_bot",
  "title": "Simple Bot",
  "description": "ブロックを使ったDSLの作成問題。ボット作成のためのDSLを実装して、respond、setting、settingsメソッドを学びます。",
  "detailedDescription": `次の仕様を満たすSimpleBotクラスとDSLを作成してください

これは、作成するSimpleBotクラスの利用イメージです
class Bot < SimpleBot
  setting :name, 'bot'
  respond 'keyword' do
    "response #{settings.name}"
  end
end

Bot.new.ask('keyword') #=> 'respond bot'

1. SimpleBotクラスを継承したクラスは、クラスメソッドrespond, setting, settingsを持ちます
    1. settingsメソッドは、任意のオブジェクトを返します
    2. settingsメソッドは、後述するクラスメソッドsettingによって渡された第一引数と同名のメソッド呼び出しに応答します
2. SimpleBotクラスのサブクラスのインスタンスは、インスタンスメソッドaskを持ちます
    1. askは、一つの引数をとります
    2. askに渡されたオブジェクトが、後述するrespondメソッドで設定したオブジェクトと一致する場合、インスタンスは任意の返り値を持ちます
    3. 2のケースに当てはまらない場合、askメソッドの戻り値はnilです
3. クラスメソッドrespondは、keywordとブロックを引数に取ります
    1. respondメソッドの第1引数keywordと同じ文字列が、インスタンスメソッドaskに渡された時、第2引数に渡したブロックが実行され、その結果が返されます
4. クラスメソッドsettingは、引数を2つ取り、1つ目がキー名、2つ目が設定する値です
    1. settingメソッドに渡された値は、クラスメソッド \`settings\` から返されるオブジェクトに、メソッド名としてアクセスすることで取り出すことができます
#     2. e.g. クラス内で \`setting :name, 'bot'\` と実行した場合は、respondメソッドに渡されるブロックのスコープ内で \`settings.name\` の戻り値は \`bot\` の文字列になります`,
  "problemCode": ``,
  "answerCode": `# 問題の解説
#
# respondクラスメソッドで定義したブロックを、askインスタンスメソッドからどうやって参照するか、というのが
# この問題の難所です。クラスメソッドで定義したインスタンス変数はクラスインスタンス変数としてクラスそのものに
# 紐づくインスタンス変数になるので、インスタンスメソッドから参照するには、回答例のように
# \`self.class.instance_variable_get(インスタンス変数名)\`のようにします。
# クラス変数を利用するとクラスメソッド、インスタンスメソッドどちらからでも\`@@respond\`のようにアクセスできるので
# 一見便利ですが、意図せず別のクラスとクラス変数が共有される可能性があるため、推奨しません。
#
# SimpleBotとそのサブクラスで利用イメージのように定義されたブロックは、settingsクラスメソッドにアクセスできます。
# settingsクラスメソッドは、settingクラスメソッドで登録したキーと値をそれぞれメソッド名とその返り値に持つオブジェクトを返すと
# 仕様を満たせます。メソッドが定義できればどんなオブジェクトを返しても仕様を満たせるため、この回答例では
# 特異メソッドを定義したObjectインスタンスを返しています。必ずしもObjectインスタンスである必要はありません。
#
class SimpleBot
  class << self
    def respond(keyword, &block)
      @respond ||= {}
      @respond[keyword] = block
    end

    def setting(key, value)
      @settings ||= {}
      @settings[key] = value
    end

    def settings
      obj = Object.new

      @settings&.each do |key, value|
        obj.define_singleton_method(key) do
          value
        end
      end
      obj
    end
  end

  def ask(keyword)
    block = self.class.instance_variable_get(:@respond)[keyword]
    block.call if block
  end
end`,
  "testCode": `require 'minitest'

class TestSimpleBot < Minitest::Test
  def bot_for_test(&block)
    Class.new(SimpleBot, &block)
  end

  def test_response
    klass = bot_for_test do
      respond 'hello' do
        'Yo'
      end
    end

    assert_equal 'Yo', klass.new.ask('hello')
  end

  def test_no_response
    klass = bot_for_test do
      respond 'yo' do
        'yo'
      end
    end

    assert_nil klass.new.ask("hello")
  end

  def test_global_setting
    klass = bot_for_test do
      setting :name, 'bot'
      respond 'what is your name?' do
        "i'm #{settings.name}"
      end
    end

    assert_equal "i'm bot", klass.new.ask("what is your name?")
  end

  def test_global_setting_random
    code = SecureRandom.hex

    klass = bot_for_test do
      setting :code, code
      respond 'tell me your code' do
        "code is #{settings.code}"
      end
    end

    assert_equal "code is #{code}", klass.new.ask('tell me your code')
  end

  def test_global_setting_multiple_call
    klass = bot_for_test do
      setting :name, 'bot'
      setting :age, 10
      respond 'what is your name?' do
        "i'm #{settings.name}"
      end
      respond 'how old are you?' do
        "i'm #{settings.age} years old"
      end
    end

    assert_equal "i'm bot", klass.new.ask("what is your name?")
    assert_equal "i'm 10 years old", klass.new.ask("how old are you?")
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
