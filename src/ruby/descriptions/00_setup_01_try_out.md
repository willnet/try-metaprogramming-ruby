# 日本語

TryOutクラスの仕様

コンストラクタは、2つまたは3つの引数を受け付ける。引数はそれぞれ、ファーストネーム、ミドルネーム、ラストネームの順で、ミドルネームは省略が可能。
full_nameメソッドを持つ。これは、ファーストネーム、ミドルネーム、ラストネームを半角スペース1つで結合した文字列を返す。ただし、ミドルネームが省略されている場合に、ファーストネームとラストネームの間には1つのスペースしか置かない
first_name=メソッドを持つ。これは、引数の内容でファーストネームを書き換える。
upcase_full_nameメソッドを持つ。これは、full_nameメソッドの結果をすべて大文字で返す。このメソッドは副作用を持たない。
upcase_full_name! メソッドを持つ。これは、upcase_full_nameの副作用を持つバージョンで、ファーストネーム、ミドルネーム、ラストネームをすべて大文字に変え、オブジェクトはその状態を記憶する

# English

Class Specifications
  The constructor accepts 2 or 3 arguments. The arguments are first name, middle name, and last name in that order, with middle name being optional.
  It has a full_name method. This returns a string that combines first name, middle name, and last name with a single space. However, when middle name is omitted, only one space is placed between first name and last name.
  It has a first_name= method. This replaces the first name with the content of the argument.
  It has an upcase_full_name method. This returns the result of full_name method in all uppercase. This method has no side effects.
  It has an upcase_full_name! method. This is a version of upcase_full_name with side effects, changing first name, middle name, and last name to all uppercase, and the object remembers this state
