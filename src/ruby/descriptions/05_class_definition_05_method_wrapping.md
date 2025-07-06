# 日本語

ExOver#helloというメソッドがライブラリとして定義されているとします。ExOver#helloメソッドを実行したとき、helloメソッドの前にExOver#before、helloメソッドの後にExOver#afterを実行させるようにExOverを変更しましょう。ただしExOver#hello, ExOver#before, ExOver#afterの実装はそれぞれテスト側で定義しているので実装不要(変更不可)です。

# English

Assume that a method called ExOver#hello is defined as a library. When executing the ExOver#hello method, modify ExOver to execute ExOver#before before the hello method and ExOver#after after the hello method. However, the implementations of ExOver#hello, ExOver#before, and ExOver#after are each defined on the test side, so implementation is not required (cannot be changed).