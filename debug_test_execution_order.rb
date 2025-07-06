#!/usr/bin/env ruby

# Let me check if there's something special about how the test works

# Simulate what the test runner does:

# 1. First, the test code is loaded (defines AcceptBlock)
class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

# 2. Then the answer code is loaded (with AcceptBlock.call line removed)
MY_LAMBDA = -> { 3 }
# AcceptBlock.call(&MY_LAMBDA) # This line is removed!

# 3. Then the test runs
puts "AcceptBlock.result = #{AcceptBlock.result.inspect}"
puts "Test would check: assert AcceptBlock.result"
puts "This fails because result is nil"
puts

# Let's see if MY_LAMBDA is defined at the time AcceptBlock.call is defined
puts "=== Timing Issue? ==="
class AcceptBlock2
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    puts "Inside call method:"
    puts "  MY_LAMBDA defined? #{defined?(MY_LAMBDA)}"
    puts "  MY_LAMBDA = #{MY_LAMBDA.inspect rescue 'not accessible'}"
    @result = block == MY_LAMBDA
  end
end

# If we call it after MY_LAMBDA is defined
AcceptBlock2.call(&MY_LAMBDA)
puts "AcceptBlock2.result = #{AcceptBlock2.result}"
puts

# Maybe the test expects something else?
puts "=== What if the test calls AcceptBlock.call itself? ==="
# Let's check the actual test method
puts "The test method 'test_accept_block' only does:"
puts "  assert AcceptBlock.result"
puts "It doesn't call AcceptBlock.call"