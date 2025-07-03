"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_InputAttributes_js"],{

/***/ "./app/controls/InputAttributes.js":
/*!*****************************************!*\
  !*** ./app/controls/InputAttributes.js ***!
  \*****************************************/
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



const InputAttributes = ({
  defaultValue,
  updateField,
  ...rest
}) => {
  const update = key => e => updateField(key, e.target.checked);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-toggle-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: defaultValue.disabled,
    onChange: update('disabled')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-yes-alt"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled', 'meta-box-builder'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: defaultValue.readonly,
    onChange: update('readonly')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-yes-alt"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Readonly', 'meta-box-builder')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputAttributes);

/***/ })

}]);
//# sourceMappingURL=app_controls_InputAttributes_js.app.js.map