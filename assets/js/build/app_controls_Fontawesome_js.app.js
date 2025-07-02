"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Fontawesome_js"],{

/***/ "./app/controls/Fontawesome.js":
/*!*************************************!*\
  !*** ./app/controls/Fontawesome.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");


const FontAwesome = ({
  name,
  componentId,
  defaultValue,
  updateField,
  ...rest
}) => {
  const handleChange = e => updateField(name, e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_1__["default"], {
    htmlFor: componentId,
    className: "og-icon",
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-icon-selected"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `icon-fontawesome ${defaultValue}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "og-icon-search",
    defaultValue: defaultValue,
    onChange: handleChange
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FontAwesome);

/***/ })

}]);
//# sourceMappingURL=app_controls_Fontawesome_js.app.js.map