#!/usr/bin/env ruby

# 回答例のテスト検証スクリプト（包括的版）
# 各問題の回答例が正しくテストをパスするかを確認します

require 'json'
require 'stringio'
require 'tempfile'

class ComprehensiveAnswerTester
  def initialize
    @results = []
    @problems = load_problems
  end

  def load_problems
    # スクリプトの場所に関係なく、プロジェクトルートから相対パスを解決
    script_dir = File.dirname(__FILE__)
    problems_path = File.join(script_dir, '../src/problems.js')
    problems_content = File.read(problems_path)
    match = problems_content.match(/export const problems = (\[.*\]);/m)
    raise "Could not find problems array in problems.js" unless match
    
    json_str = match[1]
    problems_data = JSON.parse(json_str)
    
    puts "Loaded #{problems_data.length} problems"
    problems_data
  end

  def fix_answer_code(answer_code, problem_id)
    # 問題固有の修正 - 実行順序を変更したため、削除の必要がなくなった
    answer_code
  end
  
  def get_test_content(answer_code, test_code)
    # 問題固有の実行順序を決定
    # 一部の問題は「テストコード → 回答コード」の順序が必要
    # 他の問題は「回答コード → テストコード」の順序が必要
    case @current_problem_id
    when '01_block_first_step', '01_class_definition_first_step'
      # これらの問題は回答コードでテストクラスを参照するため、テストコードを先に実行
      "# テストコード\n#{test_code}\n\n# 回答コード\n#{answer_code}"
    else
      # 通常の問題は回答コードを先に実行
      "# 回答コード\n#{answer_code}\n\n# テストコード\n#{test_code}"
    end
  end

  def run_answer_test(problem)
    return { success: false, error: "No answer code" } unless problem['answerCode']
    
    begin
      # 現在の問題IDを設定（実行順序決定のため）
      @current_problem_id = problem['id']
      
      # 問題固有の修正を適用
      fixed_answer_code = fix_answer_code(problem['answerCode'], problem['id'])
      
      # テストを実行
      test_result = run_test_in_isolation(fixed_answer_code, problem['testCode'])
      
      # 成功判定
      success = test_result[:exit_status] == 0 &&
                !test_result[:output].include?('Failure:') && 
                !test_result[:output].include?('Error:') &&
                !test_result[:output].include?('NameError') &&
                !test_result[:output].include?('LoadError') &&
                (test_result[:output].include?('0 failures') || 
                 test_result[:output].match?(/\d+ runs, \d+ assertions, 0 failures, 0 errors/))
      
      { 
        success: success, 
        output: test_result[:output], 
        exit_status: test_result[:exit_status],
        fixed_code: fixed_answer_code != problem['answerCode']
      }
    rescue => e
      { success: false, error: e.message, backtrace: e.backtrace&.first(5) }
    end
  end

  def run_test_in_isolation(answer_code, test_code)
    Tempfile.create(['test_', '.rb']) do |temp_file|
      # 必要なrequireを追加
      test_content = <<~RUBY
        require 'minitest'
        require 'minitest/autorun'
        require 'securerandom' rescue nil
        
        # minitest-mockを使用する場合の対応
        begin
          require 'minitest/mock'
        rescue LoadError
          # minitest-mockが利用できない場合のフォールバック
          module Minitest
            class Mock
              def initialize
                @expected_calls = {}
                @call_count = {}
              end
              
              def expect(method_name, return_value, args = [])
                @expected_calls[method_name] = { return_value: return_value, args: args }
                @call_count[method_name] = 0
              end
              
              def method_missing(method_name, *args)
                if @expected_calls[method_name]
                  @call_count[method_name] += 1
                  @expected_calls[method_name][:return_value]
                else
                  super
                end
              end
              
              def verify
                @expected_calls.all? { |method, _| @call_count[method] > 0 }
              end
            end
          end
        end
        
        #{get_test_content(answer_code, test_code)}
      RUBY
      
      temp_file.write(test_content)
      temp_file.flush
      
      # Rubyプロセスでテストを実行
      output = `ruby #{temp_file.path} 2>&1`
      exit_status = $?.exitstatus
      
      { output: output, exit_status: exit_status }
    end
  end

  def test_all_problems
    puts "Testing #{@problems.length} problems...\n"
    
    passed_count = 0
    failed_count = 0
    skipped_count = 0

    @problems.each do |problem|
      section = problem['section']
      id = problem['id']
      title = problem['title']
      
      unless problem['answerCode']
        puts "⚠️  Problem #{section}/#{id} has no answer code, skipping..."
        skipped_count += 1
        next
      end

      print "Testing #{section}/#{id}: #{title}... "
      
      result = run_answer_test(problem)
      
      if result[:success]
        status = result[:fixed_code] ? "✅ PASS (fixed)" : "✅ PASS"
        puts status
        passed_count += 1
      else
        puts "❌ FAIL"
        failed_count += 1
      end
      
      @results << {
        section: section,
        id: id,
        title: title,
        success: result[:success],
        error: result[:error],
        output: result[:output],
        exit_status: result[:exit_status],
        fixed_code: result[:fixed_code]
      }
    end

    puts "\n" + "=" * 60
    puts "Test Results: #{passed_count} passed, #{failed_count} failed, #{skipped_count} skipped"
    puts "=" * 60

    # 失敗したテストの詳細を表示
    failed_tests = @results.select { |r| !r[:success] }
    if failed_tests.any?
      puts "\nFailed Tests Details:"
      failed_tests.each do |test|
        puts "\n❌ #{test[:section]}/#{test[:id]}: #{test[:title]}"
        puts "Error: #{test[:error]}" if test[:error]
        if test[:output] && test[:output].length < 2000
          puts "Output:"
          puts test[:output].lines.first(20).map { |line| "  #{line}" }.join
          puts "  ..." if test[:output].lines.length > 20
        end
      end
    end

    # 修正が適用された問題を表示
    fixed_tests = @results.select { |r| r[:fixed_code] }
    if fixed_tests.any?
      puts "\nTests with Code Fixes Applied:"
      fixed_tests.each do |test|
        puts "🔧 #{test[:section]}/#{test[:id]}: #{test[:title]}"
      end
    end

    {
      total: @problems.count { |p| p['answerCode'] },
      passed: passed_count,
      failed: failed_count,
      skipped: skipped_count,
      fixed: fixed_tests.length,
      results: @results
    }
  end

  def test_specific_problem(section, id)
    problem = @problems.find { |p| p['section'] == section && p['id'] == id }
    
    unless problem
      puts "Problem #{section}/#{id} not found"
      return
    end

    unless problem['answerCode']
      puts "Problem #{section}/#{id} has no answer code"
      return
    end

    puts "Testing specific problem: #{section}/#{id}: #{problem['title']}"
    result = run_answer_test(problem)
    
    if result[:success]
      status = result[:fixed_code] ? "✅ PASS (with fixes)" : "✅ PASS"
      puts status
    else
      puts "❌ FAIL: #{section}/#{id}"
      puts "Error: #{result[:error]}" if result[:error]
      if result[:output]
        puts "Output:"
        puts result[:output].lines.first(30).map { |line| "  #{line}" }.join
      end
    end
  end
end

# メイン実行
def main
  if ARGV.length == 2
    # 特定の問題をテスト
    tester = ComprehensiveAnswerTester.new
    tester.test_specific_problem(ARGV[0], ARGV[1])
  else
    # すべての問題をテスト
    tester = ComprehensiveAnswerTester.new
    results = tester.test_all_problems
    
    # 結果をJSONファイルに保存
    results_path = File.join(File.dirname(__FILE__), 'test_results_comprehensive.json')
    File.write(results_path, JSON.pretty_generate(results))
    puts "\nDetailed results saved to #{results_path}"
    
    # サマリーを表示
    puts "\n📊 SUMMARY:"
    puts "   Total problems with answers: #{results[:total]}"
    puts "   ✅ Passed: #{results[:passed]}"
    puts "   ❌ Failed: #{results[:failed]}"
    puts "   ⚠️  Skipped: #{results[:skipped]}"
    puts "   🔧 Fixed: #{results[:fixed]}"
    puts "   📈 Success rate: #{(results[:passed].to_f / results[:total] * 100).round(1)}%"
    
    # 終了コード設定
    exit(results[:failed] > 0 ? 1 : 0)
  end
end

if __FILE__ == $0
  main
end