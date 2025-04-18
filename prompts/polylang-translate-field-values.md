# Translate a custom fields created by meta-box-builder

## Requirements
I want to translate a custom field created by meta-box-builder. The translation is done by Polylang plugin.

## Folder structure

Base folder: `wp-content/plugins/meta-box-builder`.
Polylang folder: `wp-content/plugins/polylang`.

The code will be added to the file named `src/Integrations/Polylang/FieldGroupValues.php`.

Using a fixed field ids, defined as a constant in the file, to test the behavior.

## Task 1

Tells Polylang whether to translate or copy a field

