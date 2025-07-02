"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Post_js"],{

/***/ "./app/components/Editor/FieldTypePreview/ObjectField.js":
/*!***************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/ObjectField.js ***!
  \***************************************************************/
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




const ObjectField = ({
  field,
  defaultPlaceholder,
  defaultItemTitle
}) => {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const type = field.field_type || 'select_advanced';

  // Don't change field directly as it can fill the field settings inputs.
  const normalizedField = {
    ...field,
    class: `${field.class || ''} rwmb-${type}`,
    placeholder: field.placeholder || defaultPlaceholder,
    options: `${defaultItemTitle} 1 \n${defaultItemTitle} 2 \n${defaultItemTitle} 3`
  };
  const FieldType = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__("./app/components/Editor/FieldTypePreview lazy recursive ^\\.\\/.*$")(`./${(0,_functions__WEBPACK_IMPORTED_MODULE_3__.ucwords)(type, '_', '')}`));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (ref.current) {
      ref.current.querySelector('.select2-container')?.remove();
    }
  }, [type]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
    fallback: null
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: ref
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldType, {
    field: normalizedField
  }), field.add_new && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "rwmb-modal-add-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add new', 'meta-box-builder'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObjectField);

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/Post.js":
/*!********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Post.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ObjectField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectField */ "./app/components/Editor/FieldTypePreview/ObjectField.js");



const Post = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ObjectField__WEBPACK_IMPORTED_MODULE_2__["default"], {
  field: field,
  defaultPlaceholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a post', 'meta-box-builder'),
  defaultItemTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post title', 'meta-box-builder')
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Post);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Post_js.app.js.map