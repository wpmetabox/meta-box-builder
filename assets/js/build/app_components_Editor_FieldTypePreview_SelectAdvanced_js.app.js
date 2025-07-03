"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_SelectAdvanced_js"],{

/***/ "./app/components/Editor/FieldTypePreview/SelectAdvanced.js":
/*!******************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/SelectAdvanced.js ***!
  \******************************************************************/
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




const SelectAdvanced = ({
  field
}) => {
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.getFullOptions)(field.options || '');
  let std = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.getFullOptions)(field.std || '').map(option => option.value);
  std = field.multiple ? std : std[0];
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const $select = jQuery(ref.current);

    // Remove previous select2 instance, like in "post" field, when changing field_type.
    $select.siblings('.select2-container').remove();
    $select.select2({
      allowClear: true,
      dropdownAutoWidth: true,
      placeholder: field.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select an item', 'meta-box-builder'),
      width: 'style'
    });
  }, [field.multiple, field.std, field.placeholder]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    multiple: field.multiple,
    ref: ref,
    value: std,
    onChange: _functions__WEBPACK_IMPORTED_MODULE_3__.doNothing
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, field.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select an item', 'meta-box-builder')), options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: option.value,
    value: option.value
  }, option.label))), field.multiple && field.select_all_none && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-select-all-none"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select:', 'meta-box-builder'), " \xA0", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'meta-box-builder')), " | ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'meta-box-builder'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectAdvanced);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_SelectAdvanced_js.app.js.map