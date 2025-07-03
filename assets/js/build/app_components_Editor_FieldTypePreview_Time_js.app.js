"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Time_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Time.js":
/*!********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Time.js ***!
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



const Time = ({
  field
}) => {
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const inlineRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!inlineRef.current) {
      return;
    }
    const $ = jQuery;
    const $inline = $(inlineRef.current);
    $inline.timepicker({
      showButtonPanel: true,
      oneLine: true,
      controlType: 'select',
      altFieldTimeOnly: false
    });
  }, [field.inline]);
  const prepend = field.prepend && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.prepend);
  const append = field.append && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.append);
  const input = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: inputRef,
    type: "text",
    placeholder: field.placeholder,
    size: field.size,
    value: field.std || '',
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, prepend || append ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-input-group"
  }, prepend, input, append) : input, field.inline && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: inlineRef,
    className: "rwmb-datetime-inline"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Time);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Time_js.app.js.map