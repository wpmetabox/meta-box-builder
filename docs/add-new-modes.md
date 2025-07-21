# Overview

This task introduces 3 configurable modes to the plugin: **Post Submission Form**, **Custom Fields**, and **Block**. Each mode will automatically configure default field settings and behavior in the field group editor.

> ⚙️ Ensure the implementation is extensible so future modes can be added with minimal effort. Use a config-driven structure instead of hardcoded conditionals wherever possible.

---

# Prerequisite

- Check whether the `mb-frontend-submission` or `mb-blocks` extension is active.
- If **neither** is active, exit without making any changes.
- If **either** is active, proceed with the tasks described below.

---

# Tasks

## Task 1: Display a Modal for Selecting Mode on “Add New” Field Group Screen

- Intercept the default behavior of the **“Add New”** button on the Field Groups screen. Do not allow immediate redirection.
- Instead, display a modal. You may use **vanilla JS (preferred)** or **React**. If using React, use the [`Modal`](https://wordpress.github.io/gutenberg/?path=/docs/components-modal--docs) component from `@wordpress/components`.
- Inside the modal, display 3 clickable blocks for the 3 modes:
  - **Custom Fields** (always visible)
  - **Post Submission Form** (only if the `mb-frontend-submission` extension is active)
  - **Block** (only if the `mb-blocks` extension is active)
- Each block must include:
  - A title
  - An SVG icon
  - A clickable `<a>` element that links to:
    `wp-admin/post-new.php?post_type=meta-box&settings[mode]=${mode}`
    where `${mode}` is one of: `post-submission-form`, `custom-fields`, or `block`.
- **Organize the implementation into separate files** for:
  - JavaScript (modal logic, DOM)
  - CSS (styling for modal and blocks)
  - PHP (enqueueing scripts/styles, rendering template if needed)
- Put **all related code** (JS, CSS, and PHP) inside the folder:
  `src/AddNewFieldGroup/`

---

## Task 2: Handle `mode` Parameter on Add/Edit Field Group Screen

- Update the `updateNewPostUrl` function in `functions.js` to **preserve additional query parameters**.
- If the `settings[mode]` parameter is present in the URL, check if it's automatically stored in the **field group settings context**.

---

## Task 3: Apply UI Behavior Based on Mode

### 🟢 `mode = custom-fields`
- No changes needed.

---

### 🟦 `mode = post-submission-form`

In `FieldGroupSettingsPanel.js` and child components:

- Set the `objectType` to `post`, and **hide all other options** in the `Location` component.
- Hide the following components:
  - `IncludeExclude`
  - `ShowHide`
  - `ConditionalLogic`

In `Extensions/FrontendSubmission.php`:

- Register a new field type **category**: `Post Fields`, and display it **first** in the list of field categories.
- Add the following predefined fields under `Post Fields`:

| Field Type       | Underlying Field | Default Name     | Default ID      |
|------------------|------------------|------------------|-----------------|
| Post Title       | `text`           | Post title       | `post_title`    |
| Post Content     | `wysiwyg`        | Post content     | `post_content`  |
| Post Excerpt     | `textarea`       | Post excerpt     | `post_excerpt`  |
| Post Date        | `datetime`       | Post date        | `post_date`     |
| Post Thumbnail   | `image`          | Post image       | `post_image`    |

- For each field:
  - Use the same controls as the original field type.
  - Auto-fill the `name` and `id`.
  - **Prevent changes to the `id` field** by disabling the `Id` input in the field preview
  - Hide the `Id` control in field settings panel

---

### 🟥 `mode = block`

In `FieldGroupSettingsPanel.js` and child components:

- Set the `objectType` to `block`
- Hide the `Location` component.

---

# ✅ Acceptance Criteria

### Task 1:
- Modal appears instead of redirecting on "Add New" button click
- Mode blocks show/hide correctly based on active extensions
- Links have correct `settings[mode]` query parameter

### Task 2:
- `mode` is persisted in context and retained during save
- No query parameters are removed from URL

### Task 3:
- UI is adjusted based on selected mode
- Required fields are added automatically for `post-submission-form`
- Protected `id` fields are truly non-editable
