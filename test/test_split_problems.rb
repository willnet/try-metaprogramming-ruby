#!/usr/bin/env ruby
# Test script for split problems

require 'json'
require 'tempfile'
require 'fileutils'

# Color output for better visibility
class ColorOutput
  def self.green(text); "\e[32m#{text}\e[0m"; end
  def self.red(text); "\e[31m#{text}\e[0m"; end
  def self.yellow(text); "\e[33m#{text}\e[0m"; end
  def self.blue(text); "\e[34m#{text}\e[0m"; end
  def self.bold(text); "\e[1m#{text}\e[0m"; end
end

# Load split problems
def load_split_problems
  script_dir = File.dirname(__FILE__)
  split_problems_json_path = File.join(script_dir, 'split-problems.json')
  
  if File.exist?(split_problems_json_path)
    problems_data = JSON.parse(File.read(split_problems_json_path))
    puts "Loaded #{problems_data.length} split problems from test/split-problems.json"
    return problems_data
  end
  
  raise "Please run 'node scripts/extract-split-problems-json.js' to generate test/split-problems.json before running tests"
end

# Test a single problem
def test_problem(problem)
  puts "Testing #{problem['section']}/#{problem['id']}: #{problem['title']}..."
  
  # Create temporary file with test code
  temp_file = Tempfile.new(['test', '.rb'])
  begin
    # Write the test code to the temporary file
    temp_file.write(problem['testCode'])
    temp_file.close
    
    # Run the test
    result = `ruby #{temp_file.path} 2>&1`
    
    if $?.success? && !result.include?('Failure:') && !result.include?('Error:')
      puts ColorOutput.green("✅ PASS")
      return { success: true, output: result }
    else
      puts ColorOutput.red("❌ FAIL")
      puts "Output:"
      puts result
      return { success: false, output: result }
    end
  ensure
    temp_file.unlink
  end
end

# Main execution
def main
  puts ColorOutput.bold("Testing Split Problems")
  puts "=" * 50
  
  problems = load_split_problems
  puts "Testing #{problems.length} split problems..."
  
  results = []
  passed = 0
  failed = 0
  
  problems.each do |problem|
    result = test_problem(problem)
    results << {
      section: problem['section'],
      id: problem['id'],
      title: problem['title'],
      success: result[:success],
      output: result[:output]
    }
    
    if result[:success]
      passed += 1
    else
      failed += 1
    end
  end
  
  puts "\n" + "=" * 60
  puts ColorOutput.bold("Test Results: #{passed} passed, #{failed} failed")
  puts "=" * 60
  
  # Save detailed results
  results_path = File.join(File.dirname(__FILE__), 'test_split_results.json')
  File.write(results_path, JSON.pretty_generate(results))
  puts "\nDetailed results saved to #{results_path}"
  
  # Summary
  success_rate = (passed.to_f / (passed + failed) * 100).round(1)
  puts "\n📊 #{ColorOutput.bold('SUMMARY:')}"
  puts "   Total split problems: #{passed + failed}"
  puts "   #{ColorOutput.green('✅ Passed:')} #{passed}"
  puts "   #{ColorOutput.red('❌ Failed:')} #{failed}"
  puts "   📈 Success rate: #{success_rate}%"
  
  exit(failed == 0 ? 0 : 1)
end

if __FILE__ == $0
  main
end