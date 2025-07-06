#!/usr/bin/env ruby

# Debugging script for AcceptBlock test
# This will help us understand why the block comparison is failing

# Define AcceptBlock class exactly as in the test
class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

# Define MY_LAMBDA exactly as in the answer code
MY_LAMBDA = -> { 3 }

# Call AcceptBlock.call(&MY_LAMBDA) as in the answer
AcceptBlock.call(&MY_LAMBDA)

# Check the result
puts "AcceptBlock.result: #{AcceptBlock.result}"
puts "Expected: true"
puts

# Let's debug what's happening
puts "=== Debugging ==="
puts "MY_LAMBDA class: #{MY_LAMBDA.class}"
puts "MY_LAMBDA object_id: #{MY_LAMBDA.object_id}"

# Let's check what happens when we pass MY_LAMBDA as a block
block_received = nil
AcceptBlock.define_singleton_method(:debug_call) do |&block|
  block_received = block
  puts "Block received class: #{block.class}"
  puts "Block received object_id: #{block.object_id}"
  puts "Block == MY_LAMBDA: #{block == MY_LAMBDA}"
  puts "Block.equal?(MY_LAMBDA): #{block.equal?(MY_LAMBDA)}"
end

AcceptBlock.debug_call(&MY_LAMBDA)

puts
puts "=== Analysis ==="
puts "When passing a lambda/proc with &, Ruby converts it to a block"
puts "The block parameter in the method is a new Proc object wrapping the block"
puts "So block == MY_LAMBDA returns false because they are different objects"

puts
puts "=== Testing different approaches ==="

# Test 1: Direct proc comparison
proc1 = -> { 3 }
proc2 = -> { 3 }
puts "proc1 == proc2: #{proc1 == proc2} (different lambda objects)"

# Test 2: Same proc object
proc3 = proc1
puts "proc1 == proc3: #{proc1 == proc3} (same object reference)"

# Test 3: What happens with & conversion
original_proc = -> { 3 }
converted_block = nil

def capture_block(&block)
  block
end

converted_block = capture_block(&original_proc)
puts "original_proc == converted_block: #{original_proc == converted_block}"
puts "original_proc.equal?(converted_block): #{original_proc.equal?(converted_block)}"

puts
puts "=== Conclusion ==="
puts "The issue is that when you pass a Proc/Lambda with &, Ruby creates a new Proc"
puts "object from the block, so object equality (==) returns false."
puts "The test expects the exact same object, which is why it's failing."