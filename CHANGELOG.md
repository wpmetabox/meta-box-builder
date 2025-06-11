### 4.11.2 - 2025-05-21

Fix error for translating relationship texts

### 4.11.1 - 2025-05-21

Fix `fields_translations` settings still available and grows rapidly event when Polylang is not active

### 4.11.0 - 2025-05-08

Add integration for Polylang & improve the integration with WPML: allow translating settings pages/relationships/fields' labels and also value. For more details, please see this [blog post](https://metabox.io/wpml-polylang-integrations-improvements/).

### 4.10.1 - 2025-04-17

Fix tab not rendering

### 4.10.0 - 2025-04-01

New feature: [local JSON](https://metabox.io/local-json/), which allows you to use JSON to define field groups, and eliminate querying database.

### 4.9.8 - 2025-02-04

Fix: output syntax error in Theme Code

### 4.9.7 - 2024-11-19

Fix PHP warning when outputing code for heading/divider fields inside groups

### 4.9.6 - 2024-11-07

- Fix error exporting field groups
- Reduce number of DB queries when auto creating custom tables

### 4.9.5 - 2024-11-01

Fix "something wrong" message when editing fields

### 4.9.4 - 2024-11-01

- Fix direct file access
- Fix warning when exporting
- Fix issues by Plugin Check

### 4.9.3 - 2024-09-26

Fix default value "0" for `range` field type not working.

### 4.9.2 - 2024-08-19

- Show a warning when having duplicated IDs
- Fix group names for the generated theme code
- Fix running PHP Codesniffer when installing & autoload the plugin's main file via Composer

### 4.9.1 - 2024-07-25

Fix: duplicate fields checkbox got checked

### 4.9.0 - 2024-07-17

Add an option for relationships, allow you to delete relationship's data (connections) when deleting a relationship in the builder.

### 4.8.1 - 2024-07-05

- Fix "Save field value" option is auto turned off when upgrading from an old version
- Fix block error when no fields

### 4.8.0 - 2024-07-02

**Highlights:** This versions allows you to sync changes from block.json back to the UI, so you can keep the UI and the block.json in sync. In addition, this version connects with MB Blocks and MB Views that allows you to render blocks with views. You can select/add a view right in the builder and edit it for the block without leaving the page. For more details, please see this [blog post](https://metabox.io/sync-block-json-and-render-blocks-with-views/). Other changes:

- Add settings for enabling revisions.
- Improve suggestions for key-value options.
- Make relationships object types available only when extensions are active.
- Remove ID for "custom_html" field
- Fix wrong prefix for address field (when selecting for map/osm) when the field prefix is not set in the settings tab.

### 4.7.3 - 2024-05-16

- Add description for relationships reciprocal settings (#85)
- Fix: use context "normal" instead of "content"
- Fix blocks json notice (#83)

### 4.7.2 - 2024-04-18

- Fix cannot click duplicate & delete icons

### 4.7.1 - 2024-04-17

- Fix: cannot click on main tabs

### 4.7.0 - 2024-04-17

**Highlights:** This version supports creating `block.json` for blocks, which is supported in MB Blocks 1.5.0. This also prepares for a future updates to support more settings/edits for blocks. **Other changes:**

- Add save format to time field
- Only show menu for admin role
- Support to show fields for specific terms (requires MB Include Exclude extension)
- Fix changing field type to the group crashes the UI
- Fix not selecting title & id in the header bar with the mouse

### 4.6.7 - 2024-03-26

- Add text limiter settings
- Improve style for toggles for relationships & settings page
- Show admin filter for relationships only when the object type is post

### 4.6.6 - 2024-03-21

- Add option for relationship's `admin_filter`

### 4.6.5 - 2024-02-02

- Fix not loading styles for relationships and settings pages.

### 4.6.4 - 2024-01-22

- Add field ID prefix for suggestions of admin column position & address field

### 4.6.3 - 2023-11-28

Functionality:

- Don't use PHP's eval() in the Theme Code generator
- Validate and sanitize ID to avoid bad forms
- Add support for new [icon field type](https://docs.metabox.io/fields/icon/)
- Fix import field group does not take ID from JSON file
- Fix theme code generated for sub-groups

UI/UX:

- Improve how to select predefined/suggested values in conditional logic, group title, post/term/user query options, etc. Previously use input's datalist, but now use a beautiful dropdown.
- Add button to expand/collapse all fields
- Add arrow button for less confuse how to toggle field settings
- Increase toggle settings area to the whole item header
- Always show a blank option for select to let you unselect an option
- Fix tab icon not updated when adding a new tab

### 4.6.2 - 2023-09-18

- Improve UI for tabs: add icons (live preview when selecting an icon) & make tabs bold
- Supports field ID prefix in theme code
- Fix import settings page does not take ID from JSON file
- Generated PHP code for relationship: remove post and taxonomy setting when object type is user

### 4.6.1 - 2023-09-06

- UI tweak: Set icons on the header bar the same size
- UI tweak: Make it possible to remove the whole field name. Previously can't remove "(No label)" text.
- Add target "_blank" to the "Edit the field group settings" button

### 4.6.0 - 2023-08-16

**Highlight:** This version has a big improvement for UI/UX which shows group's subfields when collapsing for a better overview of the field group's hierarchy and easier to reorder fields. You can also toggle subfields and insert subfields to a specific group (without adding them to the end of the list and reorder later). This version also has live edit for the field name and field ID on the header bar. Just click on them to edit and press Enter/Esc or click outside to finish editing. See more details on our [blog post](https://metabox.io/meta-box-builder-ux-ui-update-visually-stunning-hierarchy-quick-add-quick-edit/) and [video](https://youtu.be/klTBsRAKCkM). Other improvements:

- Remove conditional logic for tab field
- Hide theme code if using custom block

### 4.5.2 - 2023-07-18

- Fix auto id in the header bar when changing field name (#49)

### 4.5.1 - 2023-06-23

- UI update: change checkbox style to toggle
- Fix error changing subfield type from text to checkbox
- Add safe-check for malformed data (fields with no or incorrect type)

### 4.5.0 - 2023-06-05

- Update the UI & add ID columns
- Add settings for "min_clone"

### 4.4.3 - 2023-04-04

- Fix support for drag and drop subfields in/out groups not working
- Fix redundant field prefix in validation
- Fix not showing theme code if users disable syntax highlighting

### 4.4.2 - 2023-03-23

- Fix block category not displaying saved value
- Fix duplicated suggested field IDs

### 4.4.1 - 2023-03-08

- Do not generate code for fields with no content like tab, heading and divider.

### 4.4.0 - 2023-03-07

- Introducing Theme Code: auto generate code to display fields. See [blog post](https://metabox.io/theme-code/).

### 4.3.1 - 2023-01-31

- Increase the size of the generated code. Make it readonly.
- Make the sidebar sticky
- Fix "save_field" param not saving correctly

### 4.3.0 - 2023-01-16

- Add support for Font Awesome in admin menu
- Add icon label and allow to search icons by label
- Fix import on Windows
- Use local tooltip JS library

### 4.2.0 - 2023-01-03

- Add import export for relationships and settings pages

### 4.1.18 - 2022-12-23

- Set default post type if empty
- Remove empty post types when parsing

### 4.1.17 - 2022-12-05

- Fix conflicts with Breakdance and other plugins that use Twig

### 4.1.16 - 2022-11-11

- Hide option_name under Advanced settings to reduce confusion for users when creating settings pages
- Fix ID not autogenerated when changing label
- Update tippy
- Add autocomplete for key-value options such as post's query args, wysiwyg editor settings, etc.

### 4.1.15 - 2022-09-20

- Fix callback function of checkbox list is not generated to PHP code

### 4.1.14 - 2022-08-11

- Add controls for `hide_from_front` and `hide_from_rest` to control field visibility on the front end and in REST responses

### 4.1.13 - 2022-05-17

- Fix query args in relationships not working
- Fix generate code for settings page missing the ID

### 4.1.12 - 2022-04-01

- Fix "no link" for relationship admin columns not working
- Remove non-recommended HTML5 field types (fallback to text)
- Make the inserter one-column

### 4.1.11 - 2022-02-10

- Add suggestions for common attributes for the Custom HTML5 attributes, which help define basic validation rules easier

### 4.1.10 - 2022-01-10

- Fix icon for tabs not working
- Add tooltip to explain max 10 items are displayed in the advanced location rules

### 4.1.9 - 2021-12-21

- Fix choice list created with callback doesn't update in real-time.
- Fix help tabs for settings page not working

### 4.1.8 - 2021-10-25

- Admin columns: list correct columns for terms and users, also set default value for column position.
- Update list of Dashicons
- Delete clone option for taxonomy field as it's not cloneable
- Set default value of textarea field as a textarea, not input

### 4.1.7 - 2021-07-06

- Fix empty value for conditional logic not saving
- Fix showing wrong "for" admin column for taxonomies
- Fix style conflict with Yoast SEO
- Remove "size" attribute for key value field type

### 4.1.6 - 2021-06-02

- Add prepend, append for HTML5 fields
- Don't filter empty array, remove only empty string values in array

### 4.1.5 - 2021-05-17

- Fix fatal error for settings pages

### 4.1.4 - 2021-05-14

- Don't submit form when pressing Enter
- Fix blank page for old field groups (from v3) with include exclude rules
- Fix block alignment not saving 2 or more values
- Fix empty conditional logic rules break the page

### 4.1.3 - 2021-04-19

- Fix tooltip for Google Maps API key
- Ignore scientific number

### 4.1.2 - 2021-04-01

- Fix console log, support meta box ID starts with number
- Fix style for settings icon in the meta box
- Fix localizing global MBB variable

### 4.1.1 - 2021-03-26

- Add default ID when create the new relationship
- Update Twig

### 4.1.0 - 2021-03-19

- Add support for admin columns extension
- Add support for reciprocal relationships
- Add support for admin columns for relationships
- Do not custom table columns for heading, divider and button fields
- Fix divider inside groups
- Fix broken edit custom fields page when permalink is plain

### 4.0.6 - 2021-03-10

- Fix not parsing block Dashicons

### 4.0.5 - 2021-02-22

- Fix missing export feature
- Fix trash & untrash swiping fields
- Fix default values for settings page, relationships not showing
- Fix settings pages not showing when no slug is entered
- Fix re-select top-menu not working

### 4.0.4 - 2021-02-09

- Fix upgrade not working.
- Allow to force migrating data from version < 4 by adding a query string `mbb_version=3.3` to the URL
- Update links for `query_args` for terms and users

### 4.0.3 - 2021-02-06

- Add confirmation when deleting a field
- Fix importing from old version (.dat) files
- Fix parsing tab when importing/upgrading

### 4.0.2 - 2021-02-03

- Fix post type and taxonomy setting not saving multiple entries, and allows to save empty values.
- Fix block render code not saving
- Fix parsing button group inline settings
- Updated to Twig version 3

### 4.0.1 - 2021-01-27

- Fix error getting PHP code for settings page & relationships for PHP < 8.
- Fix exporting/importing data not working
- Fix missing menu icon for settings page
- Fix wrong info in the admin columns
- Fix error if no field group ID is entered

### 4.0.0 - 2021-01-26

- Completely rewrite in React with more beautiful, cleaner and faster UI
- Improve UX & interactions
- Support creating settings pages & relationships
- Support validation
- Support all field & field group settings
- Add API to extend the builder with more field controls and types

### 3.3.8 - 2020-12-29

- Fix escaping multibyte characters
- Fix width of items in new WP version

### 3.3.7 - 2020-09-28

- Fix default value for button group inline option.

### 3.3.6 - 2020-07-30

- Hotfix for empty vendor folder.

### 3.3.5 - 2020-07-29

- Update parser

### 3.3.4 - 2020-07-16

- Removed unneeded default value for some parameters

### 3.3.3 - 2020-07-07

- Hot fix not parsing value: label for choice options.

### 3.3.2 - 2020-07-07

- Fix 0 value not working for button group choices

### 3.3.1 - 2020-06-17

- Fix multi-file uploads not working in GravityForms

### 3.3.0 - 2020-05-27

- Fix not parsing std for checkbox list
- Add clone attribute for checkbox
- Add messages when import error
- Use CodeMirror for export code
- Use CDN for assets

### 3.2.7 - 2020-03-23

- Fix tooltip not showing
- Fix array to string conversion for key-value field

### 3.2.6 - 2020-02-26

- Allows users to deselect columns settings for fields
- Fix error when activate with Meta Box AIO plugin
- Fix copy to clipboard not working

### 3.2.5 - 2019-12-11

#### Fixed

- Fix performance issue with MB Include Exclude extension when site has a lot of users.

#### Changed

- Show options in Settings tab for Gutenberg-supported post types.
- Hide edited user role/id when user meta extension is not active.

### 3.2.4 - 2019-11-29

#### Fixed

- Fix performance issue with MB Include Exclude extension
- Fix getting group value for blocks

#### Changed

- Improve field searching

### 3.2.3 - 2019-11-24

#### Fixed

- Fix compatibility with WP < 5
- Fix performance issue when editing a field group
- Fix image sizes not showing
- Fix switching tab in a field affects other fields

#### Changed

- Change style for field tab nav

### 3.2.2 - 2019-10-31

#### Fixed

- Fix not able to deselect default dropdown value

#### Changed

- Set default field type = select advanced for taxonomy fields
- Remove clone option for taxonomy field

### 3.2.1 - 2019-08-29

#### Changed

- Don't escape result from Twig template code
- Downgrade Twig to 1.33.2 to compatible with WPML & 2FAS Light plugins
- Move `$prefix` out of the field IDs for easier update
- Add missing text domain for label description
- Hide options for post types that support Gutenberg

### 3.2.0 - 2019-08-13

#### Added

- Add prefix settings, allowing to prefix all field IDs
- Add text domain settings (for exporting code only)
- Add readonly and disable settings for text fields
- Add `edited_user_role` & `edited_user_id` in Advanced location rules (requires [MB Include Exclude](https://metabox.io/plugins/meta-box-include-exclude/))

#### Changed

- Insert duplicated field right after the current field
- Allow to duplicate a whole group

#### Fixed

- Fix not saving custom attribute `save_field`
- Fix not parsing options for autocomplete field
- Fix pressing Enter on inputs in custom attributes still submit the form
- Fix parsing email in dot notation
- Fix missing `key_value` field
- Fix not saving when an input contains slashes
- Fix error on nginx with SSI enabled

### [3.1.0 - 2019-08-05](https://metabox.io/build-gutenberg-blocks-visually-with-meta-box-builder/)

#### Added

- Add support for building Gutenberg blocks visually. Also support Twig template engine for writing block template.

#### Changed

- Hide custom table settings when Show for = settings_page
- Don't submit on enter on inputs
- Enable submit buttons only when meta is loaded
- Update Brazil translation

### 3.0.1 - 2019-07-06

- Fix color picker field JavaScript error.
- Fix tab label not updating in real-time.
- Fix `array_walk` error when upgrade data for posts.
- Fix duplicating field not working.
- Remove old `pages` param from the exported code.
- Upgrade old `context` param in the database.

### 3.0.0 - 2019-06-27

#### Changed

- The plugin is rewritten completely with PHP namespace (using Composer) and requires PHP >= 5.6
- Make all text translatable
- Restructure the Settings tab, moving Exclude Include / Show Hide / Conditional Logic into one section "Location"
- Hide a lot of settings if some extensions required are not available (or enabled in the AIO)
- Update the rules for Location based on whenever Guteberg is active
- Remove the Import menu as it's kind of a solo item in the menu. It's now next to the Add New in the All Field Groups screen.
- Move Delete/Duplicate field button into the title bar

#### Added

- Add a new column for front-end shortcode (if Frontend Submission extension is active)

#### Fixed

- Fix some issues with drag and drop

### 2.11.3 - 2019-05-15

#### Fixed

- Update clipboard to not conflict with built-in version in WordPress 5.2. [See report](https://metabox.io/support/topic/javascript-error-disable-switching-the-editor-tabs/).
- Show group title in the field top bar when group label is not set.
- Fix max_status = false default not working.
- Fixed bulk removed field groups.

#### Added

- Added columns to Builder.

### 2.11.2 - 2019-04-09

#### Fixed

- Fixed when adding a link with target="_blank" in a field description breaks field groups from saving in WordPress 5.1.

#### Changed

- Improved the code for import export page. Do not save the export file in the upload folder anymore.

### 2.11.1 - 2019-02-28

- Added UI and support for [post type templates](https://make.wordpress.org/core/2016/11/03/post-type-templates-in-4-7/) for Show Hide extension.

### 2.11.0 - 2019-01-15

#### Fixed

- Fixed language file name.

#### Added

- Added new Location column in the All Field Groups screen to show the location of the meta box.

#### Changed

- Updated UI for tab settings.

### 2.10.1

#### Fixed

- Fixed dot notation not parsed. Also limit the dot notation for key-array settings only.

#### Changed

- Toggle the field settings when clicking the field title bar. Also added slide animation.
- Improved UI for tabs.
- For settings pages: show page title instead of id in the Settings tab.

#### Added

- Added Location column in the admin table list of field groups.

### 2.10.0

#### Changed

- Refactor the code that parse meta box and field settings.
- Updated the code output, making it more beautiful.
- Deleted `thickbox_image` field as no longer supported.

#### Fixed

- Fixed `multiple` not working for choice (`select`, `select_advanced`) fields.
- Fixed `options` not working for `button_group`.
- Fixed `options` wrong format when export/import.
- Fixed white screen after done importing.
- Removed `max_file_uploads` settings for `image_select` field, which doesn't support this feature.

### 2.9.4

- Fixed options for choice fields doesn't work for nested groups.

### 2.9.3

- Fixed wrong arguments passed to array_map function. See [forum topic](https://metabox.io/support/topic/adding-a-group-causes-an-warning-argument-2-should-be-an-array/).

### 2.9.2

#### Fixed

- Fixed compatibility with PHP < 5.4.

#### Added

- Added missing fields `file_upload` and `image_upload`.
- Added Portuguese (Brazil) translation.
- Updated Vietnamese translation.

### 2.9.1

- Fixed wrong key for group title when uses field value.

### 2.9.0

#### Changed

- Make field options for choice fields textarea. Allows users to copy and paste values easier. See video [https://youtu.be/cTsctgPbr-g](https://youtu.be/cTsctgPbr-g).

#### Added

- Added field [OpenStreetMap](https://docs.metabox.io/fields/osm/) (OSM).

### 2.8.4

- Fixed missing settings pages ID when export to code, that causes fields not appearing on settings pages.

### 2.8.3

- Fixed missing field type for `taxonomy` field.
- Fixed missing Custom Table settings.

### 2.8.2

- Fixed styling for icons in tab field.

### 2.8.1

#### Added

- Added field Custom HTML.
- Added tabs Advanced for Divider field.
- Post field now can select multiple post types.

#### Changed

- Switching between tabs Fields and Settings no longer requires re-loading the page.

#### Fixed

- Settings pages not available for selection in Settings tab.
- Fix parameter "max_status" of Image Advanced field.

### 2.8.0

#### Changed

- Used the shared admin menu by Meta Box plugin. Changed labels to "Field Group" instead of "Meta Box".
- Better check for premium extensions.

#### Fixed

- Fixed time picker field not working.
- Fixed value "0", "1" in select field.

### 2.7.0

#### Added

- Added support for edit meta box ID, useful when you want to embed it in shortcode for [frontend submission](https://metabox.io/plugins/mb-frontend-submission/) or [user profile](https://metabox.io/plugins/mb-user-profile/).

#### Fixed

- Fixed output for show/hide extension, the page template rule.
- Removed empty rules for show/hide extension.

### 2.6.4

- Fixed labels for custom attributes are repeated when adding more attributes

### 2.6.3

- Added missing options from select/select_advanced/checkbox_list for taxonomy, user, post fields

### 2.6.2

- Do not auto lowercase for field ID.
- Added collapsible settings, Appearance, Advanced tabs for groups.

### 2.6.1

- Added a drop zone for sub-fields of groups.
- Updated JavaScript libraries

### 2.6.0

- Updated all field settings and UI.

### 2.5.0

#### Changed

- Updated the UI, adding some tooltips for better explanation of fields. Text is also updated for a better description.

#### Fixed

- Fixed error for MB Include Exclude extension
- Fixed error for post field.

### 2.4.1

- Fixed error when fail to parse meta box settings

### 2.4.0

#### Added

- Added support for MB Term Meta, MB Settings Pages, MB User Meta, MB Comment Meta
- Added status for meta box, allowing to create a draft meta box

#### Changed

- Updated the UI, docs links and some texts for better understanding

#### Fixed

- Fixed missing "clone" option for post field

### 2.3.0

- Updated the options to match Online Generator and new field types / context from Meta Box.

### 2.2.3

- Fix: Hidden field doesn't works properly.

### 2.2.2

- Fixed taxonomy advanced field.

### 2.2.1

- New: Improve styles for custom attributes, conditional logic
- New: Add syntax highlighting for generated PHP code

### 2.2

- New: Supports for generating PHP code to be used without the extension.
- Fix: CSS skewed on Settings/Include Exclude tab
- Fix: Delete button is invisible in Add New Meta Box

### 2.1.1

- Fix: incompatibility with Include/Exclude
- Fix: tab_style and tab_wrapper attribute should removed if no tab exists
- Improvement: tweak the settings page UI

### 2.1

- Improvement: Compatibility with nested nested... group
- Improvement: Move settings for meta box and fields to new tab
- Improvement: Easier to include the plugin in theme
- Improvement: Style for tab and field attributes
- Improvement: Update Angular ui-sortable
- Fix: Export doesn't works
- Fix: Error when dragging field under field

### 2.0.7

- Fix: Fix plugin localization
- Fix: CSS error in field settings

### 2.0.6

- Improvement: Change default permission from update_core to edit_theme_options
- Fix: Import/Export doesn't works in some hosts
- Fix: Add Option button doesn't shows up
- Improvement: Allows user add empty value for Select, Select Advanced...
- Improvement: Add Post Types dropdown to Post field

### 2.0.5

- Fix: Update Taxonomy and Taxonomy Advanced to compatibility to the latest version

### 2.0.4

- Improvement: Supports columns extension without using Custom Attributes

### 2.0.3

- Bug fix: Remove PHP warning when field\['type'\] is not set
- Bug fix: Builder stops when has two fields which has same id
- Improvement: Better way to save data without using jQuery sanitize
- Improvement: Conditional Logic Use `starts with` instead of `start_with`, `ends with` instead of `end_with` for more naturally.

### 2.0.2

- Bug fixes: Error with duplicated elements

### 2.0.1

- Bug fixes: Error when no meta box added

### 2.0

- New feature: Support Conditional Logic
- New feature: Support Group by creating nested fields
- New feature: Support Tabs by drag and drop tabs above fields
- New feature: Support custom attributes for meta boxes
- Improvement: Totally rewrite fields template
- Improvement: Only Administrators can manage meta boxes
- Improvement: Increase the size of field editor
- Improvement: Use Select2 instead of Checkboxes for selecting Post Types
- Improvement: Show all premium fields and add-ons feature eventhough user hasn't activated
- Bug fixes: Remove some CSS bugs

### 1.2.2

- Bug fixes: Compatibility with WP Loop

### 1.2.1

- New feature: Import/Export meta boxes
- Bug fixes: Cannot display more than 10 Meta Boxes

### 1.2

- New feature: Allows user define array in "key - value" fields by using dot notation.
- Bug fixes: Text List doesn't display without default values.
- Improvement: User cannot define default values for Text List when clone.

### 1.1

- New feature: Add JSON support for value on Custom Attribute, JS Options, Query Args... and other "key - value" field attribute.
- Improvement: On the "key - value" fields (Custom Attribute, JS Options, Query Args...), change the value input to textarea
- New feature: Support Show / Hide extension
- New feature: Support Include / Exclude extension
- Improvement: Change the priority of Builder Gui (from admin_init to init)
- Improvement: Add input email support for Builder Gui
- Improvement: Only load file in Dashboard.

### 1.0.2

- New feature: User can now navigate between option fields via up and down key.
- Bug fixes: $meta_boxes filter override bug which clear all meta boxes registered outside MB Builder

### 1.0.1

- Bug fixes: Backward compatibility with PHP 5.1+
- Bug fixes: Fix **options** `_label_` and `_value_` wrong position
- New feature: Placeholder for **number** field

### 1.0

- First release