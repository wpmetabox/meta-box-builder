# MB Builder

## Overview

MB Builder is a WordPress plugin that allows you to create custom meta boxes and custom fields using a drag and drop interface. It is an extension for Meta Box, a WordPress plugin that provides API to create custom meta boxes and custom fields.

## Build, Lint & Test Commands

### PHP
```bash
# Run all PHPUnit tests
./vendor/bin/phpunit

# Run single test file
./vendor/bin/phpunit tests/phpunit/AdminColumnsTest.php

# Run specific test method
./vendor/bin/phpunit --filter testAdminColumnsNormalization

# Filter by group (e.g., failing tests)
./vendor/bin/phpunit --group failing

# Lint with WordPress Coding Standards
composer phpcs src

# Auto-fix PHP formatting
composer phpcbf src
```

### JavaScript/CSS
```bash
# Build CSS (compressed, no source maps)
pnpm run css

# Watch CSS changes
pnpm run css:watch

# Build JavaScript (uses @wordpress/scripts)
pnpm run js

# Full build (CSS + JS)
pnpm run build

# Start development mode with watch
pnpm run start
```

## Project Structure

- `src/` - PHP source files (PSR-4: `MBB\` namespace)
- `tests/phpunit/` - PHPUnit test files
- `assets/app/` - ReactJS application source
- `assets/build/` - Compiled JavaScript output
- `assets/sass/` - SASS source files
- `assets/css/` - Compiled CSS output
- `assets/js/` - Plain JavaScript files (non-bundled)

## Code Style Guidelines

### General Principles
- **Readability first**: Write small, single-purpose functions; prefer declarative code
- **Comments**: Add comments for *why* (not *what*)
- **Naming**: Use descriptive names; avoid abbreviations unless widely recognized
- **Incremental changes**: Keep commits minimal and focused; always add/update tests

### PHP (WordPress Standards)
- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Use PSR-4 autoloading with `MBB\` namespace
- Target PHP 7.2+ and WordPress 6.5+ compatibility
- Use type hints and return types where possible
- Add `@param` and `@return` docblocks when type hints are insufficient
- Prefer OOP (classes, traits, interfaces) over procedural code
- Use WordPress core functions (`wp_remote_get`, `sanitize_text_field`, `esc_html`) before custom solutions

### JavaScript (WordPress Standards)
- Follow [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- Prefer ES standard methods (`map`, `filter`, `reduce`, `URL`, `fetch`)
- Use WordPress packages: `@wordpress/components`, `@wordpress/data`, `@wordpress/i18n`, `@wordpress/element`
- Use `lodash` for utilities when needed
- Arrow functions: Omit parentheses for single parameter (e.g., `item => item.id`)
- Use `@wordpress/scripts` for building (custom webpack.config.js exists)

### Naming Conventions

- **Namespaces**: `MBB\` (e.g., `MBB\Api`)
- **Classes**: `StudlyCaps` (e.g., `class PostType`)
- **Methods**: `snake_case` (e.g., `register_routes()`, `get_all_schemas()`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `OPTION_NAME = 'meta_box_builder'`)
- **Properties**: `$snake_case`
- **Global functions**: prefix with `mbb_`
- **Text domain**: `meta-box-builder`

## Key Conventions

### Testing
- Tests use PHPUnit 11+ with WordPress bootstrap
- Test classes extend `PHPUnit\Framework\TestCase`
- Use `#[Group('failing')]` attribute to filter specific tests

### Error Handling
- PHP: Use WordPress error handling patterns
- JS: Use `react-error-boundary` for React error boundaries

### Dependencies
- **External libraries**: Only add when built-in solution is insufficient or library provides clear, measurable benefit
- Must be well-maintained

## Compatibility Notes

- **PHP 7.2+**: Avoid union types (PHP 8.0+), use polyfills where needed
- **WordPress 6.5+**: Ensure compatibility with core APIs
