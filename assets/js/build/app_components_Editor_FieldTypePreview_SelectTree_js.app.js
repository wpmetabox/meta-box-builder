"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_SelectTree_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Select.js":
/*!**********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Select.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");



const Select = ({
  field
}) => field.multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MultipleSelect, {
  field: field
}) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SingleSelect, {
  field: field
});
const MultipleSelect = ({
  field
}) => {
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.options || '');
  let std = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.std || '').map(option => option.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    multiple: true,
    value: std,
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  }, options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: option.value,
    value: option.value
  }, option.label))), field.select_all_none && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-select-all-none"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select:', 'meta-box-builder'), " \xA0", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All', 'meta-box-builder')), " | ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('None', 'meta-box-builder'))));
};
const SingleSelect = ({
  field
}) => {
  if (field.placeholder) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, field.placeholder));
  }
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.options || '');
  let std = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.std || '').map(option => option.value);
  std = std[0];

  // For field preview: don't need to render all options.
  // Only render the selected option or the first option if nothing is selected.
  const selectedOption = options.find(option => option.value === std);
  const renderedOption = selectedOption ? selectedOption.label : options.length > 0 ? options[0].label : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    value: "",
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, renderedOption));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/SelectTree.js":
/*!**************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/SelectTree.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Select__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Select */ "./app/components/Editor/FieldTypePreview/Select.js");


/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_SelectTree_js.app.js.map