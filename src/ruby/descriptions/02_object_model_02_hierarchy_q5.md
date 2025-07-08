# 日本語

前提: M1モジュールは変更しないこと

次の動作をする M1Refinements module を実装する
- M1Refinements は M1 の name インスタンスメソッドをリファインし,
  リファインされた name メソッドは "Refined M1" を返す
- C5.new.another_name が文字列 "M1" を返す
- C5.new.other_name が文字列 "Refined M1" を返す

# English

Premise: Do not modify the M1 module.

Implement M1Refinements module that behaves as follows
- M1Refinements refines the name instance method of M1,
  and the refined name method returns "Refined M1"
- C5.new.another_name returns the string "M1"
- C5.new.other_name returns the string "Refined M1"
