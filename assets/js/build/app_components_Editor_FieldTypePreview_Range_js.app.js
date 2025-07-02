"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Range_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Range.js":
/*!*********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Range.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");



const Range = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-range-inner"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "range",
  value: field.std || '',
  min: field.min || 0,
  max: field.max || 10,
  onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "rwmb-range-output"
}, field.std));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Range, (prev, next) => prev.field.std === next.field.std && prev.field.min === next.field.min && prev.field.max === next.field.max));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Range_js.app.js.map