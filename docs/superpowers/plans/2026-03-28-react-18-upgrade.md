# React 18 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the main Meta Box Builder app from React 17 `render()` API to React 18 `createRoot()` API, eliminating the field-settings panel flickering issue.

**Architecture:** Five targeted changes: (1) fix inconsistent imports, (2) move active field state to a separate zustand store, (3) cache `React.lazy()` at module level, (4) move hover to CSS + DOM manipulation, (5) switch `render` to `createRoot` in entry point.

**Tech Stack:** React 18.3.1 (via `@wordpress/element`), Zustand 4.x, `@wordpress/scripts` 27.x

---

## Files Modified

| File | Change |
|------|--------|
| `assets/app/controls/AdminCloumnsWidth.js:1` | Fix import source |
| `assets/app/hooks/useVerticalResizable.js:1` | Fix import source |
| `assets/app/hooks/useResizable.js:1` | Fix import source |
| `assets/app/App.js` | Switch `render` → `createRoot` |
| `assets/app/hooks/useActiveField.js` | **New** — dedicated active field store |
| `assets/app/list-functions.js` | Remove `_active` from field objects, use `useActiveField` store |
| `assets/app/components/Editor/FieldPreview.js` | Remove hover state, cache lazy, use `useActiveField` |
| `assets/app/components/Editor/FieldTypePreview/ObjectField.js` | Cache lazy components |
| `assets/app/components/Panels/FieldSettings/Tab.js` | Cache lazy components (already done) |
| `assets/app/components/Editor/Fields.js` | Add delegated hover handlers |
| `assets/sass/editor/_field.scss` | Change `&--hover` to `&:hover:not(:has(.mb-field:hover))` |
| `assets/sass/editor/_columns.scss` | Add resize handle visibility via direct child combinator |
| `assets/sass/editor/_toolbar.scss` | Minor comment cleanup |

---

### Task 1: Fix direct `'react'` imports to use `@wordpress/element`

**Files:**
- Modify: `assets/app/controls/AdminCloumnsWidth.js:1`
- Modify: `assets/app/hooks/useVerticalResizable.js:1`
- Modify: `assets/app/hooks/useResizable.js:1`

- [ ] **Step 1: Fix `AdminCloumnsWidth.js` import**

Change line 1 from:
```js
import { useState } from 'react';
```
to:
```js
import { useState } from '@wordpress/element';
```

- [ ] **Step 2: Fix `useVerticalResizable.js` import**

Change line 1 from:
```js
import { useEffect, useRef, useState } from 'react';
```
to:
```js
import { useEffect, useRef, useState } from '@wordpress/element';
```

- [ ] **Step 3: Fix `useResizable.js` import**

Change line 1 from:
```js
import { useEffect, useRef, useState } from 'react';
```
to:
```js
import { useEffect, useRef, useState } from '@wordpress/element';
```

- [ ] **Step 4: Commit**

```bash
git add assets/app/controls/AdminCloumnsWidth.js assets/app/hooks/useVerticalResizable.js assets/app/hooks/useResizable.js
git commit -m "fix: import React hooks from @wordpress/element instead of react"
```

---

### Task 2: Move active field state to a separate zustand store

**Files:**
- Create: `assets/app/hooks/useActiveField.js`
- Modify: `assets/app/list-functions.js`

- [ ] **Step 1: Create `useActiveField` store**

```js
import { create } from 'zustand';

const useActiveField = create( set => ( {
	fieldId: null,
	setFieldActive: fieldId => set( { fieldId } ),
} ) );

export default useActiveField;
```

This replaces the previous approach of storing `_active` as a property on every field object across all per-list zustand stores.

- [ ] **Step 2: Update `list-functions.js`**

Remove `setFieldActive` export (it was a wrapper that mutated `_active` on field objects across all stores). The `useActiveField` store is now used directly by components via `useActiveField(state => state.setFieldActive)`.

Remove `delete field._active` statements from `duplicateField` and `buildFieldsTree` since `_active` is no longer set on field objects.

- [ ] **Step 3: Commit**

```bash
git add assets/app/hooks/useActiveField.js assets/app/list-functions.js
git commit -m "perf: move active field state to separate store to prevent re-renders"
```

---

### Task 3: Cache `React.lazy()` at module level

**Files:**
- Modify: `assets/app/components/Editor/FieldPreview.js`
- Modify: `assets/app/components/Editor/FieldTypePreview/ObjectField.js`

- [ ] **Step 1: Add lazy cache to `FieldPreview.js`**

At module level, before the component:
```js
const lazyFieldTypeCache = new Map();
const getLazyFieldType = type => {
	if ( !lazyFieldTypeCache.has( type ) ) {
		lazyFieldTypeCache.set( type, lazy( () => import( `./FieldTypePreview/${ ucwords( type, '_', '' ) }` ) ) );
	}
	return lazyFieldTypeCache.get( type );
};
```

Replace inline `lazy()` call with `getLazyFieldType(field.type)`.

Also move `builtInFieldTypes` array outside the component body (static constant).

- [ ] **Step 2: Add lazy cache to `ObjectField.js`**

Same pattern:
```js
const lazyObjectFieldCache = new Map();
const getLazyObjectField = type => {
	if ( !lazyObjectFieldCache.has( type ) ) {
		lazyObjectFieldCache.set( type, lazy( () => import( `./${ ucwords( type, '_', '' ) }` ) ) );
	}
	return lazyObjectFieldCache.get( type );
};
```

- [ ] **Step 3: Commit**

```bash
git add assets/app/components/Editor/FieldPreview.js assets/app/components/Editor/FieldTypePreview/ObjectField.js
git commit -m "perf: cache React.lazy() at module level to prevent Suspense flash"
```

---

### Task 4: Move hover to CSS + DOM manipulation

