// Hierarchy Q4
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q4",
  "title": "Hierarchy Q4",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q4)",
  "detailedDescription": `Q4.
次の動作をする C4 class のメソッド increment を実装する
- increment メソッドを呼ぶと value が +1 される
- また、increment メソッドは value を文字列にしたものを返す
  c4 = C4.new
  c4.increment # => "1"
  c4.increment # => "2"
  c4.increment # => "3"
- 定義済みのメソッド (value, value=) は private のままとなっている
- incrementメソッド内で value, value=を利用する`,
  "problemCode": `module M1
  def name
    'M1'
  end
end

module M2
  def name
    'M2'
  end
end

module M3
  def name
    'M3'
  end
end

module M4
  def name
    'M4'
  end
end

# NOTE: これより上の行は変更しないこと

class C4
  private

  attr_accessor :value
end`,
  "answerCode": `module M1
  def name
    'M1'
  end
end

module M2
  def name
    'M2'
  end
end

module M3
  def name
    'M3'
  end
end

module M4
  def name
    'M4'
  end
end

# NOTE: これより上の行は変更しないこと

# Q4. 問題の解説
#
# privateメソッドとして定義していると、レシーバを明示的に指定したメソッド呼び出しができません。
# しかしこれには例外があり、レシーバがselfであれば問題ありません。
# この仕様はRuby2.7からのものであり、2.7未満はセッターメソッド(=が末尾についているもの)のみがselfをつけて呼び出し可能でした。
class C4
  def increment
    self.value ||= 0
    self.value += 1
    value.to_s
  end
  private

  attr_accessor :value
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c4_increment
    c4 = C4.new
    assert_equal "1", c4.increment
    assert_equal "2", c4.increment
    assert_equal "3", c4.increment
  end

def test_c4_value_called
    c4 = C4.new
    c4.singleton_class.class_eval do
      private

      def value=(x)
        @called_setter = true
        @value = x
      end

      def value
        @called_getter = true
        if defined?(@value)
          @value
        else
          nil
        end
      end
    end
    c4.instance_variable_set(:"@called_setter", nil)
    c4.instance_variable_set(:"@called_getter", nil)

    assert_equal "1", c4.increment
    assert c4.instance_variable_get(:"@called_setter")
    assert c4.instance_variable_get(:"@called_getter")
  end

def test_c4_value_methods
    assert C4.private_instance_methods.include?(:value)
    assert C4.private_instance_methods.include?(:value=)
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
