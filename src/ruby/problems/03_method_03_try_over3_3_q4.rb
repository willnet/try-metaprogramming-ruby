TryOver3 = Module.new

# Q5. チャレンジ問題！ 挑戦する方はテストの skip を外して挑戦してみてください。
module TryOver3::TaskHelper
  def self.included(klass)
    klass.define_singleton_method :task do |name, &task_block|
      new_klass = Class.new do
        define_singleton_method :run do
          puts "start #{Time.now}"
          block_return = task_block.call
          puts "finish #{Time.now}"
          block_return
        end
      end
      new_klass_name = name.to_s.split('_').map do |w|
        w[0] = w[0].upcase
        w
      end.join
      const_set(new_klass_name, new_klass)
    end
  end
end

class TryOver3::A5Task
  include TryOver3::TaskHelper

  task :foo do
    'foo'
  end
end
