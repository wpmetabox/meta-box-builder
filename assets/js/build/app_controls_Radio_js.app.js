"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Radio_js"],{

/***/ "./app/controls/Radio.js":
/*!*******************************!*\
  !*** ./app/controls/Radio.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useToggle */ "./app/hooks/useToggle.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");





const Radio = ({
  componentId,
  label,
  name,
  options,
  defaultValue,
  updateField,
  ...rest
}) => {
  const toggle = (0,_hooks_useToggle__WEBPACK_IMPORTED_MODULE_3__.useToggle)(componentId);
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(defaultValue);

  // useEffect to make useToggle work AFTER DOM is changed.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    toggle();
    updateField(name, value);
  }, [value]);
  const radioOpions = Object.entries(options).map(([value, label]) => ({
    value,
    label
  }));

  // Use a hidden controlled input to make useToggle work.
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: label,
    onChange: setValue,
    options: radioOpions,
    selected: value
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    id: componentId,
    value: value
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Radio);

/***/ })

}]);
//# sourceMappingURL=app_controls_Radio_js.app.js.map