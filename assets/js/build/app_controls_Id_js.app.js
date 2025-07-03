"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Id_js"],{

/***/ "./app/controls/Id.js":
/*!****************************!*\
  !*** ./app/controls/Id.js ***!
  \****************************/
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
/* harmony import */ var _hooks_useFetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useFetch */ "./app/hooks/useFetch.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");





const Id = ({
  field,
  componentId,
  updateField,
  ...rest
}) => {
  const {
    data: ids
  } = (0,_hooks_useFetch__WEBPACK_IMPORTED_MODULE_3__.useFetch)({
    api: 'fields-ids',
    defaultValue: []
  });
  const [existingFieldGroup, setExistingFieldGroup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [duplicate, setDuplicate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handleChange = e => {
    updateField('id', e.target.value);
    updateField('_id_changed', true);
    checkDuplicateId(e.target.value);
  };
  const checkDuplicateId = value => {
    // Has a duplicate and not the current field
    if (ids[value] !== undefined && ids[value]?._id !== field._id) {
      setExistingFieldGroup(ids[value]);
      setDuplicate(true);
      return;
    }
    setExistingFieldGroup({});
    setDuplicate(false);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    htmlFor: componentId,
    ...rest
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: componentId,
    value: field.id,
    onChange: handleChange,
    pattern: "[A-Za-z0-9\\-_]+"
  }), duplicate && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, {
    className: "og-description og-error"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This ID already exists in the field group <a href="%s">%s</a>, please change it or edit that field group to avoid duplication.', 'meta-box-builder'), existingFieldGroup.link, existingFieldGroup.title)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Id);

/***/ })

}]);
//# sourceMappingURL=app_controls_Id_js.app.js.map