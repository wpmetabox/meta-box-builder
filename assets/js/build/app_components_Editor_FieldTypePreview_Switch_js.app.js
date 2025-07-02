"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Switch_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Switch.js":
/*!**********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Switch.js ***!
  \**********************************************************/
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



const Switch = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
  className: `rwmb-switch-label rwmb-switch-label--${field.style || 'rounded'}`
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  className: "rwmb-switch",
  type: "checkbox",
  checked: !!field.std,
  onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-switch-status"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "rwmb-switch-slider"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "rwmb-switch-on"
}, field.on_label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "rwmb-switch-off"
}, field.off_label)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Switch, (prev, next) => prev.field.style === next.field.style && prev.field.on_label === next.field.on_label && prev.field.off_label === next.field.off_label && prev.field.std === next.field.std));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Switch_js.app.js.map