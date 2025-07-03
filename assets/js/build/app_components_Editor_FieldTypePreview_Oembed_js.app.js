"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Oembed_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Oembed.js":
/*!**********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Oembed.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Text__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ "./app/components/Editor/FieldTypePreview/Text.js");
// Just the same as Text


/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/Text.js":
/*!********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Text.js ***!
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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");



const Text = ({
  field,
  type = "text"
}) => {
  const prepend = field.prepend && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.prepend);
  const append = field.append && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.append);
  const input = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: type,
    placeholder: field.placeholder,
    size: field.size,
    value: field.std || '',
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  });
  return prepend || append ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-input-group"
  }, prepend, input, append) : input;
};

// Memo to avoid re-rendering because there might be a lot of fields with this field type.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Text, (prev, next) => prev.type === next.type && prev.field.prepend === next.field.prepend && prev.field.append === next.field.append && prev.field.placeholder === next.field.placeholder && prev.field.size === next.field.size && prev.field.std === next.field.std));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Oembed_js.app.js.map