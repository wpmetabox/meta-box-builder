"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_AdminColumnsPosition_js"],{

/***/ "./app/controls/AdminColumnsPosition.js":
/*!**********************************************!*\
  !*** ./app/controls/AdminColumnsPosition.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useAllFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useAllFields */ "./app/hooks/useAllFields.js");
/* harmony import */ var _hooks_useSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useSettings */ "./app/hooks/useSettings.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");
/* harmony import */ var _FieldInserter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FieldInserter */ "./app/controls/FieldInserter.js");






const AdminColumnsPosition = ({
  componentId,
  defaultValue,
  updateField,
  ...rest
}) => {
  const {
    getObjectType
  } = (0,_hooks_useSettings__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const objectType = getObjectType();
  const defaultColumns = {
    term: 'name',
    user: 'username'
  };
  const defaultColumn = defaultColumns[objectType] || 'title';

  // Select only text and select fields.
  let fields = (0,_hooks_useAllFields__WEBPACK_IMPORTED_MODULE_2__["default"])().filter(field => ['text', 'select'].includes(field.type)).map(field => [field.id, `${field.name} (${field.id})`]);
  fields = [...objectTypeFields(objectType), ...fields];
  const handleChangeType = e => updateField('admin_columns.position.type', e.target.value);
  const handleChangeColumn = (inputRef, value) => updateField('admin_columns.position.column', value);
  const handleSelectColumn = (inputRef, value) => {
    inputRef.current.value = value;
    updateField('admin_columns.position.column', value);
  };
  let type;
  let column;
  if (typeof defaultValue === 'string') {
    const parts = defaultValue.split(' ');
    type = parts[0] || 'after';
    column = parts[1] || defaultColumn;
  } else {
    type = defaultValue.type || 'after';
    column = defaultValue.column || defaultColumn;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    defaultValue: type,
    onChange: handleChangeType
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "after"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('After', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "before"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "replace"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace', 'meta-box-builder'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FieldInserter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: componentId,
    defaultValue: column,
    items: fields,
    isID: true,
    exclude: objectTypeFields(objectType),
    onChange: handleChangeColumn,
    onSelect: handleSelectColumn
  }));
};
const objectTypeFields = objectType => {
  if (objectType === 'term') {
    return [['cb', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Checkbox', 'meta-box-builder')], ['name', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'meta-box-builder')], ['description', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description', 'meta-box-builder')], ['slug', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slug', 'meta-box-builder')], ['count', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Count', 'meta-box-builder')]];
  }
  if (objectType === 'user') {
    return [['cb', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Checkbox', 'meta-box-builder')], ['username', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Username', 'meta-box-builder')], ['name', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'meta-box-builder')], ['email', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email', 'meta-box-builder')], ['role', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Role', 'meta-box-builder')], ['posts', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Posts', 'meta-box-builder')]];
  }
  return [['cb', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Checkbox', 'meta-box-builder')], ['title', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'meta-box-builder')], ['author', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Author', 'meta-box-builder')], ['categories', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Categories', 'meta-box-builder')], ['tags', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tags', 'meta-box-builder')], ['comments', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Comments', 'meta-box-builder')], ['date', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'meta-box-builder')]];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminColumnsPosition);

/***/ })

}]);
//# sourceMappingURL=app_controls_AdminColumnsPosition_js.app.js.map