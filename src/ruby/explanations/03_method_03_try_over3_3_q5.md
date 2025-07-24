# 日本語

これまで解いてきた問題の解法と、仕様を読み解く知識が問われる問題です。2種類の書き方で同一の処理を行うが、そのうち1つは追加でdeprecation warningを出します。メソッドの実態はdefine_singleton_methodで定義し、もう1つはQ4と同様にconst_misisingを使い、runメソッド実行時にsendでもともとの定義を呼びだします。

taskで定義されていないタスク名を定数として参照したときは既存のconst_missingの処理を継続させたいのでsuperを実行しています。

# English

This is a challenge that tests the knowledge of solutions to challenges solved so far and the ability to understand specifications. It performs the same processing with two different ways of writing, but one of them additionally outputs a deprecation warning. The actual method is defined with define_singleton_method, and the other uses const_missing like Q4, calling the original definition with send when the run method is executed.

When a task name not defined by task is referenced as a constant, we want to continue the existing const_missing processing, so we execute super.