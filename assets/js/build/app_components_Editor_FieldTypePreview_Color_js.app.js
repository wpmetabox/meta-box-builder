"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Color_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Color.js":
/*!*********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Color.js ***!
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



const Color = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "wp-picker-container"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
  type: "button",
  className: "button wp-color-result",
  style: {
    backgroundColor: field.std || ''
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "wp-color-result-text"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Color', 'meta-box-builder'))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Color, (prev, next) => prev.field.std === next.field.std));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Color_js.app.js.map