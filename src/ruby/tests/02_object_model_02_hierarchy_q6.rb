require 'minitest'

# M1 module definition (needed for refinements)
module M1
  def name
    'M1'
  end
end

# M1Refinements definition (needed for Q6)
module M1Refinements
  refine M1 do
    def name
      'Refined M1'
    end
  end
end

class TestHierarchy < Minitest::Test
  def test_c6_name
    assert_equal "Refined M1", C6.new.name

    C6.include(Module.new do
      def name = "other"
    end)
    assert_equal "other", C6.new.name
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
