# 1. Create a settings control for translation mode

## Requirements
I want to create a control in the settings tab that allows me to select whether to translate fields in the field group.

The control should be a select dropdown with the following options:
- key: ignore, value: Do not translate any fields in this field group
- key: translate, value: Translate all fields in this field group
- key: advanced, value: Select which fields to translate

## Folder structure

Base folder: `wp-content/plugins/meta-box-builder`

The control should be added via a filter in a new file named `src/Integrations/Polylang/FieldGroupValues.php`. That filter is `mbb_settings_controls`, which is defined in the `src/RestApi/Settings.php` file.

The new control will be rendered by JavaScript, in the `app/components/Tabs/Settings.js` file.

# 2. Create a modal for advanced translation mode

## Requirements
Based on the requirement from the step 1 above, when user select mode "advanced" from the dropdown, show a modal where list all fields and allow users to select which translation mode for each of them.

Display list of fields and option in a table grid with each option as a radio, like this:

Field|Ignore|Translate
---|---|---
Field 1 | (x) | ()
Field 2 | (x) | ()
Field 3 | (x) | ()

(default: ignore is selected)

List of fields are get from the current field group.

## Technical details

The file to implement this behavior is a new file named `app/controls/TranslationModal.js`.

The modal should be implemented with `Modal` component from `@wordpress/components` package.

The title of the modal is "Select a translation mode for each field".

After users select translation modes for all fields, click the "Save" button in the modal footer, which will close the modal and store the values in a hidden input name `settings[translations]`, where value is a JSON string of values (in type of array( field_id => mode )).