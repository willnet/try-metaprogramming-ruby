// Evil Mailbox
export const problem = {
  "section": "04_block",
  "id": "02_evil_mailbox",
  "title": "Evil Mailbox",
  "title_en": "Evil Mailbox",
  "description": "複雑なブロック処理とクロージャキャプチャを使ったメールボックスの実装問題。認証機能や秘密文字列の処理を学びます。",
  "description_en": "An implementation problem of a mailbox using complex block processing and closure capture. Learn about authentication features and secret string handling.",
  "detailedDescription": `次の仕様を満たすクラス、EvilMailboxを作成してください

基本機能
1. EvilMailboxは、コンストラクタで一つのオブジェクトを受け取る（このオブジェクトは、メールの送受信機能が実装されているが、それが何なのかは気にする必要はない）
2. EvilMailboxは、メールを送るメソッド \`send_mail\` を持ち、引数として宛先の文字列、本文の文字列を受け取る。結果の如何に関わらず、メソッドはnilをかえす。
# 3. send_mailメソッドは、内部でメールを送るために、コンストラクタで受け取ったオブジェクトのsend_mailメソッドを呼び出す。このときのシグネチャは同じである。また、このメソッドはメールの送信が成功したか失敗したかをbool値で返す。
# 4. EvilMailboxは、メールを受信するメソッド \`receive_mail\` を持つ
# 5. receive_mailメソッドは、メールを受信するためにコンストラクタで受け取ったオブジェクトのreceive_mailメソッドを呼び出す。このオブジェクトのreceive_mailは、送信者と本文の2つの要素をもつ配列を返す。
# 6. receive_mailメソッドは、受け取ったメールを送信者と本文の2つの要素をもつ配列として返す
#
# 応用機能
# 1. send_mailメソッドは、ブロックを受けとることができる。ブロックは、送信の成功/失敗の結果をBool値で引数に受け取ることができる
# 2. コンストラクタは、第2引数として文字列を受け取ることができる（デフォルトはnilである）
# 3. コンストラクタが第2引数として文字列を受け取った時、第1引数のオブジェクトはその文字列を引数にしてauthメソッドを呼び出す
# 4. 第2引数の文字列は、秘密の文字列のため、EvilMailboxのオブジェクトの中でいかなる形でも保存してはいけない
#
# 邪悪な機能
# 1. send_mailメソッドは、もしも"コンストラクタで受け取ったオブジェクトがauthメソッドを呼んだ"とき、勝手にその認証に使った文字列を、送信するtextの末尾に付け加える
# 2. つまり、コンストラクタが第2引数に文字列を受け取った時、その文字列はオブジェクト内に保存されないが、send_mailを呼び出したときにこっそりと勝手に送信される`,
  "detailedDescription_en": `Create an EvilMailbox class that meets the following specifications

Basic Functions
1. EvilMailbox receives one object in its constructor (this object has mail sending/receiving functionality, but you don't need to care what it is)
2. EvilMailbox has a \`send_mail\` method to send mail, which takes a destination string and body string as arguments. The method returns nil regardless of the result.
# 3. The send_mail method internally calls the send_mail method of the object received in the constructor to send mail. The signature is the same. This method returns a boolean value indicating whether the mail was sent successfully or failed.
# 4. EvilMailbox has a \`receive_mail\` method to receive mail
# 5. The receive_mail method calls the receive_mail method of the object received in the constructor to receive mail. This object's receive_mail returns an array with two elements: sender and body.
# 6. The receive_mail method returns the received mail as an array with two elements: sender and body
#
# Advanced Functions
# 1. The send_mail method can receive a block. The block can take the result of sending success/failure as a Boolean argument
# 2. The constructor can receive a string as the second argument (default is nil)
# 3. When the constructor receives a string as the second argument, the first argument object calls the auth method with that string as an argument
# 4. Since the string in the second argument is a secret string, it must not be saved in any form within the EvilMailbox object
#
# Evil Functions
# 1. The send_mail method, if "the object received in the constructor called the auth method", automatically appends the authentication string to the end of the text to be sent
# 2. In other words, when the constructor receives a string as the second argument, that string is not saved in the object, but is secretly sent when send_mail is called`,
  "problemCode": ``,
  "answerExplanation": `問題の解説

仕様の「邪悪な機能」をクロージャを使って実装することに気付けるかどうかを問う問題です。
initializeメソッドの中でdefine_singleton_methodを利用してsend_mailメソッドを定義することで、
initializeメソッドのローカル変数として第2引数を扱います。こうすることで、
send_mailメソッドの中でしか参照できない変数ができあがります。`,
  "answerExplanation_en": `Problem Explanation

This problem tests whether you can realize that the "evil function" in the specification can be implemented using closures.
By defining the send_mail method using define_singleton_method inside the initialize method,
the second argument is handled as a local variable of the initialize method. This creates
a variable that can only be referenced within the send_mail method.`,
  "answerCode": `class EvilMailbox
  def initialize(obj, str = nil)
    @obj = obj
    @obj.auth(str) if str

    define_singleton_method(:send_mail) do |to, body, &block|
      result = obj.send_mail(to, body + str.to_s)
      block.call(result) if block
      nil
    end
  end

  def receive_mail
    obj.receive_mail
  end

  private

  attr_reader :obj
end`,
  "testCode": `require 'minitest'

class TestEvilMailbox < Minitest::Test
  def evil_mailbox(&block)
    mock = Minitest::Mock.new
    mock.instance_eval(&block) if block_given?
    [EvilMailbox.new(mock), mock]
  end

  def test_send_mail
    mb, mock = evil_mailbox do
      expect :send_mail, true, ["ppyd", "hello"]
    end
    mb.send_mail("ppyd", "hello")
    mock.verify
  end

  def test_send_mail_returns_nil
    mb, _ = evil_mailbox do
      expect :send_mail, true, ["ppyd", "hello"]
    end
    assert_nil mb.send_mail("ppyd", "hello")
  end

  def test_receive_mail
    mb, mock = evil_mailbox do
      expect :receive_mail, ["kino", "Yo"]
    end
    f, t = mb.receive_mail
    mock.verify
    assert_equal "kino", f
    assert_equal "Yo", t
  end

  def test_send_mail_exec_block_with_result_true
    mb, _ = evil_mailbox do
      expect :send_mail, true, ["ppyd", "hello"]
    end
    ret = nil
    mb.send_mail("ppyd", "hello") do |res|
      ret = res
    end
    assert_equal true, ret
  end

  def test_send_mail_exec_block_with_result_false
    mb, _ = evil_mailbox do
      expect :send_mail, false, ["ppyd", "hello"]
    end
    ret = nil
    mb.send_mail("ppyd", "hello") do |res|
      ret = res
    end
    assert_equal false, ret
  end

  def test_mail_object_auth
    secret_string = SecureRandom.hex
    mock = Minitest::Mock.new
    mock.expect :auth, true, [String]
    EvilMailbox.new(mock, secret_string)
    mock.verify
  end

  def test_send_mail_with_secret_string
    secret_string = SecureRandom.hex
    mock = Minitest::Mock.new
    mock.expect :auth, true, [String]
    mock.expect :send_mail, true, ["ppyd", "hello#{secret_string}"]
    mb = EvilMailbox.new(mock, secret_string)

    mb.send_mail("ppyd", "hello")
    mock.verify
  end

  def test_no_secret_string_in_object
    secret_string = SecureRandom.hex
    mock = Minitest::Mock.new
    mock.expect :auth, true, [String]
    mb = EvilMailbox.new(mock, secret_string)

    mock.verify
    mb.class.send(:class_variables).each do |cv|
      assert_equal false, secret_string == mb.class.get_class_variable(cv)
    end
    mb.send(:instance_variables).each do |iv|
      assert_equal false, secret_string == mb.instance_variable_get(iv)
    end
  end

  def evil_mailbox_with_secret_string(secret_string, &block)
    mock = Minitest::Mock.new
    mock.instance_eval(&block) if block_given?
    [EvilMailbox.new(mock, secret_string), mock]
  end

  def test_send_mail_exec_block_with_result_true_and_secret_string
    secret_string = SecureRandom.hex
    mb, mock = evil_mailbox_with_secret_string(secret_string) do
      expect :auth, true, [String]
      expect :send_mail, true, ["ppyd", "hello#{secret_string}"]
    end

    ret = nil
    mb.send_mail("ppyd", "hello") do |res|
      ret = res
    end
    mock.verify
    assert_equal true, ret
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
