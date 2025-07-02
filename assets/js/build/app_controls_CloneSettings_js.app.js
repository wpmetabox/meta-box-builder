"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_CloneSettings_js"],{

/***/ "./app/controls/CloneSettings.js":
/*!***************************************!*\
  !*** ./app/controls/CloneSettings.js ***!
  \***************************************/
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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/close.js");
/* harmony import */ var _DivRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DivRow */ "./app/controls/DivRow.js");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tooltip */ "./app/controls/Tooltip.js");







const OutsideClickDetector = ({
  onClickOutside,
  children,
  toggleRef
}) => {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleClickOutside = e => {
      // Don't close if clicking on the toggle button
      if (toggleRef?.current && toggleRef.current.contains(e.target)) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, toggleRef]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: ref
  }, children);
};
const CloneSettings = ({
  componentId,
  defaultValue,
  updateField,
  ...rest
}) => {
  const toggle = name => value => updateField(name, value);
  const update = name => e => updateField(name, e.target.value);
  const toggleRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    popoverProps: {
      placement: 'bottom-end'
    },
    className: "og-clone",
    contentClassName: "og og-clone__content",
    focusOnMount: false,
    renderToggle: ({
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      ref: toggleRef,
      className: `og-status ${defaultValue.clone ? 'og-status--active' : ''}`,
      onClick: onToggle
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloneable', 'meta-box-builder')),
    renderContent: ({
      onClose
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OutsideClickDetector, {
      onClickOutside: onClose,
      toggleRef: toggleRef
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
      onClick: onClose,
      iconSize: 16
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      className: "og-field",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Make the field cloneable', 'meta-box-builder'),
      checked: defaultValue.clone,
      onChange: toggle('clone')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      className: "og-field",
      label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Start with no inputs', 'meta-box-builder'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show no inputs at first except the "+ Add more" button', 'meta-box-builder')
      })),
      checked: defaultValue.clone_empty_start,
      onChange: toggle('clone_empty_start')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      className: "og-field",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Allow to reorder clones', 'meta-box-builder'),
      checked: defaultValue.sort_clone,
      onChange: toggle('sort_clone')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      className: "og-field",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set default values for new clones', 'meta-box-builder'),
      checked: defaultValue.clone_default,
      onChange: toggle('clone_default')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      className: "og-field",
      label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save in multiple rows', 'meta-box-builder'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder')
      })),
      checked: defaultValue.clone_as_multiple,
      onChange: toggle('clone_as_multiple')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Number of clones', 'meta-box-builder')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "og-input-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `${componentId}-min_clone`
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Min', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "number",
      min: "0",
      id: `${componentId}-min_clone`,
      defaultValue: defaultValue.min_clone,
      onChange: update('min_clone')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `${componentId}-max_clone`
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Max', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "number",
      min: "0",
      id: `${componentId}-max_clone`,
      defaultValue: defaultValue.max_clone,
      onChange: update('max_clone')
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DivRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
      htmlFor: `${componentId}-add_button`,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add more text', 'meta-box-builder'),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      id: `${componentId}-add_button`,
      defaultValue: defaultValue.add_button,
      onChange: update('add_button')
    })))
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CloneSettings);

/***/ })

}]);
//# sourceMappingURL=app_controls_CloneSettings_js.app.js.map