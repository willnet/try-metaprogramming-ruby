# 日本語

次の仕様を満たすモジュール SimpleMock を作成してください

SimpleMockは、次の2つの方法でモックオブジェクトを作成できます
特に、2の方法では、他のオブジェクトにモック機能を付与します
この時、もとのオブジェクトの能力が失われてはいけません
また、これの方法で作成したオブジェクトを、以後モック化されたオブジェクトと呼びます
1.
```
# SimpleMock.new
# ```
#
# 2.
# ```
# obj = SomeClass.new
# SimpleMock.mock(obj)
# ```
#
# モック化したオブジェクトは、expectsメソッドに応答します
# expectsメソッドには2つの引数があり、それぞれ応答を期待するメソッド名と、そのメソッドを呼び出したときの戻り値です
# ```
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.imitated_method #=> true
# ```
# モック化したオブジェクトは、expectsの第一引数に渡した名前のメソッド呼び出しに反応するようになります
# そして、第2引数に渡したオブジェクトを返します
#
# モック化したオブジェクトは、watchメソッドとcalled_timesメソッドに応答します
# これらのメソッドは、それぞれ1つの引数を受け取ります
# watchメソッドに渡した名前のメソッドが呼び出されるたび、モック化したオブジェクトは内部でその回数を数えます
# そしてその回数は、called_timesメソッドに同じ名前の引数が渡された時、その時点での回数を参照することができます
# ```
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.watch(:imitated_method)
# obj.imitated_method #=> true
# obj.imitated_method #=> true
# obj.called_times(:imitated_method) #=> 2
# ```

# English

Create a SimpleMock module that meets the following specifications

SimpleMock can create mock objects in the following two ways
In particular, method 2 adds mock functionality to other objects
At this time, the original object's capabilities must not be lost
Also, objects created this way will be called mocked objects hereafter
1.
```
# SimpleMock.new
# ```
#
# 2.
# ```
# obj = SomeClass.new
# SimpleMock.mock(obj)
# ```
#
# Mocked objects respond to the expects method
# The expects method has two arguments: the method name expected to respond and the return value when that method is called
# ```
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.imitated_method #=> true
# ```
# Mocked objects will respond to method calls with the name passed as the first argument to expects
# And returns the object passed as the second argument
#
# Mocked objects respond to the watch method and called_times method
# Each of these methods receives one argument
# Every time a method with the name passed to the watch method is called, the mocked object internally counts the number of times
# And that count can be referenced when the same name argument is passed to the called_times method at that point
# ```
# obj = SimpleMock.new
# obj.expects(:imitated_method, true)
# obj.watch(:imitated_method)
# obj.imitated_method #=> true
# obj.imitated_method #=> true
# obj.called_times(:imitated_method) #=> 2
# ```
