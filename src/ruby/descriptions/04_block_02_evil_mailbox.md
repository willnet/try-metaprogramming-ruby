# 日本語

次の仕様を満たすクラス、EvilMailboxを作成してください

基本機能
1. EvilMailboxは、コンストラクタで一つのオブジェクトを受け取る（このオブジェクトは、メールの送受信機能が実装されているが、それが何なのかは気にする必要はない）
2. EvilMailboxは、メールを送るメソッド `send_mail` を持ち、引数として宛先の文字列、本文の文字列を受け取る。結果の如何に関わらず、メソッドはnilをかえす。
3. send_mailメソッドは、内部でメールを送るために、コンストラクタで受け取ったオブジェクトのsend_mailメソッドを呼び出す。このときのシグネチャは同じである。また、このメソッドはメールの送信が成功したか失敗したかをbool値で返す。
4. EvilMailboxは、メールを受信するメソッド `receive_mail` を持つ
5. receive_mailメソッドは、メールを受信するためにコンストラクタで受け取ったオブジェクトのreceive_mailメソッドを呼び出す。このオブジェクトのreceive_mailは、送信者と本文の2つの要素をもつ配列を返す。
6. receive_mailメソッドは、受け取ったメールを送信者と本文の2つの要素をもつ配列として返す

応用機能

1. send_mailメソッドは、ブロックを受けとることができる。ブロックは、送信の成功/失敗の結果をBool値で引数に受け取ることができる
2. コンストラクタは、第2引数として文字列を受け取ることができる（デフォルトはnilである）
3. コンストラクタが第2引数として文字列を受け取った時、第1引数のオブジェクトはその文字列を引数にしてauthメソッドを呼び出す
4. 第2引数の文字列は、秘密の文字列のため、EvilMailboxのオブジェクトの中でいかなる形でも保存してはいけない

邪悪な機能

1. send_mailメソッドは、もしも"コンストラクタで受け取ったオブジェクトがauthメソッドを呼んだ"とき、勝手にその認証に使った文字列を、送信するtextの末尾に付け加える
2. つまり、コンストラクタが第2引数に文字列を受け取った時、その文字列はオブジェクト内に保存されないが、send_mailを呼び出したときにこっそりと勝手に送信される

# English

Create an EvilMailbox class that meets the following specifications

Basic Functions
1. EvilMailbox receives one object in its constructor (this object has mail sending/receiving functionality, but you don't need to care what it is)
2. EvilMailbox has a `send_mail` method to send mail, which takes a destination string and body string as arguments. The method returns nil regardless of the result.
3. The send_mail method internally calls the send_mail method of the object received in the constructor to send mail. The signature is the same. This method returns a boolean value indicating whether the mail was sent successfully or failed.
4. EvilMailbox has a `receive_mail` method to receive mail
5. The receive_mail method calls the receive_mail method of the object received in the constructor to receive mail. This object's receive_mail returns an array with two elements: sender and body.
6. The receive_mail method returns the received mail as an array with two elements: sender and body

Advanced Functions

1. The send_mail method can receive a block. The block can take the result of sending success/failure as a Boolean argument
2. The constructor can receive a string as the second argument (default is nil)
3. When the constructor receives a string as the second argument, the first argument object calls the auth method with that string as an argument
4. Since the string in the second argument is a secret string, it must not be saved in any form within the EvilMailbox object

Evil Functions

1. The send_mail method, if "the object received in the constructor called the auth method", automatically appends the authentication string to the end of the text to be sent
2. In other words, when the constructor receives a string as the second argument, that string is not saved in the object, but is secretly sent when send_mail is called
