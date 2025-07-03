"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_InputGroup_js"],{

/***/ "./app/controls/InputGroup.js":
/*!************************************!*\
  !*** ./app/controls/InputGroup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");


const InputGroup = ({
  label1,
  label2,
  key1,
  key2,
  defaultValue,
  componentId,
  updateField,
  ...rest
}) => {
  const update = key => e => updateField(key, e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-input-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `${componentId}-${key1}`
  }, label1), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: `${componentId}-${key1}`,
    defaultValue: defaultValue[key1],
    onChange: update(key1)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `${componentId}-${key2}`
  }, label2), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: `${componentId}-${key2}`,
    defaultValue: defaultValue[key2],
    onChange: update(key2)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputGroup);

/***/ })

}]);
//# sourceMappingURL=app_controls_InputGroup_js.app.js.map