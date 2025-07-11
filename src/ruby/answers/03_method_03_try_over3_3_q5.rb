module TryOver3
end

module TryOver3::TaskHelper
  def self.included(klass)
    klass.define_singleton_method :task do |name, &task_block|
      define_singleton_method name do
        puts "start #{Time.now}"
        block_return = task_block.call
        puts "finish #{Time.now}"
        block_return
      end

      define_singleton_method(:const_missing) do |const|
        super(const) unless klass.respond_to?(const.downcase)

        obj = Object.new
        obj.define_singleton_method :run do
          warn "Warning: TryOver3::A5Task::#{const}.run is deprecated"
          klass.send name
        end
        obj
      end
    end
  end
end

class TryOver3::A5Task
  include TryOver3::TaskHelper

  task :foo do
    "foo"
  end
end
