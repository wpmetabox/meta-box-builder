"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_SelectWithInput_js"],{

/***/ "./app/controls/SelectWithInput.js":
/*!*****************************************!*\
  !*** ./app/controls/SelectWithInput.js ***!
  \*****************************************/
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chevron-down.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/close.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");






const SelectWithInput = ({
  componentId,
  name,
  options,
  defaultValue,
  updateField,
  ...rest
}) => {
  const [showOptions, setShowOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(defaultValue);
  const predefinedItem = Object.entries(options).find(item => item[0] === defaultValue);
  const isPredefined = predefinedItem !== undefined;
  const label = isPredefined ? predefinedItem[1] : '';
  const show = () => setShowOptions(true);
  const hide = () => setShowOptions(false);
  const toggle = () => setShowOptions(prev => !prev);
  const remove = e => {
    updateField(name, '');
    ref.current.focus();
    show();
    e.stopPropagation(); // Do not trigger "toggle" event on the parent div
  };
  const select = e => {
    hide();
    updateField(name, e.target.dataset.value);
  };
  const update = e => updateField(name, e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-select-with-input"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: name,
    defaultValue: defaultValue
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: ref,
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Please select or enter a value', 'meta-box-builder'),
    id: componentId,
    onFocus: show,
    value: value,
    onChange: update
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-select-with-input__icon",
    onClick: toggle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  })), isPredefined && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-select-with-input__selected",
    onClick: toggle
  }, label, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    size: "small",
    iconSize: 12,
    isDestructive: true,
    onClick: remove
  })), showOptions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-select-with-input__options"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a value below or type to enter a manual value.', 'meta-box-builder')), Object.entries(options).map(item => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: item[0],
    className: `og-select-with-input__option ${item[0] === defaultValue ? 'og-select-with-input__option--selected' : ''}`,
    "data-value": item[0],
    onClick: select
  }, item[1])))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectWithInput);

/***/ })

}]);
//# sourceMappingURL=app_controls_SelectWithInput_js.app.js.map