**Files:**
- Modify: `assets/app/components/Editor/Fields.js`
- Modify: `assets/app/components/Editor/FieldPreview.js`
- Modify: `assets/sass/editor/_field.scss`
- Modify: `assets/sass/editor/_columns.scss`
- Modify: `assets/sass/editor/_toolbar.scss`

- [ ] **Step 1: Border/outline — pure CSS**

In `_field.scss`, change:
```scss
&--hover {
    outline: 1px solid var(--outline);
    z-index: 2;
}
```
to:
```scss
&:hover:not(:has(.mb-field:hover)) {
    outline: 1px solid var(--outline);
    z-index: 2;
}
```

The `:has(.mb-field:hover)` selector excludes parent fields when a child field is hovered, so only the innermost field gets the outline.

- [ ] **Step 2: Resize handle — CSS with direct child combinator**

In `_columns.scss`, add `display: none` to `.mb-field-resize-handle`, then:
```scss
.mb-field--hover > .mb-field-resize-handle,
.mb-field--active > .mb-field-resize-handle {
    display: block;
}
```

The `>` (direct child combinator) prevents a group's hover/active state from cascading to resize handles inside nested subfields.

- [ ] **Step 3: Toolbar — delegated DOM handlers**

In `Fields.js`, add `handleMouseOver` and `handleMouseOut` callbacks on the `.mb-editor` container:

```js
const handleMouseOver = useCallback( e => {
    const field = e.target.closest( '.mb-field' );
    if ( !field || field === hoveredRef.current ) return;

    if ( hoveredRef.current ) {
        hoveredRef.current.querySelector( ':scope > .mb-toolbar' )?.classList.remove( 'mb-toolbar--show' );
        hoveredRef.current.classList.remove( 'mb-field--hover' );
    }

    hoveredRef.current = field;
    field.querySelector( ':scope > .mb-toolbar' )?.classList.add( 'mb-toolbar--show' );
    field.classList.add( 'mb-field--hover' );
}, [] );
```

Use `:scope > .mb-toolbar` to target only the direct child toolbar, not toolbars of nested subfields.

- [ ] **Step 4: Remove hover state from `FieldPreview.js`**

Remove:
- `const [ hover, setHover ] = useState( false )`
- `const [ resizing, setResizing ] = useState( false )` → keep this (still needed for resize cursor)
- The `useEffect` that registers `window.addEventListener('mousemove')`
- `hovering` and `showActions` derived variables
- Pass `show={ false }` to `<Toolbar>` (visibility now controlled by DOM class)
- Always render the resize handle (visibility now controlled by CSS)

- [ ] **Step 5: Commit**

```bash
git add assets/app/components/Editor/Fields.js assets/app/components/Editor/FieldPreview.js assets/sass/editor/_field.scss assets/sass/editor/_columns.scss assets/sass/editor/_toolbar.scss
git commit -m "perf: move hover to CSS + DOM manipulation, fix nested group hover"
```

---

### Task 5: Switch `App.js` from `render` to `createRoot`

**Files:**
- Modify: `assets/app/App.js`

- [ ] **Step 1: Change import**

Change line 1 from:
```js
import { render } from "@wordpress/element";
```
to:
```js
import { createRoot } from "@wordpress/element";
```

- [ ] **Step 2: Replace render call and remove old code**

Replace lines 38-41 from:
```js
// Use React 17 to avoid flashing issues when click to expand field settings.
render( <App />, container );
// const root = createRoot( container );
// root.render( <App /> );
```
to:
```js
createRoot( container ).render( <App /> );
```

- [ ] **Step 3: Commit**

```bash
git add assets/app/App.js
git commit -m "feat: switch main app from React 17 render to React 18 createRoot"
```

---

### Task 6: Update components to use `useActiveField` store

**Files:**
- Modify: `assets/app/components/Editor/FieldPreview.js`
- Modify: `assets/app/components/Panels/Structure/Node.js`

- [ ] **Step 1: Update `FieldPreview.js`**

Replace:
```js
import { setFieldActive } from "../../list-functions";
```
with:
```js
const setFieldActive = useActiveField( state => state.setFieldActive );
```

Replace `field._active` with `useActiveField( state => state.fieldId === field._id )`.

- [ ] **Step 2: Update `Node.js`**

Same pattern — replace `import { setFieldActive } from "../../../list-functions"` with direct hook usage.

- [ ] **Step 3: Commit**

```bash
git add assets/app/components/Editor/FieldPreview.js assets/app/components/Panels/Structure/Node.js assets/app/list-functions.js
git commit -m "perf: remove flushSync, use setFieldActive from hook, cache React.lazy at module level"
```

---

### Task 7: Build and verify

- [ ] **Step 1: Build the app**

```bash
pnpm run build
```

Expected: CSS and JS compile without errors.

- [ ] **Step 2: Manual verification checklist**

Test in the WordPress admin:
- [ ] Click to expand field settings for various field types — no flickering
- [ ] Add a new field — field appears, settings panel opens smoothly
- [ ] Add a group field — group expands with no flicker
- [ ] Delete a field — next field becomes active smoothly
- [ ] Duplicate a field — new field appears without flicker
- [ ] Hover over fields — toolbar, outline, and resize handle appear correctly
- [ ] Hover over nested group subfields — parent group outline does NOT show, subfield toolbar shows
- [ ] Resize handle shows only for the hovered/active field, NOT for subfields inside a hovered group
- [ ] Switch between Fields / PHP / Theme Code tabs
- [ ] Resize the nav panel (drag the resizer)
- [ ] Reorder fields via drag-and-drop

- [ ] **Step 3: Final commit (if any fixes needed)**

If manual testing reveals issues, fix and commit. Otherwise, the implementation is complete.
