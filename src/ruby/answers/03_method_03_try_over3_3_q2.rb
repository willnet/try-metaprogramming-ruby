TryOver3 = Module.new

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
        elsif respond_to? "#{name}?"
          mod.remove_method "#{name}?"
        end
        @attr = value
      end
    end
  end
end
