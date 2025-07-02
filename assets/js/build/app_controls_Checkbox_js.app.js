"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Checkbox_js"],{

/***/ "./app/controls/Checkbox.js":
/*!**********************************!*\
  !*** ./app/controls/Checkbox.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/useToggle */ "./app/hooks/useToggle.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");



const Checkbox = ({
  name,
  componentId,
  label,
  className,
  defaultValue,
  updateField,
  ...rest
}) => {
  const toggleDependencies = (0,_hooks_useToggle__WEBPACK_IMPORTED_MODULE_1__.useToggle)(componentId);
  const handleChange = e => {
    toggleDependencies();
    updateField(name, e.target.checked);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    className: `og-field--checkbox ${className}`,
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "og-toggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    id: componentId,
    onChange: handleChange,
    defaultChecked: defaultValue
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-toggle__switch"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkbox);

/***/ })

}]);
//# sourceMappingURL=app_controls_Checkbox_js.app.js.map