# Allowed Block Lists Feature Design

## Overview

This feature allows users to create, manage, and reuse predefined lists of allowed blocks for the block editor field. Instead of selecting blocks one by one from a long list, users can select from saved lists or create new ones.

## Data Storage

### Option Name
`mbb_allowed_block_lists`

### Structure
```json
{
  "basic": { "name": "Basic", "blocks": ["core/paragraph", "core/heading", "core/image", "core/list", "core/list-item", "core/quote"] },
  "text": { "name": "Text", "blocks": ["core/paragraph", "core/heading", "core/list", "core/list-item", "core/quote"] },
  "layout": { "name": "Layout", "blocks": ["core/group", "core/columns", "core/cover", "core/media-text", "core/paragraph", "core/heading", "core/image", "core/list", "core/list-item", "core/quote"] }
}
```

**Block Validation:** When saving a list, filter out any blocks that are not registered in WordPress. Only store valid block names.

**ID Generation:** List IDs are derived from the list name using `sanitize_key()` (e.g., "My List" → "my-list"). If a collision occurs, append a numeric suffix.

### Default Lists

| Name | Blocks |
|------|--------|
| Basic | core/paragraph, core/heading, core/image, core/list, core/list-item, core/quote |
| Text | core/paragraph, core/heading, core/list, core/list-item, core/quote |
| Layout | core/group, core/columns, core/cover, core/media-text, core/paragraph, core/heading, core/image, core/list, core/list-item, core/quote |

**Seeding logic:** When the builder loads, check if the option `mbb_allowed_block_lists` is empty OR does not contain the three default lists (basic, text, layout). If so, seed the defaults. This ensures defaults are available even if users deleted all lists.

### Separate Tracking Option
`mbb_allowed_block_lists_initialized`: Set to `true` after defaults are seeded for the first time.

## Settings

### New Setting: `allowed_block_list`

- Type: Custom select control
- Location: Block editor field settings (General tab)
- Default value: "Allow all blocks" (empty value)
- Description: "Select a predefined list of allowed blocks"

### Existing Setting: `allowed_blocks`

- Kept for backward compatibility
- Used internally to store the actual block list
- Not rendered directly in the UI (handled by `allowed_block_list`)

## UI Components

### 2.1 BlockListSelect Control
A custom select dropdown with three icon buttons:

| Button | Icon | Action | Disabled State |
|--------|------|--------|----------------|
| Manage | Grid icon | Opens ManageBlockLists modal | No |
| Add New | Plus icon | Opens BlockListEditor modal (create mode) | No |
| Edit | Pencil icon | Opens BlockListEditor modal (edit mode) | When no list selected |

### 2.2 BlockListEditor Modal
Two-column layout for managing blocks in a list.

**Left Column: Available Blocks**
- Grid of all available blocks from `Data::get_blocks()`
- Shows: block icon + title + block name
- Click on a block → moves to Selected

**Right Column: Selected Blocks**
- Grid of currently selected blocks
- Click on a block → moves to Available

**Fields:**
- List Name (text input, required)

**Actions:**
- Save - Saves to option, closes modal. If editing, updates the original list.
- Save as new - Creates a new list with entered name, closes modal. The original list remains unchanged. The field group being edited keeps its current `allowed_block_list` value pointing to the original list (does NOT auto-switch to the new list). User must manually select the new list if desired. (edit mode only, hidden in create mode)
- Cancel - Closes modal without saving

### 2.3 ManageBlockLists Modal
Table view of all saved lists.

**Header:** "Add new" button above the table to create a new list.

**Columns:**
- Name
- Block count
- Actions: Edit, Delete

**Footer:** "Export All" and "Import" buttons for backup/restore.

**Actions:**
- Edit - Opens BlockListEditor modal with that list's data
- Delete - Removes list from storage (with confirmation dialog). Clears `allowed_block_list` in fields using this list. The `allowed_blocks` setting remains as-is (inherited from the deleted list), so fields continue to work with those blocks.
- Export All - Downloads all lists as `allowed-block-lists.json`
- Import - Opens file picker to upload JSON file. Merges lists by ID: updates existing lists with same ID, adds new lists with different IDs.

