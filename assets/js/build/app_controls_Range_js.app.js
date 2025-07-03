"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Range_js"],{

/***/ "./app/controls/Range.js":
/*!*******************************!*\
  !*** ./app/controls/Range.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");



const Range = ({
  name,
  defaultValue,
  updateField,
  ...rest
}) => {
  const update = value => updateField(name, value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    min: 1,
    max: 12,
    initialPosition: 12,
    value: defaultValue,
    onChange: update
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Range);

/***/ })

}]);
//# sourceMappingURL=app_controls_Range_js.app.js.map