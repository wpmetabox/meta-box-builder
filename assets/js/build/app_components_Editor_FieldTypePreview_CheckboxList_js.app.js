"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_CheckboxList_js"],{

/***/ "./app/components/Editor/FieldTypePreview/CheckboxList.js":
/*!****************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/CheckboxList.js ***!
  \****************************************************************/
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



const CheckboxList = ({
  field
}) => {
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.options || '');
  const std = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.std || '').map(option => option.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, field.select_all_none && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "rwmb-toggle-all-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "rwmb-input-list-select-all-none button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle All', 'meta-box-builder'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", {
    className: `rwmb-input-list ${field.inline ? 'rwmb-inline' : ''}`
  }, options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: option.value
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: std.includes(option.value),
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  }), option.label))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxList);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_CheckboxList_js.app.js.map