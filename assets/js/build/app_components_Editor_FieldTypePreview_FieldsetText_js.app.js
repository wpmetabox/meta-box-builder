"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_FieldsetText_js"],{

/***/ "./app/components/Editor/FieldTypePreview/FieldsetText.js":
/*!****************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/FieldsetText.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const FieldsetText = ({
  field
}) => {
  const options = Object.values(field.options || {});
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, field.desc && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, field.desc), options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    key: option.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, option.value), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldsetText);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_FieldsetText_js.app.js.map