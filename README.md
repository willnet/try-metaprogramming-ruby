# Try Metaprogramming Ruby

Web-based Ruby metaprogramming practice environment using Ruby.wasm. Learn Ruby metaprogramming concepts interactively in your browser.

## Features

- **Ruby-first Development**: All code (problems, answers, tests) is managed as Ruby files and automatically synced to JavaScript
- **Interactive Browser Environment**: Run Ruby code directly in the browser using Ruby.wasm
- **Comprehensive Test Suite**: Automated testing for all answer codes with detailed feedback
- **Multilingual Support**: Problems available in Japanese and English
- **29 Metaprogramming Problems**: Covering object model, methods, blocks, and class definitions

## Development

### Setup

```sh
bin/setup
```

### Start Development Server

```sh
bin/dev
open http://localhost:8000
```

### Running Tests

```sh
# Run all tests (Ruby-first workflow with sync + test)
bin/test

# Test specific problem
bin/test SECTION_NAME PROBLEM_ID
# Example: bin/test 05_class_definition 01_singleton_methods
```

### Available Commands

- `bin/setup` - Install dependencies and build the project
- `bin/dev` - Start development server on port 8000
- `bin/test` - Run complete Ruby-first test workflow
- `node esbuild.config.js` - Build the project using esbuild
- `node scripts/sync-ruby-to-js.js` - Sync Ruby file changes to JavaScript

## Ruby-First Development Workflow

1. **Edit Ruby files directly:**
   - `src/ruby/problems/` - Problem starter code
   - `src/ruby/answers/` - Solution code  
   - `src/ruby/tests/` - Test code
   - `src/ruby/descriptions/` - Problem descriptions
   - `src/ruby/explanations/` - Answer explanations

2. **Run tests:** `bin/test` (handles sync automatically)

3. **For web app:** Rebuild with `node esbuild.config.js` after changes

The Ruby files serve as the source of truth. JavaScript files are automatically generated.

## Credits

The problem content is based on https://github.com/kinoppyd/reading-metaprogramming-ruby


