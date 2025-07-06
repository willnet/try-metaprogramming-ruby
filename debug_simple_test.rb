#!/usr/bin/env ruby

# Simple debugging without minitest autorun

# Define the test classes
class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

puts "=== Scenario 1: The issue ==="
puts "The test expects AcceptBlock.result to be true"
puts "But AcceptBlock.result is nil initially: #{AcceptBlock.result.inspect}"
puts

puts "=== Scenario 2: What the answer code does ==="
MY_LAMBDA = -> { 3 }
AcceptBlock.call(&MY_LAMBDA)
puts "After running the answer code:"
puts "AcceptBlock.result = #{AcceptBlock.result}"
puts

puts "=== The Problem ==="
puts "The test checks AcceptBlock.result, but the answer code"
puts "AcceptBlock.call(&MY_LAMBDA) is being removed by the test runner!"
puts
puts "Look at line 36 in test_answers_comprehensive.rb:"
puts "answer_code.gsub(/^AcceptBlock\\.call\\(&MY_LAMBDA\\).*$/, '')"
puts
puts "This removes the AcceptBlock.call line from the answer!"
puts "So AcceptBlock.result remains nil and the test fails."