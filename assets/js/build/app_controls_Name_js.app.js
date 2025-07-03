"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Name_js"],{

/***/ "./app/controls/Name.js":
/*!******************************!*\
  !*** ./app/controls/Name.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions */ "./app/functions.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");




const Name = ({
  componentId,
  field,
  updateField,
  ...rest
}) => {
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const handleChange = e => {
    const value = e.target.value;
    updateField('name', value);

    // Only generate ID if it's a new field and hasn't been manually changed
    if (field._new && !field._id_changed && !['custom_html', 'divider', 'heading'].includes(field.type)) {
      updateField('id', (0,_functions__WEBPACK_IMPORTED_MODULE_2__.sanitizeId)(value));
    }
  };

  // When done updating "name", don't auto generate ID.
  const stopGeneratingId = () => updateField('_id_changed', true);

  // Use ref to manually update its value, avoid React touching the input value directly to avoid cursor jumping to the start.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (inputRef.current && inputRef.current.value !== field.name) {
      inputRef.current.value = field.name || '';
    }
  }, [field.name]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: inputRef,
    type: "text",
    id: componentId,
    defaultValue: field.name || '',
    onBlur: stopGeneratingId,
    onChange: handleChange
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Name);

/***/ })

}]);
//# sourceMappingURL=app_controls_Name_js.app.js.map