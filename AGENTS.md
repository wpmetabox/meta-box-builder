# MB Builder

## Overview

MB Builder is a WordPress plugin that extends Meta Box. It lets you create custom fields with a drag-and-drop interface.

## Commands
- PHP linting: `composer phpcs src`
- Auto-fix PHP formatting: `composer phpcbf src`
- Build CSS: `pnpm run css`
- Build JavaScript: `pnpm run js`
- Full build (CSS + JS): `pnpm run build`

Always run the matching build after editing JS or (S)CSS.

When committing this builder repository, also commit and push related upstream repos if this commit changes them:
- [mbb-parser](https://github.com/wpmetabox/mbb-parser) (`vendor/wpmetabox/mbb-parser` → push to `master`)
- [schema](https://github.com/wpmetabox/schema) (e.g. `field-group.json`, `custom-model.json` → push to `main`)

Do not commit or push mbb-parser or schema on their own outside a builder commit.

## Code style

### General principles
- Make changes as minimal as possible
- Write small, single-purpose functions, prefer declarative code
- Add comments for why (not what)
- Use descriptive names, avoid abbreviations unless widely recognized
- Avoid one-off internal constants or variables used only once when inlining stays short, keep a named variable when it clarifies intent, especially in complex code
- Keep commits minimal and focused
- Prefer the language or framework's built-in functions and APIs over custom solutions
- Use American English

### PHP
- Follow the [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Use PSR-4 for autoloading
- Import classes at the top of the file with `use`, not `\FQCN`
- Add type hints (for parameters and return values) wherever possible
- Add `@param` and `@return` docblocks when type hints are insufficient
- Use WordPress core functions before custom solutions
- Avoids unnecessary defensive existence checks (e.g., function_exists) when the dependency is guaranteed to exist
- Support PHP 7.4+ and WordPress 6.6+

### JavaScript (WordPress Standards)
- Follow the [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- Prefer arrow functions over traditional function expressions for inline callbacks and short functions.
- Omit the parentheses for arrow functions with one parameter
