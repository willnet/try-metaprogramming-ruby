require 'minitest'
require 'minitest/mock'

def alpha_rand
  (0...8).map { ('a'..'z').to_a[rand(26)] }.join
end

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
end