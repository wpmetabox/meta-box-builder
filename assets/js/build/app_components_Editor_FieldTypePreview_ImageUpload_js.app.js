"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_ImageUpload_js"],{

/***/ "./app/components/Editor/FieldTypePreview/FileUpload.js":
/*!**************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/FileUpload.js ***!
  \**************************************************************/
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



const FileUpload = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, field.max_status && field.max_file_uploads > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-media-status"
}, "0/", field.max_file_uploads, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('files', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-upload-area"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-upload-inside"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Drop files here to upload', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('or', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
  className: "rwmb-browse-button browser button button-hero"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Files', 'meta-box-builder')))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(FileUpload, (prev, next) => prev.field.max_status === next.field.max_status && prev.field.max_file_uploads === next.field.max_file_uploads));

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/ImageUpload.js":
/*!***************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/ImageUpload.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _FileUpload__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _FileUpload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileUpload */ "./app/components/Editor/FieldTypePreview/FileUpload.js");


/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_ImageUpload_js.app.js.map