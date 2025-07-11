# 日本語

const_missingを利用して、runners=で定義した定数を参照したときにrunメソッドを持つオブジェクトを返すことで仕様を満たしています。回答例ではObject.newでオブジェクトを生成しましたが、runメソッドを持つオブジェクトであればどんなクラスのインスタンスでもOKです。

# English

By using const_missing, the specification is satisfied by returning an object with a run method when referencing constants defined by runners=. In the answer example, we created an object with Object.new, but any instance of any class is acceptable as long as it has a run method.