"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Required_js"],{

/***/ "./app/controls/Required.js":
/*!**********************************!*\
  !*** ./app/controls/Required.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Required = ({
  name,
  label,
  defaultValue,
  updateField,
  ...rest
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
  className: "og-status"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "checkbox",
  name: name,
  checked: defaultValue,
  value: true,
  onChange: e => updateField(name, e.target.checked)
}), label);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Required);

/***/ })

}]);
//# sourceMappingURL=app_controls_Required_js.app.js.map