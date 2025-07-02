"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Icon_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Icon.js":
/*!********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Icon.js ***!
  \********************************************************/
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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");




const Icon = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
  value: field.std || '',
  onChange: _functions__WEBPACK_IMPORTED_MODULE_3__.doNothing
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  value: ""
}, field.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select an icon', 'meta-box-builder')), field.std && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  value: field.std
}, field.std));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Icon, (prev, next) => prev.field.std === next.field.std && prev.field.placeholder === next.field.placeholder));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Icon_js.app.js.map