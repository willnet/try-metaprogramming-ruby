#!/usr/bin/env ruby

# 回答例のテスト検証スクリプト
# 各問題の回答例が正しくテストをパスするかを確認します

require 'json'
require 'tempfile'

class ComprehensiveAnswerTester
  def initialize
    @results = []
    @problems = load_problems
  end

  def load_problems
    # スクリプトの場所に関係なく、プロジェクトルートから相対パスを解決
    script_dir = File.dirname(__FILE__)

    # JSONファイルから問題データを読み込み
    problems_json_path = File.join(script_dir, 'problems.json')
    if File.exist?(problems_json_path)
      problems_data = JSON.parse(File.read(problems_json_path))
      puts "Loaded #{problems_data.length} problems from test/problems.json"
      return problems_data
    end

    # JSONファイルが存在しない場合は生成を促す
    raise "Please run 'node scripts/generate-test-json.js' to generate test/problems.json before running tests"
  end

  def get_test_content(answer_code, test_code)
    # テストコードが先に実行される必要がある問題
    # これらの問題では、テストコードで定義されるクラス/定数を回答コードで使用する
    test_first_problems = [
      '01_block_first_step_q1',
      '01_block_first_step_q2',
      '01_block_first_step_q3',
      '01_block_first_step_q4',
      '01_singleton_methods', # Judgement クラスの定義が必要
      '02_anonymous_classes', # Judgement2 クラスの定義が必要
      '05_method_wrapping', # ExOver クラスの定義が必要
      '02_hierarchy_q6', # M1Refinementsの定義が必要
      '01_method_first_step_q2', # F1定数の定義が必要
      '03_try_over3_3_q2' # alpha_rand等の定義が必要
    ]

    if test_first_problems.include?(@current_problem_id)
      "#{test_code}\n\n#{answer_code}"
    else
      "#{answer_code}\n\n#{test_code}"
    end
  end

  def run_answer_test(problem)
    return { success: false, error: 'No answer code' } unless problem['answerCode']

    begin
      # 現在の問題IDを設定（実行順序決定のため）
      @current_problem_id = problem['id']

      # テストを実行
      test_result = run_test_in_isolation(problem['answerCode'], problem['testCode'])

      # 成功判定
      success = test_result[:exit_status] == 0 &&
                !test_result[:output].include?('Failure:') &&
                !test_result[:output].include?('Error:')

      {
        success: success,
        output: test_result[:output],
        exit_status: test_result[:exit_status]
      }
    rescue StandardError => e
      { success: false, error: e.message, backtrace: e.backtrace&.first(5) }
    end
  end

  def run_test_in_isolation(answer_code, test_code)
    Tempfile.create(['test_', '.rb']) do |temp_file|
      test_content = <<~RUBY
        require 'minitest'
        require 'minitest/autorun'
        require 'securerandom'
        require 'minitest/mock'
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
        status = '✅ PASS'
        puts status
        passed_count += 1
      else
        puts '❌ FAIL'
        failed_count += 1
      end

      @results << {
        section: section,
        id: id,
        title: title,
        success: result[:success],
        error: result[:error],
        output: result[:output],
        exit_status: result[:exit_status]
      }
    end

    puts "\n" + '=' * 60
    puts "Test Results: #{passed_count} passed, #{failed_count} failed, #{skipped_count} skipped"
    puts '=' * 60

    # 失敗したテストの詳細を表示
    failed_tests = @results.select { |r| !r[:success] }
    if failed_tests.any?
      puts "\nFailed Tests Details:"
      failed_tests.each do |test|
        puts "\n❌ #{test[:section]}/#{test[:id]}: #{test[:title]}"
        puts "Error: #{test[:error]}" if test[:error]
        next unless test[:output] && test[:output].length < 2000

        puts 'Output:'
        puts test[:output].lines.first(20).map { |line| "  #{line}" }.join
        puts '  ...' if test[:output].lines.length > 20
      end
    end

    {
      total: @problems.count { |p| p['answerCode'] },
      passed: passed_count,
      failed: failed_count,
      skipped: skipped_count,
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
      status = '✅ PASS'
      puts status
    else
      puts "❌ FAIL: #{section}/#{id}"
      puts "Error: #{result[:error]}" if result[:error]
      if result[:output]
        puts 'Output:'
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
    puts "   📈 Success rate: #{(results[:passed].to_f / results[:total] * 100).round(1)}%"

    # 終了コード設定
    exit(results[:failed] > 0 ? 1 : 0)
  end
end

main if __FILE__ == $0
