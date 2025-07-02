"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_Validation_js"],{

/***/ "./app/controls/Validation.js":
/*!************************************!*\
  !*** ./app/controls/Validation.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions */ "./app/functions.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");





const Validation = ({
  defaultValue,
  name,
  updateField,
  ...rest
}) => {
  const rules = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.maybeArrayToObject)(defaultValue, 'id');
  const addRule = () => {
    const newRule = {
      name: 'required',
      value: true,
      message: '',
      id: (0,_functions__WEBPACK_IMPORTED_MODULE_3__.uniqid)()
    };
    updateField(name, {
      ...rules,
      [newRule.id]: newRule
    });
  };
  const removeRule = id => {
    const newRules = {
      ...rules
    };
    delete newRules[id];
    updateField(name, newRules);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "og-include-exclude",
    ...rest
  }, Object.values(rules).map(rule => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Rule, {
    key: rule.id,
    rule: rule,
    removeRule: removeRule,
    updateField: updateField
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: addRule,
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add Rule', 'meta-box-builder')
  }));
};
const Rule = ({
  rule,
  removeRule,
  updateField
}) => {
  const update = key => e => updateField(`validation.${rule.id}.${key}`, e.target.value);
  const updateName = e => {
    updateField(`validation.${rule.id}.name`, e.target.value);
    if (['required', 'email', 'url', 'date', 'dateISO', 'number', 'digits', 'creditcard', 'phoneUS'].includes(e.target.value)) {
      updateField(`validation.${rule.id}.value`, true);
    } else {
      updateField(`validation.${rule.id}.value`, '');
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-include-exclude__rule"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "og-include-exclude__name",
    defaultValue: rule.name,
    onChange: updateName
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "required"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Required', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "minlength"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Min length', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "maxlength"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max length', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "rangelength"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Range length', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "min"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Min value', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "max"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max value', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "range"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Range', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "step"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Step', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "email"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Email', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "url"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('URL', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "date"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Date', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "dateISO"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ISO date', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "number"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Decimal number', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "digits"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Digits only', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "creditcard"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Credit card number', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "phoneUS"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('US phone number', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "accept"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('MIME types', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "extension"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('File extensions', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "equalTo"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Equals to another field', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "remote"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remote', 'meta-box-builder'))), ['minlength', 'maxlength', 'min', 'max', 'step', 'accept', 'extension', 'equalTo', 'remote'].includes(rule.name) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    defaultValue: rule.value,
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter a value', 'meta-box-builder'),
    onChange: update('value')
  }), ['rangelength', 'range'].includes(rule.name) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    defaultValue: rule.value,
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ex. 2,6', 'meta-box-builder'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Separate values by a comma', 'meta-box-builder'),
    onChange: update('value')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    defaultValue: rule.message,
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom error message', 'meta-box-builder'),
    onChange: update('message')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "link",
    isDestructive: true,
    onClick: () => removeRule(rule.id),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'meta-box-builder')
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validation);

/***/ })

}]);
//# sourceMappingURL=app_controls_Validation_js.app.js.map