"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Textarea_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Textarea.js":
/*!************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Textarea.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");



const Textarea = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
  placeholder: field.placeholder,
  cols: field.cols,
  rows: field.rows,
  value: field.std || '',
  onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Textarea, (prev, next) => prev.field.placeholder === next.field.placeholder && prev.field.cols === next.field.cols && prev.field.rows === next.field.rows && prev.field.std === next.field.std));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Textarea_js.app.js.map