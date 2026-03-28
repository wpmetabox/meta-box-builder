# React 18 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the main Meta Box Builder app from React 17 `render()` API to React 18 `createRoot()` API, eliminating the field-settings panel flickering issue.

**Architecture:** Four targeted changes: (1) fix inconsistent imports, (2) refactor `setFieldActive` to batch zustand updates per store, (3) add `flushSync` around critical field-expand/delete paths, (4) switch `render` to `createRoot` in entry point.

**Tech Stack:** React 18.3.1 (via `@wordpress/element`), Zustand 4.x, `@wordpress/scripts` 27.x

---

## Files Modified

| File | Change |
|------|--------|
| `assets/app/controls/AdminCloumnsWidth.js:1` | Fix import source |
| `assets/app/hooks/useVerticalResizable.js:1` | Fix import source |
| `assets/app/hooks/useResizable.js:1` | Fix import source |
| `assets/app/list-functions.js` | Refactor `setFieldActive` + add `flushSync` |
| `assets/app/App.js` | Switch `render` → `createRoot` |

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

### Task 2: Refactor `setFieldActive` to batch updates per store

**Files:**
- Modify: `assets/app/list-functions.js:317-333`

- [ ] **Step 1: Replace `setFieldActive` function**

Replace the current implementation (lines 317-333) with:

```js
export const setFieldActive = fieldId => {
	// Group field updates by store to batch them into a single set() call per store.
	const storeUpdates = new Map();

	for ( const [ storeId, store ] of lists ) {
		const fields = store.getState().fields;
		const updatedFields = fields.map( field => {
			if ( field._id === fieldId && !field._active ) {
				return { ...field, _active: true };
			}
			if ( field._id !== fieldId && field._active ) {
				return { ...field, _active: false };
			}
			return field;
		} );

		// Only update if something changed.
		if ( updatedFields.some( ( f, i ) => f._active !== fields[ i ]._active ) ) {
			storeUpdates.set( storeId, updatedFields );
		}
	}

	// Apply all updates.
	for ( const [ storeId, updatedFields ] of storeUpdates ) {
		lists.get( storeId ).setState( { fields: updatedFields } );
	}
};
```

Key changes:
- Iterates per store instead of per individual field
- Batches all `_active` changes for a store into a single `setState()` call
- Only updates stores that actually have changes (avoids unnecessary re-renders)
- Eliminates the expensive `findFieldList` → `updateField` loop (which called `set()` N times)

- [ ] **Step 2: Commit**

```bash
git add assets/app/list-functions.js
git commit -m "perf: batch setFieldActive updates per zustand store"
```

---

### Task 3: Add `flushSync` around critical paths

**Files:**
- Modify: `assets/app/list-functions.js` (import + `addFieldAt` + `removeField`)

- [ ] **Step 1: Add `flushSync` to imports**

At the top of `list-functions.js`, add `flushSync` to the existing `@wordpress/element` import (or add a new import if none exists). Currently the file does not import from `@wordpress/element` — add:

```js
import { flushSync } from '@wordpress/element';
```

Place this after the existing imports at the top of the file (after line 6).

- [ ] **Step 2: Wrap `addFieldAt` critical section with `flushSync`**

Change lines 62-63 from:
```js
			setFieldActive( newField._id );
			setNavPanel( 'field-settings' );
```
to:
```js
			flushSync( () => {
				setFieldActive( newField._id );
				setNavPanel( 'field-settings' );
			} );
```

- [ ] **Step 3: Wrap `removeField` critical section with `flushSync`**

Change lines 170-179 from:
```js
			if ( newActiveFieldId ) {
				// Set the new active field
				setFieldActive( newActiveFieldId );
			} else if ( isCurrentListGroup ) {
				// No fields left in group, set the group as active
				setFieldActive( currentState.id );
			} else {
				// Root list with no fields, set nav panel to field-group-settings
				setNavPanel( 'field-group-settings' );
			}
```
to:
```js
			flushSync( () => {
				if ( newActiveFieldId ) {
					setFieldActive( newActiveFieldId );
				} else if ( isCurrentListGroup ) {
					setFieldActive( currentState.id );
				} else {
					setNavPanel( 'field-group-settings' );
				}
			} );
```

- [ ] **Step 4: Commit**

```bash
git add assets/app/list-functions.js
git commit -m "fix: use flushSync for field add/delete to prevent flickering"
```

---

### Task 4: Switch `App.js` from `render` to `createRoot`

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

### Task 5: Build and verify

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
- [ ] Switch between Fields / PHP / Theme Code tabs
- [ ] Resize the nav panel (drag the resizer)
- [ ] Reorder fields via drag-and-drop

- [ ] **Step 3: Final commit (if any fixes needed)**

If manual testing reveals issues, fix and commit. Otherwise, the implementation is complete.
