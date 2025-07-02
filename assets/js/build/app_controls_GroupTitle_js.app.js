"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_GroupTitle_js"],{

/***/ "./app/controls/GroupTitle.js":
/*!************************************!*\
  !*** ./app/controls/GroupTitle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useSettings */ "./app/hooks/useSettings.js");
/* harmony import */ var _list_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../list-functions */ "./app/list-functions.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");
/* harmony import */ var _FieldInserter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FieldInserter */ "./app/controls/FieldInserter.js");






const GroupTitle = ({
  name,
  componentId,
  field,
  updateField,
  ...rest
}) => {
  const {
    getPrefix
  } = (0,_hooks_useSettings__WEBPACK_IMPORTED_MODULE_2__["default"])();
  let fields = (0,_list_functions__WEBPACK_IMPORTED_MODULE_3__["default"])(field._id)(state => state.fields);
  const ignoreTypes = ['background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group'];
  fields = fields.filter(f => !ignoreTypes.includes(f.type)).map(f => [f.id, `${f.name} (${f.id})`]);
  fields = [['{#}', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Entry index (#)', 'meta-box-builder')], ...fields];
  const handleChange = (inputRef, value) => updateField('group_title', value);
  const handleSelectItem = (inputRef, value) => {
    const title = value === '{#}' ? value : `{${getPrefix()}${value}}`;
    inputRef.current.value += title;
    updateField('group_title', inputRef.current.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "og-group-title",
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FieldInserter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: componentId,
    defaultValue: field.group_title,
    items: fields,
    onChange: handleChange,
    onSelect: handleSelectItem
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupTitle);

/***/ })

}]);
//# sourceMappingURL=app_controls_GroupTitle_js.app.js.map