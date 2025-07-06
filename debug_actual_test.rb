#!/usr/bin/env ruby

require 'minitest'
require 'minitest/autorun'

# Define the test exactly as it appears in the problems
class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

# First, let's run without defining MY_LAMBDA to see the error
begin
  class TestBlockFirstStepDebug1 < Minitest::Test
    def test_accept_block_without_lambda
      assert AcceptBlock.result
    end
  end
rescue => e
  puts "Error without MY_LAMBDA defined: #{e.message}"
  puts
end

# Now let's define MY_LAMBDA and run AcceptBlock.call
MY_LAMBDA = -> { 3 }
AcceptBlock.call(&MY_LAMBDA)

# Check the state
puts "After calling AcceptBlock.call(&MY_LAMBDA):"
puts "AcceptBlock.result = #{AcceptBlock.result}"
puts

# Now run the actual test
class TestBlockFirstStepDebug2 < Minitest::Test
  def test_accept_block_with_lambda_and_call
    assert AcceptBlock.result
  end
end

# Test what happens if we don't call AcceptBlock.call first
AcceptBlock.result = nil  # Reset

class TestBlockFirstStepDebug3 < Minitest::Test
  def test_accept_block_without_call
    # This should fail because result is nil
    assert AcceptBlock.result
  end
end