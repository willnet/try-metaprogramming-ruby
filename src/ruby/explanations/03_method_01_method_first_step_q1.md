# 日本語

Q1. 問題の解説

define_methodとdefine_singleton_methodとmethod_missingの素振り用の問題です。
define_singleton_methodは3章にはまだ出てきていませんが、これを知らないと3章の問題を解くのが難しくなるので覚えておいてください
respond_to_missing?は、respond_to?メソッド実行時にメソッドが定義されていない場合に呼ばれるメソッドです。method_missingを定義する場合は
必ず定義しておきましょう。

# English

Q1. Problem Explanation

This is a practice problem for define_method, define_singleton_method, and method_missing.
define_singleton_method doesn't appear in Chapter 3 yet, but you need to know this to solve Chapter 3 problems, so please remember it.
respond_to_missing? is a method called when respond_to? method is executed and the method is not defined. Always define this when you define method_missing.
