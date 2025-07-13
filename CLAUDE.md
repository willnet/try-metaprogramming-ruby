# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `bin/setup` - Install dependencies and build the project
- `bin/dev` - Start development server on port 8000
- `bin/test` - Run complete Ruby-first test workflow (sync + test all quizzes)

### Building
- `node esbuild.config.js` - Build the project using esbuild

### Testing
- `bin/test` - **Recommended**: Complete test workflow (Ruby sync + comprehensive tests)
- `bin/test SECTION ID` - Test specific quiz with full workflow
- `ruby test/test_answers_comprehensive.rb` - Direct test execution (requires manual sync)
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test specific quiz
- `npm run test:answers` - Alternative command for testing all answer codes

### Problem Data Management
- `node scripts/extract-problems.js` - Extract quiz data from external Ruby repository
- `node scripts/extract-ruby-code.js` - Extract problemCode and answerCode to standalone Ruby files
- `node scripts/extract-descriptions-explanations.js` - Extract detailedDescription and answerExplanation to separate markdown files
- `node scripts/sync-ruby-to-js.js` - Sync Ruby file changes back to JavaScript problem files

### Ruby-First Development Workflow
All content (code, descriptions, explanations) is managed as separate files and automatically synced to JavaScript:

1. **Edit content files directly:**
   - `src/ruby/problems/` - Quiz starter code (.rb files)
   - `src/ruby/answers/` - Solution code (.rb files)
   - `src/ruby/tests/` - Test code (.rb files)
   - `src/ruby/explanations/` - Answer explanations (.md files with Japanese/English sections)

2. **Run tests:** `bin/test` (handles sync automatically)

3. **For web app:** Rebuild with `node esbuild.config.js` after changes

**Directory structure:**
```
src/ruby/
├── problems/      # Quiz starter code (19 files)
├── answers/       # Solution code (24 files)
├── tests/         # Test code (24 files)
└── explanations/  # Answer explanations (15 files)
```

The separated files serve as the source of truth. JavaScript files are automatically generated.

## Project Architecture

This is a web-based Ruby metaprogramming practice environment that allows users to solve Ruby quizzes in the browser using Ruby.wasm.

### Core Components

**Frontend (src/)**
- `index.html` - Main HTML interface with quiz selector, code editor, and test results
- `main.js` - Main application logic containing:
  - `RubyRunner` class: Manages Ruby.wasm VM initialization and code execution
  - `ProblemManager` class: Handles quiz data and navigation
  - DOM event handlers for UI interactions
- `problems.js` - Contains all quiz data (descriptions, starter code, tests)
- `i18n.js` - Internationalization support with `LanguageManager` class for Japanese/English
- `style.css` - Application styling

**Build System**
- `esbuild.config.js` - ESBuild configuration with custom copy plugin
- `.esbuild/copyPlugin.js` - Custom plugin to copy static files during build
- Outputs to `dist/` directory

**Quiz Data Structure**
Each quiz in `problems.js` contains:
- `section`: Quiz category (e.g., "02_object_model", "03_method")
- `id`: Unique identifier
- `title`: Human-readable title
- `detailedDescription`: Detailed requirements (Japanese)
- `detailedDescription_en`: Detailed requirements (English)
- `problemCode`: Ruby starter code
- `testCode`: Minitest test suite with custom `run_tests` function
- `answerCode`: Complete solution
- `answerExplanation`: Solution explanation (Japanese)
- `answerExplanation_en`: Solution explanation (English)

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

**Quiz Navigation**
- Dynamic section and quiz selectors
- Quizzes organized by metaprogramming topics
- Code editor preserves user input until reset

### Testing Answer Codes

**Answer Verification**
- `npm run test:answers` - Test all answer codes against their respective test suites
- `ruby test/test_answers_comprehensive.rb` - Direct execution from project root
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test a specific quiz (e.g., `ruby test/test_answers_comprehensive.rb 02_object_model 01_hoge`)

**Test Directory Structure**
- `test/test_answers_comprehensive.rb` - Comprehensive test script
- `test/test_results_comprehensive.json` - Detailed test results (generated after execution)
- `test/README.md` - Detailed testing documentation

The test framework:
- Runs each answer code in isolation using temporary Ruby files
- Verifies that all Minitest assertions pass
- Applies automatic fixes for common issues (e.g., removing test execution code from answers)
- Provides detailed failure reports and success metrics
- Currently achieves 75% success rate (9/12 quizzes passing)

**Known Issues**
- Some quizzes require `minitest-mock` which may not be available in all environments
- A few answer codes contain test execution statements that need to be filtered out
- Complex metaprogramming quizzes may have environment-specific dependencies

### Development Notes

- The project fetches quiz data from an external repository using `scripts/extract-problems.js`
- Ruby code execution happens entirely in the browser via WebAssembly
- All quiz starter code and tests are embedded in the JavaScript bundle
- The development server uses Ruby's built-in HTTP server for simplicity
- Answer codes are automatically tested for correctness using Ruby's Minitest framework
- **Important**: When editing content, always modify `.rb` and `.md` files in `src/ruby/` directories, not the generated `.js` files
- After editing Ruby files, run `node scripts/sync-ruby-to-js.js` to update JavaScript files
- The application supports bilingual content (Japanese/English) with automatic language switching