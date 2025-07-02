"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_TooltipSettings_js"],{

/***/ "./app/controls/TooltipSettings.js":
/*!*****************************************!*\
  !*** ./app/controls/TooltipSettings.js ***!
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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/settings.js");
/* harmony import */ var _DashiconPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DashiconPicker */ "./app/controls/DashiconPicker.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");







const TooltipSettings = ({
  componentId,
  defaultValue,
  updateField,
  ...rest
}) => {
  const enable = defaultValue.enable;
  const icon = defaultValue.icon || 'info';
  let isDashicons = false;
  if (!icon || ['info', 'help'].includes(icon) || icon.includes('dashicons')) {
    isDashicons = true;
  }
  const [icon_type, setIconType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(isDashicons ? 'dashicons' : 'url');
  const [showSettings, setShowSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const toggleEnable = e => {
    setShowSettings(e.target.checked);
    updateField('tooltip.enable', e.target.checked);
  };
  const toggleShowSettings = () => setShowSettings(prev => !prev);
  const updateIcon = value => updateField('tooltip.icon', value);
  const updatePosition = e => updateField('tooltip.position', e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_5__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    className: "og-with-toggle-sub-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "og-toggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    id: `${componentId}-enable`,
    onChange: toggleEnable,
    checked: enable
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-toggle__switch"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tooltip', 'meta-box-builder')), enable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
    size: "small",
    onClick: toggleShowSettings,
    isPressed: showSettings
  }))), showSettings && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "og-sub-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TooltipContent, {
    componentId: componentId,
    defaultValue: defaultValue,
    updateField: updateField
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon type', 'meta-box-builder')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    options: [{
      value: 'dashicons',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dashicons', 'meta-box-builder')
    }, {
      value: 'url',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom', 'meta-box-builder')
    }],
    onChange: setIconType,
    selected: icon_type
  })), icon_type === 'dashicons' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DashiconPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon', 'meta-box-builder'),
    defaultValue: isDashicons ? icon.replace('dashicons-', '') : '',
    componentId: `${componentId}-icon`,
    updateField: (name, value) => updateIcon(`dashicons-${value}`)
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    htmlFor: `${componentId}-url`,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon URL', 'meta-box-builder')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: `${componentId}-url`,
    value: isDashicons ? '' : icon,
    onChange: e => updateIcon(e.target.value)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Position, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Position', 'meta-box-builder'),
    defaultValue: defaultValue.position,
    onChange: updatePosition
  })));
};
const TooltipContent = ({
  componentId,
  defaultValue,
  updateField
}) => {
  const updateContent = e => updateField('tooltip.content', e.target.value);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    htmlFor: `${componentId}-content`,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Content', 'meta-box-builder')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: `${componentId}-content`,
    value: defaultValue?.content,
    onChange: updateContent
  }));
};
const Position = ({
  defaultValue = 'top',
  onChange,
  ...rest
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
  ...rest
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "og-toggle-group og-toggle-group--no-check"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "radio",
  value: "top",
  checked: "top" === defaultValue,
  onChange: onChange
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
  text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top', 'meta-box-builder'),
  delay: 0,
  placement: "bottom"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "currentColor",
  d: "M12.71 6.29a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42L11 9.41V21a1 1 0 0 0 2 0V9.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM19 2H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
})))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "radio",
  value: "bottom",
  checked: "bottom" === defaultValue,
  onChange: onChange
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
  text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'meta-box-builder'),
  delay: 0,
  placement: "bottom"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "currentColor",
  d: "M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Zm-7.71-2.29a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l4-4a1 1 0 0 0-1.42-1.42L13 14.59V3a1 1 0 0 0-2 0v11.59l-2.29-2.3a1 1 0 1 0-1.42 1.42Z"
})))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "radio",
  value: "left",
  checked: "left" === defaultValue,
  onChange: onChange
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
  text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'meta-box-builder'),
  delay: 0,
  placement: "bottom"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "currentColor",
  d: "M21 11H9.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.41 13H21a1 1 0 0 0 0-2ZM3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z"
})))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "radio",
  value: "right",
  checked: "right" === defaultValue,
  onChange: onChange
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
  text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'meta-box-builder'),
  delay: 0,
  placement: "bottom"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "currentColor",
  d: "m17.71 11.29l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33ZM21 4a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1Z"
}))))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TooltipSettings);

/***/ }),

/***/ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/settings.js":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/settings.js ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */


const settings = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z"
  })]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings);
//# sourceMappingURL=settings.js.map

/***/ })

}]);
//# sourceMappingURL=app_controls_TooltipSettings_js.app.js.map