# 日本語

Q4.
次の動作をする C4 class のメソッド increment を実装する
- increment メソッドを呼ぶと value が +1 される
- また、increment メソッドは value を文字列にしたものを返す
  c4 = C4.new
  c4.increment # => "1"
  c4.increment # => "2"
  c4.increment # => "3"
- 定義済みのメソッド (value, value=) は private のままとなっている
- incrementメソッド内で value, value=を利用する

# English

Q4.
Implement the increment method of C4 class that behaves as follows
- Calling the increment method increases value by +1
- The increment method returns the value as a string
  c4 = C4.new
  c4.increment # => "1"
  c4.increment # => "2"
  c4.increment # => "3"
- The predefined methods (value, value=) remain private
- Use value, value= within the increment method
