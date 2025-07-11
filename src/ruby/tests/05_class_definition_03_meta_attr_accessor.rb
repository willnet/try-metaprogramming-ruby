require 'minitest'

class TestMetaAttrAccessor < Minitest::Test
  def test_meta_attr_accessor_functionality
    MetaClass.class_eval do
      meta_attr_accessor :hello
    end

    meta = MetaClass.new
    meta.meta_hello = 'hello'
    assert_equal 'meta hello', meta.meta_hello
  end
end

def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end