**Add new button:** Opens BlockListEditor modal in create mode.

## Data Flow

### Loading (Migration)
When the field group editor loads:

1. Check if field has existing `allowed_block_list` value
   - If has value → use that list (normal operation)
2. If no `allowed_block_list`, check if `allowed_blocks` has value
   - If `allowed_blocks` exists and is not empty → run migration:
     - Generate list name: "{field_name}: allowed blocks"
     - Generate ID: use sanitize_key() on name. If ID already exists, append numeric suffix (e.g., "my-list-2")
     - Create new list in `mbb_allowed_block_lists` with those blocks
     - Set `allowed_block_list` to the new list's ID
     - Clear `allowed_blocks` value
3. If neither exists → show empty (allows all blocks)
4. Render `allowed_block_list` control with the list

### Saving
When saving the field group:

1. Read `allowed_block_list` value
2. If empty → leave `allowed_blocks` untouched (allows all)
3. If has value → look up list from `mbb_allowed_block_lists`
4. Get `blocks` array from the list
5. Set `allowed_blocks` to that array
6. Set `allowed_block_list` value (persisted with the field group)

**Note:** The `allowed_block_list` value is saved as part of the field group settings. On subsequent loads, the field will display the selected list directly.

**Import/Export considerations:** The `allowed_block_list` stores only the list ID (e.g., "basic"). When exporting to another site, ensure the target site has the same list in its `mbb_allowed_block_lists` option. Default lists (Basic, Text, Layout) are auto-seeded on first access.

## REST API

### Endpoints (no version in URL)

**GET /mbb/allowed-block-lists**
- Returns all saved lists
- Response: `{ "basic": { "name": "Basic", "blocks": [...] }, ... }`

**POST /mbb/allowed-block-lists**
- Creates or updates a list
- Body: `{ "id": "optional-id", "name": "List Name", "blocks": ["core/paragraph", ...] }`
- If `id` is provided: updates the existing list with that ID
- If `id` is not provided: generates ID from name, creates new list
- If name collides with existing list ID, appends numeric suffix
- Same-name lists are allowed (only ID must be unique)
- Returns: Updated lists object

**DELETE /mbb/allowed-block-lists/{id}**
- Deletes a list by ID
- Returns: Updated lists object

**POST /mbb/allowed-block-lists/import**
- Imports lists from JSON
- Body: `{ "lists": { "id": { "name": "...", "blocks": [...] }, ... } }`
- Merges by ID: updates existing lists with same ID, adds new lists with different IDs
- Returns: Updated lists object

**GET /mbb/allowed-block-lists/export**
- Returns all lists in JSON format for export
- Response: `{ "lists": { "id": { "name": "...", "blocks": [...] }, ... } }`

## Components to Create/Modify

| Component | Action |
|-----------|--------|
| `src/Helpers/Data.php` | Add `get_allowed_block_lists()`, `save_allowed_block_lists()`, `seed_default_lists()`, check `mbb_allowed_block_lists_initialized` |
| `src/Registry.php` | Add `allowed_block_list` setting |
| `src/RestApi/AllowedBlockLists.php` | New REST API controller |
| `assets/app/controls/BlockListSelect.js` | New custom control |
| `assets/app/components/Modals/BlockListEditor.js` | New modal component |
| `assets/app/components/Modals/ManageBlockLists.js` | New modal component |

## Acceptance Criteria

1. Dropdown shows "Allow all blocks" by default (empty value)
2. Users can select from predefined lists (Basic, Text, Layout)
3. Users can create new block lists via Add New button
4. Users can edit existing lists via Edit button
5. Users can manage (view, delete, add new) all lists via Manage button
6. Migration converts existing `allowed_blocks` to a list when loading
7. Saving a field group converts `allowed_block_list` to `allowed_blocks`
8. All builder users can manage lists (no role restriction)
9. Default lists are seeded when first accessed (not on activation)