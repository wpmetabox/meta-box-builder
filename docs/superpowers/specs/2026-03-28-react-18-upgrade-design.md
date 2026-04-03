# React 18 Upgrade Design

## Context

The main Meta Box Builder app (`assets/app/App.js`) uses the legacy `render()` API from `@wordpress/element` (React 17 style). The comment on line 38 says: _"Use React 17 to avoid flashing issues when click to expand field settings."_ `createRoot` was previously attempted but reverted due to whole-area flickering when expanding field settings.

React 18.3.1 is already installed via pnpm. The SettingsPage and Relationships sub-apps already use `createRoot` successfully. Only the main app needs upgrading.

## Root Cause

The flickering has multiple sources:

1. **`React.lazy()` called inside render body** — `FieldPreview.js` and `ObjectField.js` call `lazy()` inside the component function. When `isActive` changes, the component re-renders, creating a new lazy wrapper reference. React sees a different component type, unmounts the old one and mounts a new one. During mount, `<Suspense fallback={null}>` briefly renders `null`, causing a visible flash.

2. **`mousemove` listeners on every field** — Each `FieldPreview` registers its own `window.addEventListener('mousemove')` handler. With N fields, N listeners fire on every pixel the mouse moves, each calling `setState` and triggering React re-renders. Under React 18's concurrent rendering, this creates heavy rendering pressure.

3. **`_active` property mutated across all stores** — `setFieldActive` iterates through all fields in all zustand stores and calls `updateField('_active', ...)` on each. Each call triggers a zustand `set()`, causing cascading re-renders of every field component that reads `_active`.

## Changes

### 1. `assets/app/App.js` — Switch to `createRoot`

- Replace `import { render } from "@wordpress/element"` with `import { createRoot } from "@wordpress/element"`
- Replace `render( <App />, container )` with `createRoot( container ).render( <App /> )`
- Remove the commented-out `createRoot` code and the "Use React 17" comment

### 2. `assets/app/list-functions.js` — Separate active field store

Move active field state out of per-list zustand stores (where it was stored as `field._active` on field objects) into a dedicated `useActiveField` zustand store that only tracks `{ fieldId }`. Components subscribe via `useActiveField(state => state.fieldId === field._id)`, so only the old and newly active field components re-render — not every field in every store.

### 3. Cache `React.lazy()` at module level

`React.lazy()` called inside a component body creates a new reference on every render, causing Suspense to unmount/remount. Cache lazy components at module level using a `Map`:

| File | Pattern |
|------|---------|
| `FieldPreview.js` | `lazyFieldTypeCache` — caches lazy wrappers for each field type preview component |
| `ObjectField.js` | `lazyObjectFieldCache` — caches lazy wrappers for each object field type |
| `Tab.js` | `lazyControlCache` — already existed, kept as-is |

### 4. Move hover to CSS + DOM manipulation

Replace per-field `mousemove` + `useState` hover with:

- **Border/outline**: Pure CSS `:hover:not(:has(.mb-field:hover))` — shows outline only on the innermost hovered field, not parent groups. No JS involved.
- **Toolbar**: Two delegated `mouseover`/`mouseout` handlers on the parent `.mb-editor` div. Uses `e.target.closest('.mb-field')` and direct DOM class toggling (`mb-toolbar--show`). Zero React re-renders on hover.
- **Resize handle**: Always rendered, visibility controlled by CSS using direct child combinator (`.mb-field--hover > .mb-field-resize-handle`). Prevents group hover from leaking to subfield handles.

### 5. Fix direct `'react'` imports

Change 3 files that import from `'react'` to import from `@wordpress/element`:

| File | Current Import |
|------|---------------|
| `assets/app/controls/AdminCloumnsWidth.js` | `import { useState } from 'react'` |
| `assets/app/hooks/useVerticalResizable.js` | `import { useEffect, useRef, useState } from 'react'` |
| `assets/app/hooks/useResizable.js` | `import { useEffect, useRef, useState } from 'react'` |

### 6. Remove dead `_active` references

After moving to the separate `useActiveField` store, `field._active` is never set. Remove `delete field._active` statements from `duplicateField` and `buildFieldsTree` in `list-functions.js`.

## Out of Scope

- No changes to SettingsPage or Relationships apps (already on `createRoot`, all imports from `@wordpress/element`)
- No dependency version changes (React 18.3.1 already installed)
- No `flushSync` — unnecessary with the separate active field store approach
- No new React 18 features (Suspense for data fetching, useTransition, etc.)

## Verification

1. Run `pnpm run build` to confirm the app compiles
2. Manual test: click to expand field settings for various field types — verify no flickering
3. Manual test: add new fields, duplicate fields, delete fields — verify smooth transitions
4. Manual test: hover over fields, nested groups — verify toolbar, outline, and resize handle show correctly without re-renders
5. Manual test: resize panels, switch between Fields/PHP/Theme Code tabs
