#    Judement.callはテスト側で定義するので実装は不要です。この状況でe2オブジェクト"だけ"helloメソッドを

class ExClass
end

e1 = ExClass.new
e2 = ExClass.new

Judgement.call(e1, e2)

#    その無名クラスをそのままJudgement2.call の引数として渡してください(Judgement2.callはテスト側で定義するので実装は不要です)



class MetaClass
end



class ExConfig
end

# ただしExOver#hello, ExOver#before, ExOver#afterの実装はそれぞれテスト側で定義しているので実装不要(変更不可)です。


class ExOver
end

#    ヒント: スコープゲートを乗り越える方法について書籍にありましたね

class MyGreeting
end

toplevellocal = 'hi'