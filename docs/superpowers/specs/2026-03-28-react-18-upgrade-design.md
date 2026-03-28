# React 18 Upgrade Design

## Context

The main Meta Box Builder app (`assets/app/App.js`) uses the legacy `render()` API from `@wordpress/element` (React 17 style). The comment on line 38 says: _"Use React 17 to avoid flashing issues when click to expand field settings."_ `createRoot` was previously attempted but reverted due to whole-area flickering when expanding field settings.

React 18.3.1 is already installed via pnpm. The SettingsPage and Relationships sub-apps already use `createRoot` successfully. Only the main app needs upgrading.

## Root Cause

The flickering is likely caused by React 18's automatic batching. In `setFieldActive` (`list-functions.js:317-333`), the function iterates through all fields across multiple zustand stores and calls `updateField` per field. Each `updateField` triggers a zustand `set()` call. In React 17, these caused individual re-renders. In React 18, they batch together, which can briefly expose intermediate DOM states.

## Changes

### 1. `assets/app/App.js` — Switch to `createRoot`

- Replace `import { render } from "@wordpress/element"` with `import { createRoot } from "@wordpress/element"`
- Replace `render( <App />, container )` with `createRoot( container ).render( <App /> )`
- Remove the commented-out `createRoot` code and the "Use React 17" comment (lines 38-41)

### 2. `assets/app/list-functions.js` — Refactor `setFieldActive`

Refactor to batch all `_active` field updates into a single `set()` call per zustand store, instead of calling `updateField` per individual field.

Current approach (lines 317-333):
```js
export const setFieldActive = fieldId => {
    const list = findFieldList( fieldId );
    if ( list ) {
        list.getState().updateField( fieldId, '_active', true );
    }

    const allFields = [ ...lists.values() ].flatMap( store => store.getState().fields );
    allFields.forEach( field => {
        if ( field._id === fieldId || !field._active ) {
            return;
        }
        const list = findFieldList( field._id );
        if ( list ) {
            list.getState().updateField( field._id, '_active', false );
        }
    } );
};
```

New approach: iterate per store, batch all field updates for that store into a single `set()`.

### 3. `assets/app/list-functions.js` — `flushSync` on critical paths

- In `addFieldAt` (line 62-63): wrap `setFieldActive` + `setNavPanel` in `flushSync()` so DOM updates synchronously
- In `removeField` (line 170-178): wrap `setFieldActive` / `setNavPanel` in `flushSync()`
- Import `flushSync` from `@wordpress/element`

### 4. Fix direct `'react'` imports

Change 3 files that import from `'react'` to import from `@wordpress/element`:

| File | Line | Current Import |
|------|------|---------------|
| `assets/app/controls/AdminCloumnsWidth.js` | 1 | `import { useState } from 'react'` |
| `assets/app/hooks/useVerticalResizable.js` | 1 | `import { useEffect, useRef, useState } from 'react'` |
| `assets/app/hooks/useResizable.js` | 1 | `import { useEffect, useRef, useState } from 'react'` |

## Out of Scope

- No changes to SettingsPage or Relationships apps (already on `createRoot`)
- No dependency version changes (React 18.3.1 already installed)
- No new React 18 features (Suspense for data fetching, useTransition, etc.)

## Verification

1. Run `pnpm run build` to confirm the app compiles
2. Manual test: click to expand field settings for various field types — verify no flickering
3. Manual test: add new fields, duplicate fields, delete fields — verify smooth transitions
4. Manual test: resize panels, switch between Fields/PHP/Theme Code tabs
