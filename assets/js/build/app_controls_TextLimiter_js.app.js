"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_TextLimiter_js"],{

/***/ "./app/controls/TextLimiter.js":
/*!*************************************!*\
  !*** ./app/controls/TextLimiter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");



const TextLimiter = ({
  defaultValue,
  componentId,
  updateField,
  ...rest
}) => {
  const updateLimit = e => updateField('text_limiter.limit', e.target.value);
  const updateType = e => updateField('text_limiter.limit_type', e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-input-group og-input-group--small"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    min: "0",
    id: componentId,
    defaultValue: defaultValue.limit,
    onChange: updateLimit
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    defaultValue: defaultValue.limit_type || '',
    onChange: updateType
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "character"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('characters', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "word"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('words', 'meta-box-builder')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextLimiter);

/***/ })

}]);
//# sourceMappingURL=app_controls_TextLimiter_js.app.js.map