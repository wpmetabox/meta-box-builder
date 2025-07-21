# Overview

This task enhances the Field Groups admin list table by adding custom views (filters) for each mode.

---

# Prerequisite

- Check if either of the following extensions is active:
  - `mb-frontend-submission`
  - `mb-blocks`
- If **neither** is active, do nothing.
- If **either** is active, proceed with the tasks below.

---

# Tasks

## Task 1: Add custom views to the field group list table

- Add 3 views to the Field Group list table:
  - **Custom Fields**: shows field groups with `mode = custom-fields`, or mode is empty/null/not set
  - **Post Submission Forms**: shows field groups with `mode = post-submission-form`
  - **Blocks**: shows field groups with `mode = block`
- Remove default views **All**, **Published** and **Drafts**.
- (Optional) Set **Custom Fields** as the default view when no view is explicitly selected.
- Put the code in the `src/FieldGroupListTableViews.php` file

---

# Notes

- Ensure compatibility with WordPress list table filters and UI conventions.
