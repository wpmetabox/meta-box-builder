"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Heading_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Heading.js":
/*!***********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Heading.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Elements_FieldLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Elements/FieldLabel */ "./app/components/Editor/FieldTypePreview/Elements/FieldLabel.js");



const Heading = ({
  field,
  updateField
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, field.name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Elements_FieldLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
  field: field,
  updateField: updateField
})), field.desc && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
  className: "description"
}, field.desc));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Heading, (prev, next) => prev.field.name === next.field.name && prev.field.desc === next.field.desc));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Heading_js.app.js.map