# 日本語

この問題は、複数のモジュールのinclude/prependと継承を組み合わせた場合の継承チェーンの順序を理解することが重要です。

継承チェーンの構築ルール：
1. `prepend`されたモジュールは、クラスの前に配置される
2. `include`されたモジュールは、クラスの後に配置される（後からincludeしたものが先）
3. スーパークラスとそのモジュールは、現在のクラスのモジュールの後に配置される

この問題では：
- M1は`prepend`されているため、最初に来る
- 次にC3クラス自体
- M2とM3は`include`の逆順で配置される（M2、M3の順）
- 最後にMySuperClassとそれにincludeされたM4が来る

結果として、M1の`name`メソッドが最初に見つかるため、'M1'が返されます。

# English

This challenge requires understanding the order of the inheritance chain when combining multiple module include/prepend operations with inheritance.

Rules for building the inheritance chain:
1. `prepend`ed modules are placed before the class
2. `include`d modules are placed after the class (later includes come first)
3. The superclass and its modules are placed after the current class's modules

In this challenge:
- M1 comes first because it's `prepend`ed
- Then the C3 class itself
- M2 and M3 are placed in reverse order of inclusion (M2, then M3)
- Finally, MySuperClass and its included M4

As a result, the `name` method from M1 is found first, so 'M1' is returned.