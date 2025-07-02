"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_AddressField_js"],{

/***/ "./app/controls/AddressField.js":
/*!**************************************!*\
  !*** ./app/controls/AddressField.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useAllFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/useAllFields */ "./app/hooks/useAllFields.js");
/* harmony import */ var _hooks_useSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useSettings */ "./app/hooks/useSettings.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");
/* harmony import */ var _FieldInserter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FieldInserter */ "./app/controls/FieldInserter.js");





const AddressField = ({
  componentId,
  placeholder,
  defaultValue,
  updateField,
  ...rest
}) => {
  const {
    getPrefix
  } = (0,_hooks_useSettings__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Select only text and select fields.
  const fields = (0,_hooks_useAllFields__WEBPACK_IMPORTED_MODULE_1__["default"])().filter(field => ['text', 'select'].includes(field.type)).map(field => [field.id, `${field.name} (${field.id})`]);
  const handleChange = (inputRef, value) => updateField('address_field', value);
  const handleSelect = (inputRef, value) => {
    const address = !inputRef.current.value ? '' : inputRef.current.value + ',';
    inputRef.current.value = address + `${getPrefix() || ''}${value}`;
    updateField('address_field', inputRef.current.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FieldInserter__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: componentId,
    defaultValue: defaultValue,
    placeholder: placeholder,
    required: true,
    items: fields,
    onChange: handleChange,
    onSelect: handleSelect
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressField);

/***/ })

}]);
//# sourceMappingURL=app_controls_AddressField_js.app.js.map