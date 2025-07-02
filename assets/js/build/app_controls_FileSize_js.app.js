"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_FileSize_js"],{

/***/ "./app/controls/FileSize.js":
/*!**********************************!*\
  !*** ./app/controls/FileSize.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");



const FileSize = ({
  defaultValue,
  componentId,
  name,
  updateField,
  ...rest
}) => {
  const [number, setNumber] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultValue.replace(/[^0-9]+/, '').trim());
  const [suffix, setSuffix] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultValue.replace(/[0-9]+/, '').trim() || 'kb');
  const updateNumber = e => {
    setNumber(e.target.value);
    const value = e.target.value && suffix ? `${e.target.value}${suffix}` : '';
    updateField(name, value);
  };
  const updateSuffix = e => {
    setSuffix(e.target.value);
    const value = number && e.target.value ? `${number}${e.target.value}` : '';
    updateField(name, value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-input-group og-input-group--small"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    min: "0",
    id: componentId,
    value: number,
    onChange: updateNumber
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    value: suffix,
    onChange: updateSuffix
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "kb"
  }, "KB"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "mb"
  }, "MB"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "gb"
  }, "GB"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileSize);

/***/ })

}]);
//# sourceMappingURL=app_controls_FileSize_js.app.js.map