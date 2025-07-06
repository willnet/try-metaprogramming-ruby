require 'minitest'

class TestMetaAttrAccessor < Minitest::Test
  def test_meta_attr_accessor_functionality
    meta = MetaClass.new
    
    # Test setter
    meta.meta_hello = 'world'
    
    # Test getter returns value with 'meta ' prefix
    assert_equal 'meta world', meta.meta_hello
  end
  
  def test_meta_attr_accessor_with_different_values
    meta = MetaClass.new
    
    meta.meta_hello = 'test'
    assert_equal 'meta test', meta.meta_hello
    
    meta.meta_hello = 'ruby'
    assert_equal 'meta ruby', meta.meta_hello
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