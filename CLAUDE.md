# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `bin/setup` - Install dependencies and build the project
- `bin/dev` - Start development server on port 8000
- `bin/test` - Run complete Ruby-first test workflow (sync + test all problems)

### Building
- `node esbuild.config.js` - Build the project using esbuild

### Testing
- `bin/test` - **Recommended**: Complete test workflow (Ruby sync + comprehensive tests)
- `ruby test/test_answers_comprehensive.rb` - Direct test execution (requires manual sync)
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test specific problem

### Problem Data Management
- `node scripts/extract-problems.js` - Extract problem data from external Ruby repository
- `node scripts/extract-ruby-code.js` - Extract problemCode and answerCode to standalone Ruby files
- `node scripts/extract-descriptions-explanations.js` - Extract detailedDescription and answerExplanation to separate markdown files
- `node scripts/sync-ruby-to-js.js` - Sync Ruby file changes back to JavaScript problem files

### Ruby-First Development Workflow
All content (code, descriptions, explanations) is managed as separate files and automatically synced to JavaScript:

1. **Edit content files directly:**
   - `src/ruby/problems/` - Problem starter code (.rb files)
   - `src/ruby/answers/` - Solution code (.rb files)
   - `src/ruby/tests/` - Test code (.rb files)
   - `src/ruby/descriptions/` - Problem descriptions (.md files with Japanese/English sections)
   - `src/ruby/explanations/` - Answer explanations (.md files with Japanese/English sections)

2. **Run tests:** `bin/test` (handles sync automatically)

3. **For web app:** Rebuild with `node esbuild.config.js` after changes

**Directory structure:**
```
src/ruby/
├── problems/      # Problem starter code (19 files)
├── answers/       # Solution code (24 files)
├── tests/         # Test code (24 files)
├── descriptions/  # Problem descriptions (24 files)
└── explanations/  # Answer explanations (15 files)
```

The separated files serve as the source of truth. JavaScript files are automatically generated.

## Project Architecture

This is a web-based Ruby metaprogramming practice environment that allows users to solve Ruby problems in the browser using Ruby.wasm.

### Core Components

**Frontend (src/)**
- `index.html` - Main HTML interface with problem selector, code editor, and test results
- `main.js` - Main application logic containing:
  - `RubyRunner` class: Manages Ruby.wasm VM initialization and code execution
  - `ProblemManager` class: Handles problem data and navigation
  - DOM event handlers for UI interactions
- `problems.js` - Contains all problem data (descriptions, starter code, tests)
- `style.css` - Application styling

**Build System**
- `esbuild.config.js` - ESBuild configuration with custom copy plugin
- `.esbuild/copyPlugin.js` - Custom plugin to copy static files during build
- Outputs to `dist/` directory

**Problem Data Structure**
Each problem in `problems.js` contains:
- `section`: Problem category (e.g., "02_object_model", "03_method")
- `id`: Unique identifier
- `title`: Human-readable title
- `description`: Problem explanation
- `problemCode`: Ruby starter code
- `testCode`: Minitest test suite with custom `run_tests` function
- `answerCode`: Complete solution with detailed explanations (added from kinoppyd/reading-metaprogramming-ruby)

### Key Technical Details

**Ruby.wasm Integration**
- Uses `@ruby/wasm-wasi` and `@bjorn3/browser_wasi_shim` for Ruby execution
- Loads Ruby+stdlib.wasm from CDN
- Custom VM creation with stdout/stderr capture
- VM reset between test runs to ensure clean state

**Test Execution**
- All tests use Minitest framework
- Custom `run_tests` function explicitly executes tests
- Tests are evaluated in Ruby VM and results captured
- Success/failure determined by checking for "Failure:" or "Error:" in output

**Problem Navigation**
- Dynamic section and problem selectors
- Problems organized by metaprogramming topics
- Code editor preserves user input until reset

### Testing Answer Codes

**Answer Verification**
- `npm run test:answers` - Test all answer codes against their respective test suites
- `ruby test/test_answers_comprehensive.rb` - Direct execution from project root
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test a specific problem (e.g., `ruby test/test_answers_comprehensive.rb 02_object_model 01_hoge`)

**Test Directory Structure**
- `test/test_answers_comprehensive.rb` - Comprehensive test script
- `test/test_results_comprehensive.json` - Detailed test results (generated after execution)
- `test/README.md` - Detailed testing documentation

The test framework:
- Runs each answer code in isolation using temporary Ruby files
- Verifies that all Minitest assertions pass
- Applies automatic fixes for common issues (e.g., removing test execution code from answers)
- Provides detailed failure reports and success metrics
- Currently achieves 75% success rate (9/12 problems passing)

**Known Issues**
- Some problems require `minitest-mock` which may not be available in all environments
- A few answer codes contain test execution statements that need to be filtered out
- Complex metaprogramming problems may have environment-specific dependencies

### Development Notes

- The project fetches problem data from an external repository using `scripts/extract-problems.js`
- Ruby code execution happens entirely in the browser via WebAssembly
- All problem starter code and tests are embedded in the JavaScript bundle
- The development server uses Ruby's built-in HTTP server for simplicity
- Answer codes are automatically tested for correctness using Ruby's Minitest framework