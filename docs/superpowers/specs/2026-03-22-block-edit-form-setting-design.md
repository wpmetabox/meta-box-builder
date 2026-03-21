# Add "Where to display the edit form?" Setting

## Date
2026-03-22

## Status
Draft

## Context
When creating a meta box for block editor (Gutenberg), users need to specify where the edit form should appear in the block inspector sidebar.

## Solution

### Files to Modify

**`assets/app/components/Panels/FieldGroupSettings/Block.js`**
- Add Radio control for setting where the edit form displays
- Import Radio component
- Add setting with label "Where to display the edit form?"
- Options: 
  - `side` = "On the right sidebar" (default)
  - `normal` = "In the content area"

### Implementation

```jsx
import Radio from '../../../controls/Radio';

// In Block component:
<Radio
    name="context"
    label={ __( 'Where to display the edit form?', 'meta-box-builder' ) }
    options={ { 
        side: __( 'On the right sidebar', 'meta-box-builder' ), 
        normal: __( 'In the content area', 'meta-box-builder' ) 
    } }
    defaultValue={ getSetting( 'context', 'side' ) }
    updateField={ updateSetting }
/>
```

## Settings Data

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `context` | string | `side` | Where to display the edit form (`side` or `normal`) |

## Testing

1. Verify Radio control renders correctly in Block settings panel
2. Verify "side" is selected by default
3. Verify setting persists after saving
4. Verify setting appears only when object type is "block"
