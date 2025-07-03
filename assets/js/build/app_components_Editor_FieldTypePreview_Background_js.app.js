"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Background_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Background.js":
/*!**************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Background.js ***!
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
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Color */ "./app/components/Editor/FieldTypePreview/Color.js");
/* harmony import */ var _FileInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileInput */ "./app/components/Editor/FieldTypePreview/FileInput.js");
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select */ "./app/components/Editor/FieldTypePreview/Select.js");






const Background = ({
  field
}) => {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const colorField = {};
  const imageField = {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Image', 'meta-box-builder')
  };
  const repeatField = {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('-- Repeat --', 'meta-box-builder')
  };
  const positionField = {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('-- Position --', 'meta-box-builder')
  };
  const attachField = {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('-- Attachment --', 'meta-box-builder')
  };
  const sizeField = {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('-- Size --', 'meta-box-builder')
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-background-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    field: colorField
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-background-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FileInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
    field: imageField
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-background-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    field: repeatField
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    field: positionField
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    field: attachField
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    field: sizeField
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Background);

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/Color.js":
/*!*********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Color.js ***!
  \*********************************************************/
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



const Color = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "wp-picker-container"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
  type: "button",
  className: "button wp-color-result",
  style: {
    backgroundColor: field.std || ''
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "wp-color-result-text"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Color', 'meta-box-builder'))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Color, (prev, next) => prev.field.std === next.field.std));

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/FileInput.js":
/*!*************************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/FileInput.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text */ "./app/components/Editor/FieldTypePreview/Text.js");



const FileInput = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "rwmb-file-input-inner"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Text__WEBPACK_IMPORTED_MODULE_2__["default"], {
  field: field
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
  href: "#",
  className: "rwmb-file-input-select button"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select', 'meta-box-builder')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileInput);

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/Select.js":
/*!**********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Select.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions */ "./app/functions.js");



const Select = ({
  field
}) => field.multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MultipleSelect, {
  field: field
}) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SingleSelect, {
  field: field
});
const MultipleSelect = ({
  field
}) => {
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.options || '');
  let std = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.std || '').map(option => option.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    multiple: true,
    value: std,
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  }, options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: option.value,
    value: option.value
  }, option.label))), field.select_all_none && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-select-all-none"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select:', 'meta-box-builder'), " \xA0", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All', 'meta-box-builder')), " | ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('None', 'meta-box-builder'))));
};
const SingleSelect = ({
  field
}) => {
  if (field.placeholder) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, field.placeholder));
  }
  const options = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.options || '');
  let std = (0,_functions__WEBPACK_IMPORTED_MODULE_2__.getFullOptions)(field.std || '').map(option => option.value);
  std = std[0];

  // For field preview: don't need to render all options.
  // Only render the selected option or the first option if nothing is selected.
  const selectedOption = options.find(option => option.value === std);
  const renderedOption = selectedOption ? selectedOption.label : options.length > 0 ? options[0].label : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    value: "",
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, renderedOption));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ "./app/components/Editor/FieldTypePreview/Text.js":
/*!********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Text.js ***!
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



const Text = ({
  field,
  type = "text"
}) => {
  const prepend = field.prepend && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.prepend);
  const append = field.append && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-input-group-text"
  }, field.append);
  const input = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: type,
    placeholder: field.placeholder,
    size: field.size,
    value: field.std || '',
    onChange: _functions__WEBPACK_IMPORTED_MODULE_2__.doNothing
  });
  return prepend || append ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-input-group"
  }, prepend, input, append) : input;
};

// Memo to avoid re-rendering because there might be a lot of fields with this field type.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(Text, (prev, next) => prev.type === next.type && prev.field.prepend === next.field.prepend && prev.field.append === next.field.append && prev.field.placeholder === next.field.placeholder && prev.field.size === next.field.size && prev.field.std === next.field.std));

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Background_js.app.js.map