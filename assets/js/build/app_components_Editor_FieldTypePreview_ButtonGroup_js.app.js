"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_ButtonGroup_js"],{

/***/ "./app/components/Editor/FieldTypePreview/ButtonGroup.js":
/*!***************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/ButtonGroup.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");


const ButtonGroup = ({
  field
}) => {
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_1__.getFullOptions)(field.options || '');
  const std = (0,_functions__WEBPACK_IMPORTED_MODULE_1__.getFullOptions)(field.std || '').map(option => option.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", {
    className: `rwmb-button-input-list ${field.inline === undefined || field.inline ? 'rwmb-inline' : ''}`
  }, options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: option.value,
    className: std.includes(option.value) ? "selected" : ""
  }, option.label)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonGroup);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_ButtonGroup_js.app.js.map