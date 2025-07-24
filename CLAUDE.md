# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `bin/setup` - Install dependencies and build the project
- `bin/dev` - Start development server on port 8000
- `bin/test` - Run complete Ruby-first test workflow (sync + Ruby tests + E2E tests)

### Building
- `node esbuild.config.js` - Build the project using esbuild
- `npm run build` - Alternative build command

### Testing
- `bin/test` - **Recommended**: Complete test workflow (Ruby sync + Ruby tests + E2E browser tests)
- `bin/test SECTION ID` - Test specific challenge with full workflow
- `ruby test/test_answers_comprehensive.rb` - Direct Ruby test execution (requires manual sync)
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test specific challenge
- `npm run test:answers` - Alternative command for testing all answer codes
- `npx playwright test test/test_e2e.js` - Run E2E tests only (requires server setup)

### Problem Data Management
- `node scripts/extract-problems.js` - Extract challenge data from external Ruby repository
- `node scripts/extract-ruby-code.js` - Extract problemCode and answerCode to standalone Ruby files
- `node scripts/extract-descriptions-explanations.js` - Extract detailedDescription and answerExplanation to separate markdown files
- `node scripts/sync-ruby-to-js.js` - Sync Ruby file changes back to JavaScript problem files

### Ruby-First Development Workflow
All content (code, descriptions, explanations) is managed as separate files and automatically synced to JavaScript:

1. **Edit content files directly:**
   - `src/ruby/problems/` - Challenge starter code (.rb files)
   - `src/ruby/answers/` - Solution code (.rb files)
   - `src/ruby/tests/` - Test code (.rb files)
   - `src/ruby/explanations/` - Answer explanations (.md files with Japanese/English sections)

2. **Run tests:** `bin/test` (handles sync automatically)

3. **For web app:** Rebuild with `node esbuild.config.js` after changes

**Directory structure:**
```
src/ruby/
├── problems/      # Challenge starter code (33 files)
├── answers/       # Solution code (33 files)
├── tests/         # Test code (33 files)
└── explanations/  # Answer explanations (33 files)
```

The separated files serve as the source of truth. JavaScript files are automatically generated.

## Project Architecture

This is a web-based Ruby metaprogramming practice environment that allows users to solve Ruby challenges in the browser using Ruby.wasm.

### Core Components

**Frontend (src/)**
- `index.html` - Main HTML interface with challenge selector, code editor, and test results
- `main.js` - Main application logic containing:
  - `RubyRunner` class: Manages Ruby.wasm VM initialization and code execution
  - `ProblemManager` class: Handles challenge data and navigation
  - DOM event handlers for UI interactions
- `problems.js` - Contains all challenge data (descriptions, starter code, tests)
- `i18n.js` - Internationalization support with `LanguageManager` class for Japanese/English
- `style.css` - Application styling

**Build System**
- `esbuild.config.js` - ESBuild configuration with custom copy plugin
- `.esbuild/copyPlugin.js` - Custom plugin to copy static files during build
- Outputs to `dist/` directory

**Challenge Data Structure**
Each challenge in `problems.js` contains:
- `section`: Challenge category (e.g., "02_object_model", "03_method")
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

**Challenge Navigation**
- Dynamic section and challenge selectors
- Challenges organized by metaprogramming topics
- Code editor preserves user input until reset

### Testing Architecture

**Ruby Tests (Ruby.wasm Environment)**
- `ruby test/test_answers_comprehensive.rb` - Tests all answer codes in Ruby environment
- `ruby test/test_answers_comprehensive.rb SECTION ID` - Test specific challenge
- Runs each answer code in isolation using temporary Ruby files
- Verifies that all Minitest assertions pass
- Provides detailed failure reports and success metrics

**E2E Tests (Browser Environment)**
- `test/test_e2e.js` - Playwright-based browser automation tests
- Tests all 33 challenges by simulating user interactions in the web interface
- Automatically pastes answer codes and verifies test results
- Runs on dedicated test server (port 8001) to avoid conflicts with development
- Captures screenshots on test failures for debugging

**Test Directory Structure**
- `test/test_answers_comprehensive.rb` - Ruby test script
- `test/test_e2e.js` - E2E test script
- `test/test_results_comprehensive.json` - Ruby test results (generated)
- `test/screenshots/` - E2E test failure screenshots (generated)
- `test-results/` - Playwright test results (generated)
- `playwright.config.js` - Playwright configuration

**Dependencies for Tests**
- Tests requiring `Minitest::Mock` must include `require 'minitest/mock'`
- E2E tests require `@playwright/test` and browser installation
- Ruby tests work in both native Ruby and Ruby.wasm environments

### Development Notes

- **Ruby-First Workflow**: Always edit `.rb` and `.md` files in `src/ruby/` directories, not generated `.js` files
- After editing Ruby files, run `node scripts/sync-ruby-to-js.js` to update JavaScript files
- The project fetches challenge data from an external repository using `scripts/extract-problems.js`
- Ruby code execution happens entirely in the browser via WebAssembly
- All challenge starter code and tests are embedded in the JavaScript bundle
- The development server uses Ruby's built-in HTTP server for simplicity
- The application supports bilingual content (Japanese/English) with automatic language switching
- E2E tests use a dedicated test server on port 8001 to avoid conflicts with development server (port 8000)
- Problem content is based on https://github.com/kinoppyd/reading-metaprogramming-ruby

### Build System Details

**ESBuild Configuration**
- `esbuild.config.js` - Main build configuration with custom copy plugin
- `.esbuild/copyPlugin.js` - Copies static files and problem data during build
- Outputs to `dist/` directory with code splitting and minification
- Automatically copies `problems/**/*.js` files to maintain problem data structure

**Key Build Outputs**
- `dist/main.js` - Main application bundle (~197kb)
- `dist/problems/` - Individual problem files for dynamic loading
- `dist/index.html` - Main application interface
- `dist/about.html` - About page with bilingual support

### CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/test.yml`)
- Runs on Node.js 20 and Ruby 3.4
- Installs npm dependencies and Playwright browsers
- Executes full test suite via `./bin/test`
- Uploads test artifacts (Ruby test results, screenshots, E2E results)
- Runs on push to main branch and pull requests

**Required Dependencies for CI**
- `gem install minitest` - For Ruby tests
- `npm install` - For Node.js dependencies (esbuild, Playwright)
- `npx playwright install chromium` - For E2E browser tests
- `npx playwright install-deps` - For system dependencies