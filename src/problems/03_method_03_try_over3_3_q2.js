// Try Over3 3 Q2
export const problem = {
  "section": "03_method",
  "id": "03_try_over3_3_q2",
  "title": "Try Over3 3 Q2",
  "title_en": "Try Over3 3 Q2",
  "description": "高度なメタプログラミング技術の問題。method_missing、プロキシオブジェクト、const_missing、DSLの実装などを学びます。 (Q2)",
  "description_en": "Advanced metaprogramming techniques problems. Learn about method_missing, proxy objects, const_missing, DSL implementation, etc. (Q2)",
  "detailedDescription": `Q2
以下要件を満たす TryOver3::A2Proxy クラスを作成してください。
- TryOver3::A2Proxy は initialize に TryOver3::A2 のインスタンスを受け取り、それを @source に代入する
- TryOver3::A2Proxy は、@sourceに定義されているメソッドが自分自身に定義されているように振る舞う`,
  "detailedDescription_en": `Q2
Please create a TryOver3::A2Proxy class that meets the following requirements.
- TryOver3::A2Proxy receives an instance of TryOver3::A2 in initialize and assigns it to @source
- TryOver3::A2Proxy behaves as if methods defined in @source are defined in itself`,
  "problemCode": `TryOver3 = Module.new

class TryOver3::A2
  def initialize(name, value)
    instance_variable_set("@#{name}", value)
    self.class.attr_accessor name.to_sym unless respond_to? name.to_sym
  end
end`,
  "answerCode": `TryOver3 = Module.new

# Q2. 問題の解説
#
# method_missingとsendを使って動的プロキシを作る問題です。
# Q1と違い、こちらはrespond_to_missing?がないとテストが失敗します。
#
class TryOver3::A2
  def initialize(name, value)
    instance_variable_set("@#{name}", value)
    self.class.attr_accessor name.to_sym unless respond_to? name.to_sym
  end
end

class TryOver3::A2Proxy
  def initialize(source)
    @source = source
  end

  def method_missing(...)
    @source.send(...)
  end

  def respond_to_missing?(name, include_all)
    @source.respond_to?(name, include_all)
  end
end

# Q3.
# Module#remove_methodを利用するとメソッドを削除できます。これを使い、
# 「boolean 以外が入っている場合には #{name}? メソッドが存在しないようにする」を実現します。
# なお、メソッドを削除するメソッドはremove_methodの他にundef_methodも存在します。こちらでもテストはパスします。
# remove_methodとundef_methodの違いが気になる方はドキュメントを読んでみてください。
#
module TryOver3::OriginalAccessor2
  def self.included(mod)
    mod.define_singleton_method :my_attr_accessor do |name|
      define_method name do
        @attr
      end

      define_method "#{name}=" do |value|
        if [true, false].include?(value) && !respond_to?("#{name}?")
          self.class.define_method "#{name}?" do
            @attr == true
          end
        else
          mod.remove_method "#{name}?" if respond_to? "#{name}?"
        end
        @attr = value
      end
    end
  end
end`,
  "testCode": `require 'minitest'
require 'minitest/mock'

class TestTryOver03Q1 < Minitest::Test
def test_q2_proxy_foo
    source = TryOver3::A2.new("foo", "foofoo")
    assert_equal "foofoo", TryOver3::A2Proxy.new(source).foo
  end

def test_q2_proxy_hoge_writer
    source = TryOver3::A2.new("foo", "foo")
    proxy = TryOver3::A2Proxy.new(source)
    proxy.foo = "foofoo"
    assert_equal "foofoo", proxy.foo
  end

def test_q2_proxy_rand
    name = alpha_rand
    source = TryOver3::A2.new(name, "foo")
    assert_equal "foo", TryOver3::A2Proxy.new(source).public_send(name)
  end

def test_q2_proxy_respond_to_foo
    source = TryOver3::A2.new("foo", "foofoo")
    assert_respond_to TryOver3::A2Proxy.new(source), :foo
  end

def test_q2_proxy_methods_not_included_foo
    source = TryOver3::A2.new("foo", "foofoo")
    refute_includes TryOver3::A2Proxy.new(source).methods, :foo
  end
end

def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end`
};
