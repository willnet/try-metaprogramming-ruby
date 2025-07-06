# 日本語

次の仕様を満たすSimpleBotクラスとDSLを作成してください

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
    1. settingメソッドに渡された値は、クラスメソッド `settings` から返されるオブジェクトに、メソッド名としてアクセスすることで取り出すことができます
#     2. e.g. クラス内で `setting :name, 'bot'` と実行した場合は、respondメソッドに渡されるブロックのスコープ内で `settings.name` の戻り値は `bot` の文字列になります

# English

Create a SimpleBot class and DSL that meet the following specifications

This is how the SimpleBot class you create will be used:
class Bot < SimpleBot
  setting :name, 'bot'
  respond 'keyword' do
    "response #{settings.name}"
  end
end

Bot.new.ask('keyword') #=> 'respond bot'

1. Classes that inherit from SimpleBot have class methods respond, setting, and settings
    1. The settings method returns an arbitrary object
    2. The settings method responds to method calls with the same name as the first argument passed by the setting class method described later
2. Instances of SimpleBot subclasses have an instance method ask
    1. ask takes one argument
    2. When the object passed to ask matches the object set by the respond method described later, the instance has an arbitrary return value
    3. If case 2 does not apply, the return value of the ask method is nil
3. The class method respond takes a keyword and a block as arguments
    1. When the same string as the first argument keyword of the respond method is passed to the instance method ask, the block passed as the second argument is executed and its result is returned
4. The class method setting takes two arguments, the first being the key name and the second being the value to set
    1. Values passed to the setting method can be retrieved by accessing them as method names from the object returned by the `settings` class method
#     2. e.g. If `setting :name, 'bot'` is executed in the class, the return value of `settings.name` within the scope of the block passed to the respond method will be the string `bot`
