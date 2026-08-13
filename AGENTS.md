# MB Builder

## Overview

MB Builder is a WordPress plugin that extends Meta Box. It lets you create custom fields with a drag-and-drop interface.

## Build & Lint Commands

```bash
# Lint with WordPress Coding Standards
composer phpcs src

# Auto-fix PHP formatting
composer phpcbf src

# Build CSS (compressed, no source maps)
pnpm run css

# Build JavaScript (uses @wordpress/scripts)
pnpm run js

# Full build (CSS + JS)
pnpm run build
```

## Code style

### General principles
- Write small functions that do one thing. Prefer declarative code.
- Add comments that explain why the code exists. Do not describe what the code does.
- Use descriptive names. Avoid abbreviations unless they are widely recognized.
- Keep commits minimal and focused
- Use American English

### PHP
- Follow the [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Use PSR-4 for autoloading
- Import classes at the top of the file with `use`, not `\FQCN`
- Do not add unnecessary checks such as `function_exists` and `class_exists`
- When possible, use type hints and return types
- When type hints are insufficient, add `@param` and `@return` docblocks
- Support PHP 7.4+ and WordPress 6.6+

### JavaScript (WordPress Standards)
- Follow the [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- For an arrow function with one parameter, omit the parentheses
