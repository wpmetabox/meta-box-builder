/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./modules/settings-page/app/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/settings-page/app/App.js":
/*!******************************************!*\
  !*** ./modules/settings-page/app/App.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Controls_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controls/Control */ \"./modules/settings-page/app/Controls/Control.js\");\n/* harmony import */ var _DefaultSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultSettings */ \"./modules/settings-page/app/DefaultSettings.js\");\n/* harmony import */ var _Options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options */ \"./modules/settings-page/app/Options.js\");\n/* harmony import */ var _SettingsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsContext */ \"./modules/settings-page/app/SettingsContext.js\");\n\n\n\n\nconst {\n  render\n} = wp.element;\nconst settings = MBSPUI.settings ? MBSPUI.settings : _DefaultSettings__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nconst App = () => /*#__PURE__*/React.createElement(_SettingsContext__WEBPACK_IMPORTED_MODULE_3__[\"SettingsProvider\"], {\n  initialValue: settings\n}, _Options__WEBPACK_IMPORTED_MODULE_2__[\"Options\"].map(field => /*#__PURE__*/React.createElement(_Controls_Control__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  key: field.name,\n  field: field\n})));\n\nrender( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./modules/settings-page/app/App.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Checkbox.js":
/*!********************************************************!*\
  !*** ./modules/settings-page/app/Controls/Checkbox.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Checkbox = ({\n  label,\n  name,\n  description,\n  update,\n  checked\n}) => /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-field\"\n}, label && /*#__PURE__*/React.createElement(\"label\", {\n  className: \"mb-spui-label\",\n  htmlFor: name\n}, label), /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-input\"\n}, description ? /*#__PURE__*/React.createElement(\"label\", {\n  className: \"mb-spui-description\"\n}, /*#__PURE__*/React.createElement(\"input\", {\n  type: \"checkbox\",\n  id: name,\n  \"data-name\": name,\n  checked: checked,\n  onChange: update\n}), \" \", description) : /*#__PURE__*/React.createElement(\"input\", {\n  type: \"checkbox\",\n  id: name,\n  \"data-name\": name,\n  checked: checked,\n  onChange: update\n})));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Checkbox);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Checkbox.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Control.js":
/*!*******************************************************!*\
  !*** ./modules/settings-page/app/Controls/Control.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dot_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dot-prop */ \"./node_modules/dot-prop/index.js\");\n/* harmony import */ var dot_prop__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dot_prop__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slugify */ \"./node_modules/slugify/slugify.js\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _SettingsContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SettingsContext */ \"./modules/settings-page/app/SettingsContext.js\");\n/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Checkbox */ \"./modules/settings-page/app/Controls/Checkbox.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Form */ \"./modules/settings-page/app/Controls/Form.js\");\n/* harmony import */ var _IconUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IconUrl */ \"./modules/settings-page/app/Controls/IconUrl.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Input */ \"./modules/settings-page/app/Controls/Input.js\");\n/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Select */ \"./modules/settings-page/app/Controls/Select.js\");\n/* harmony import */ var _Textarea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Textarea */ \"./modules/settings-page/app/Controls/Textarea.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\n\n\nconst {\n  useContext\n} = wp.element;\n\nconst Control = ({\n  field\n}) => {\n  const {\n    settings,\n    updateSettings\n  } = useContext(_SettingsContext__WEBPACK_IMPORTED_MODULE_2__[\"SettingsContext\"]);\n\n  const update = e => {\n    const name = e.target.dataset.name;\n    let value = 'checkbox' === e.target.type ? e.target.checked : e.target.value;\n    let newSettings = { ...settings\n    };\n    dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, name, value);\n\n    if (field.autoFill) {\n      dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, field.autoFill, slugify__WEBPACK_IMPORTED_MODULE_1___default()(value, {\n        lower: true\n      }));\n    }\n\n    if (field.autoFillDash) {\n      dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, field.autoFillDash, slugify__WEBPACK_IMPORTED_MODULE_1___default()(value, {\n        replacement: '_',\n        lower: true\n      }));\n    }\n\n    updateSettings(newSettings);\n  };\n\n  const value = dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.get(settings, field.name);\n\n  switch (field.type) {\n    case 'text':\n      return /*#__PURE__*/React.createElement(_Input__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _extends({}, field, {\n        value: value,\n        update: update\n      }));\n\n    case 'textarea':\n      return /*#__PURE__*/React.createElement(_Textarea__WEBPACK_IMPORTED_MODULE_8__[\"default\"], _extends({}, field, {\n        value: value,\n        update: update\n      }));\n\n    case 'checkbox':\n      return /*#__PURE__*/React.createElement(_Checkbox__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _extends({}, field, {\n        checked: value,\n        update: update\n      }));\n\n    case 'form':\n      return /*#__PURE__*/React.createElement(_Form__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _extends({}, field, {\n        value: value\n      }));\n\n    case 'select':\n      return /*#__PURE__*/React.createElement(_Select__WEBPACK_IMPORTED_MODULE_7__[\"default\"], _extends({}, field, {\n        value: value,\n        update: update\n      }));\n\n    case 'icon_url':\n      return /*#__PURE__*/React.createElement(_IconUrl__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        name: field.name,\n        value: value,\n        type: dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.get(settings, 'icon_type'),\n        update: update\n      });\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Control);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Control.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Form.js":
/*!****************************************************!*\
  !*** ./modules/settings-page/app/Controls/Form.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dot_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dot-prop */ \"./node_modules/dot-prop/index.js\");\n/* harmony import */ var dot_prop__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dot_prop__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SettingsContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SettingsContext */ \"./modules/settings-page/app/SettingsContext.js\");\n/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./List */ \"./modules/settings-page/app/Controls/List.js\");\n\n\n\nconst {\n  __\n} = wp.i18n;\nconst {\n  useContext,\n  useState\n} = wp.element;\n\nconst Form = ({\n  label,\n  name\n}) => {\n  const {\n    settings,\n    updateSettings\n  } = useContext(_SettingsContext__WEBPACK_IMPORTED_MODULE_1__[\"SettingsContext\"]);\n  const [currentTab] = useState({\n    id: '',\n    label: ''\n  });\n\n  const addItem = e => {\n    e.preventDefault();\n\n    if (!currentTab) {\n      return;\n    }\n\n    let newSettings = { ...settings\n    };\n    const newItems = { ...settings.tabs,\n      ...{\n        [currentTab.id]: currentTab.label\n      }\n    };\n    dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, 'tabs', newItems);\n    updateSettings(newSettings);\n  };\n\n  const deleteItem = i => {\n    let newSettings = { ...settings\n    };\n    const newItems = Object.entries(settings.tabs).filter((item, index) => index !== i);\n    dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, 'tabs', Object.fromEntries(newItems));\n    updateSettings(newSettings);\n  };\n\n  const setUpdate = e => {\n    const items = settings.tabs;\n\n    if ('mbspui-tab-value' === e.target.id) {\n      // if modify Label => update value of Tab[ID]\n      items[e.target.getAttribute('data')] = e.target.value;\n    }\n\n    if ('mbspui-tab-key' === e.target.id) {\n      // if modify ID => first: delete Tab, then: add new Tab with old ID\n      delete Object.assign(items, {\n        [e.target.value]: items[e.target.name]\n      })[e.target.name];\n    }\n\n    let newSettings = { ...settings\n    };\n    dot_prop__WEBPACK_IMPORTED_MODULE_0___default.a.set(newSettings, 'tabs', items);\n    updateSettings(newSettings);\n  };\n\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-field\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    className: \"mb-spui-label\",\n    htmlFor: name\n  }, label), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-tabs\"\n  }, /*#__PURE__*/React.createElement(_List__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    items: settings.tabs,\n    deleteItem: deleteItem,\n    setUpdate: setUpdate\n  }), /*#__PURE__*/React.createElement(\"button\", {\n    type: \"button\",\n    className: \"button\",\n    onClick: addItem\n  }, __('+ Add New', 'mb-settings-page-ui'))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Form.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Icon.js":
/*!****************************************************!*\
  !*** ./modules/settings-page/app/Controls/Icon.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst {\n  Dashicon\n} = wp.components;\n\nconst Icon = ({\n  label,\n  name,\n  update,\n  value\n}) => /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-field mb-spui-field--radio\"\n}, /*#__PURE__*/React.createElement(\"label\", {\n  className: \"mb-spui-label\"\n}, label), /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-input\"\n}, MBSPUI.icons.map(icon => /*#__PURE__*/React.createElement(\"label\", {\n  key: icon,\n  className: \"mb-spui-choice mb-spui-icon\"\n}, /*#__PURE__*/React.createElement(\"input\", {\n  type: \"radio\",\n  \"data-name\": name,\n  value: `dashicons-${icon}`,\n  checked: `dashicons-${icon}` === value || `dashicons-${icon}` === 'dashicons-admin-generic',\n  onChange: update\n}), /*#__PURE__*/React.createElement(Dashicon, {\n  icon: icon\n})))));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Icon);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Icon.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/IconUrl.js":
/*!*******************************************************!*\
  !*** ./modules/settings-page/app/Controls/IconUrl.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icon */ \"./modules/settings-page/app/Controls/Icon.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Input */ \"./modules/settings-page/app/Controls/Input.js\");\n/* harmony import */ var _Textarea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Textarea */ \"./modules/settings-page/app/Controls/Textarea.js\");\n\n\n\n\nconst IconUrl = ({\n  type,\n  update,\n  value\n}) => {\n  switch (type) {\n    case '1':\n      // base64\n      return /*#__PURE__*/React.createElement(_Textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        name: \"icon_url\",\n        value: value,\n        update: update\n      });\n\n    case '2':\n      // custom url\n      return /*#__PURE__*/React.createElement(_Input__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        name: \"icon_url\",\n        value: value,\n        update: update\n      });\n\n    default:\n      return /*#__PURE__*/React.createElement(_Icon__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n        name: \"icon_url\",\n        value: value,\n        update: update\n      });\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IconUrl);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/IconUrl.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Input.js":
/*!*****************************************************!*\
  !*** ./modules/settings-page/app/Controls/Input.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Input = ({\n  label,\n  name,\n  value,\n  update,\n  description = '',\n  required = false\n}) => {\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-field\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    className: \"mb-spui-label\",\n    htmlFor: name\n  }, label, required && /*#__PURE__*/React.createElement(\"span\", {\n    className: \"mb-spui-required\"\n  }, \"*\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-input\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    required: required,\n    id: name,\n    \"data-name\": name,\n    value: value,\n    onChange: update\n  }), description && /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-description\"\n  }, description)));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Input);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Input.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/List.js":
/*!****************************************************!*\
  !*** ./modules/settings-page/app/Controls/List.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst {\n  __\n} = wp.i18n;\nconst {\n  useContext\n} = wp.element;\nconst {\n  Dashicon\n} = wp.components;\n\nconst List = ({\n  items,\n  setUpdate,\n  deleteItem\n}) => {\n  return /*#__PURE__*/React.createElement(React.Fragment, null, Object.entries(items).map(([key, value], index) => /*#__PURE__*/React.createElement(\"div\", {\n    className: \"mb-spui-tab\",\n    key: index\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    id: \"mbspui-tab-value\",\n    placeholder: __('Tab label', 'mb-settings-page-ui'),\n    data: key,\n    name: value,\n    value: value,\n    onChange: e => {\n      setUpdate(e);\n    }\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    id: \"mbspui-tab-key\",\n    placeholder: __('Tab id', 'mb-settings-page-ui'),\n    name: key,\n    value: key,\n    onChange: e => {\n      setUpdate(e);\n    }\n  }), /*#__PURE__*/React.createElement(\"button\", {\n    type: \"button\",\n    className: \"mbspui-tab-remove\",\n    title: __('Remove', 'mb-settings-page-ui'),\n    onClick: e => {\n      e.preventDefault();\n      deleteItem(index);\n    }\n  }, /*#__PURE__*/React.createElement(Dashicon, {\n    icon: \"dismiss\"\n  })))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (List);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/List.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Select.js":
/*!******************************************************!*\
  !*** ./modules/settings-page/app/Controls/Select.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Select = ({\n  label,\n  name,\n  update,\n  description = '',\n  options,\n  value\n}) => /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-field\"\n}, /*#__PURE__*/React.createElement(\"label\", {\n  className: \"mb-spui-label\",\n  htmlFor: name\n}, label), /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-input\"\n}, /*#__PURE__*/React.createElement(\"select\", {\n  id: name,\n  \"data-name\": name,\n  value: value,\n  onChange: update\n}, options.map((option, key) => /*#__PURE__*/React.createElement(\"option\", {\n  key: key,\n  value: option.value\n}, option.label))), description && /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-description\"\n}, description)));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Select);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Select.js?");

/***/ }),

/***/ "./modules/settings-page/app/Controls/Textarea.js":
/*!********************************************************!*\
  !*** ./modules/settings-page/app/Controls/Textarea.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Textarea = ({\n  label,\n  name,\n  placeholder,\n  value,\n  update,\n  description = '',\n  required = false\n}) => /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-field\"\n}, /*#__PURE__*/React.createElement(\"label\", {\n  className: \"mb-spui-label\",\n  htmlFor: name\n}, label, required && /*#__PURE__*/React.createElement(\"span\", {\n  className: \"mb-spui-required\"\n}, \"*\")), /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-input\"\n}, /*#__PURE__*/React.createElement(\"textarea\", {\n  id: name,\n  \"data-name\": name,\n  placeholder: placeholder,\n  value: value,\n  onChange: update\n}), description && /*#__PURE__*/React.createElement(\"div\", {\n  className: \"mb-spui-description\"\n}, description)));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Textarea);\n\n//# sourceURL=webpack:///./modules/settings-page/app/Controls/Textarea.js?");

/***/ }),

/***/ "./modules/settings-page/app/DefaultSettings.js":
/*!******************************************************!*\
  !*** ./modules/settings-page/app/DefaultSettings.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst DefaultSettings = {\n  'id': '',\n  'menu_title': '',\n  'page_title': '',\n  'option_name': '',\n  'class': '',\n  'capability': 'administrator',\n  'icon_url': '',\n  'position': '',\n  'parent': '',\n  'submenu_title': '',\n  'help_tabs': '',\n  'style': 'boxes',\n  'columns': 1,\n  'tabs': {},\n  'tab_style': 'default',\n  'submit_button': '',\n  'message': '',\n  'customizer': false,\n  'customizer_only': false,\n  'network': false\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (DefaultSettings);\n\n//# sourceURL=webpack:///./modules/settings-page/app/DefaultSettings.js?");

/***/ }),

/***/ "./modules/settings-page/app/Options.js":
/*!**********************************************!*\
  !*** ./modules/settings-page/app/Options.js ***!
  \**********************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Options\", function() { return Options; });\nconst {\n  __\n} = wp.i18n;\nconst styles = [{\n  'value': 'boxes',\n  'label': 'Boxes'\n}, {\n  'value': 'no-boxes',\n  'label': 'No boxes'\n}];\nconst columns = [{\n  'value': 1,\n  'label': 1\n}, {\n  'value': 2,\n  'label': 2\n}];\nconst tab_style = [{\n  'value': 'default',\n  'label': 'Default'\n}, {\n  'value': 'left',\n  'label': 'Left'\n}];\nconst checked = [true, false];\nconst MbuiPosition = [{\n  name: 'position',\n  value: '',\n  label: __('Select an item', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 2,\n  label: __('Dashboard', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 5,\n  label: __('Posts', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 10,\n  label: __('Media', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 15,\n  label: __('Links', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 20,\n  label: __('Pages', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 25,\n  label: __('Comments', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 60,\n  label: __('Appearance', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 65,\n  label: __('Plugins', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 70,\n  label: __('Users', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 75,\n  label: __('Tools', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 80,\n  label: __('Settings', 'mb-settings-page-ui')\n}, {\n  name: 'position',\n  value: 100,\n  label: __('Metabox', 'mb-settings-page-ui')\n}];\nconst WordpressPages = [...[{\n  name: 'parent',\n  value: 'index.php',\n  label: __('Dashboard', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'edit.php',\n  label: __('Posts', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'upload.php',\n  label: __('Media', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'link-manager.php',\n  label: __('Links', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'edit.php?post_type=page',\n  label: __('Pages', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'edit-comments.php',\n  label: __('Comments', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'themes.php',\n  label: __('Apperance', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'plugins.php',\n  label: __('Plugins', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'users.php',\n  label: __('Users', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'tools.php',\n  label: __('Tools', 'mb-settings-page-ui')\n}, {\n  name: 'parent',\n  value: 'options-general.php',\n  label: __('Settings', 'mb-settings-page-ui')\n}], ...MBSPUI.custom_post_types];\nconst IconTypes = [{\n  name: 'dashicon',\n  value: 0,\n  label: 'Dashicon'\n}, {\n  name: 'base64-encoded-svg',\n  value: 1,\n  label: 'Base64 encoded SVG'\n}, {\n  name: 'custom-url',\n  value: 2,\n  label: 'Custom URL'\n}];\nconst Options = [{\n  type: 'text',\n  name: 'option_name',\n  label: __('Option name', 'mb-settings-page-ui'),\n  required: false,\n  description: __('Option name where settings data is saved to. Optional. Takes id if missed. If you want to use theme mods, then set this to theme_mods_$themeslug.', 'mb-settings-page-ui')\n}, {\n  type: 'text',\n  name: 'class',\n  label: __('CSS Class', 'mb-settings-page-ui'),\n  required: false,\n  description: __('Custom CSS for the wrapper div.', 'mb-settings-page-ui')\n}, {\n  type: 'select',\n  name: 'capability',\n  label: __('Capability', 'mb-settings-page-ui'),\n  options: MBSPUI.caps,\n  description: __('Required capability to access the settings page.', 'mb-settings-page-ui')\n}, {\n  type: 'select',\n  name: 'icon_type',\n  options: IconTypes,\n  label: __('Icon', 'mb-settings-page-ui'),\n  required: false\n}, {\n  type: 'icon_url',\n  name: 'icon_url',\n  required: false\n}, {\n  type: 'select',\n  name: 'position',\n  label: __('Position', 'mb-settings-page-ui'),\n  options: MbuiPosition,\n  description: __('Menu position. See position parameter of add_menu_page() function.', 'mb-settings-page-ui')\n}, {\n  type: 'select',\n  name: 'parent',\n  label: __('Parent', 'mb-settings-page-ui'),\n  options: WordpressPages,\n  description: __('ID of the parent page. Optional. Can be WordPress menu or custom settings page menu.', 'mb-settings-page-ui')\n}, {\n  type: 'text',\n  name: 'submenu_title',\n  label: __('Submenu title', 'mb-settings-page-ui'),\n  required: false,\n  description: __('Set this to the default submenu title (first submenu) if the settings page is a top-level menu. Optional.', 'mb-settings-page-ui')\n}, {\n  type: 'textarea',\n  name: 'help_tabs',\n  label: __('Help tabs', 'mb-settings-page-ui'),\n  required: false,\n  description: __('The content displayed when clicking on the Help button on the top right (near the Screen Options button).', 'mb-settings-page-ui')\n}, {\n  type: 'select',\n  name: 'style',\n  label: __('Style', 'mb-settings-page-ui'),\n  required: false,\n  options: styles\n}, {\n  type: 'select',\n  name: 'columns',\n  label: __('Columns', 'mb-settings-page-ui'),\n  options: columns,\n  description: __('The number of columns in the meta boxes. Can be 1 or 2. You might want to use 1 column with no-boxes style to match WordPress style.', 'mb-settings-page-ui')\n}, {\n  type: 'form',\n  name: 'tabs',\n  label: __('Tabs', 'mb-settings-page-ui'),\n  required: false\n}, {\n  type: 'select',\n  name: 'tab_style',\n  label: __('Tab style', 'mb-settings-page-ui'),\n  options: tab_style\n}, {\n  type: 'text',\n  name: 'submit_button',\n  label: __('Custom submit button text', 'mb-settings-page-ui'),\n  required: false\n}, {\n  type: 'text',\n  name: 'message',\n  label: __('Message', 'mb-settings-page-ui'),\n  required: false,\n  description: __('The custom message displayed when saving options.', 'mb-settings-page-ui')\n}, {\n  type: 'checkbox',\n  name: 'customizer',\n  label: __('Show in the Customizer', 'mb-settings-page-ui'),\n  options: checked\n}, {\n  type: 'checkbox',\n  name: 'customizer_only',\n  label: __('Customizer only', 'mb-settings-page-ui'),\n  options: checked,\n  description: __('Show only in the Customizer, no admin settings page', 'mb-settings-page-ui')\n}, {\n  type: 'checkbox',\n  name: 'network',\n  label: __('Network', 'mb-settings-page-ui'),\n  options: checked,\n  description: __('Make the settings page network-wide (in multisite environment).', 'mb-settings-page-ui')\n}];\n\n//# sourceURL=webpack:///./modules/settings-page/app/Options.js?");

/***/ }),

/***/ "./modules/settings-page/app/SettingsContext.js":
/*!******************************************************!*\
  !*** ./modules/settings-page/app/SettingsContext.js ***!
  \******************************************************/
/*! exports provided: SettingsProvider, SettingsContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SettingsProvider\", function() { return SettingsProvider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SettingsContext\", function() { return SettingsContext; });\nconst {\n  createContext,\n  useState\n} = wp.element;\nconst SettingsContext = createContext();\n\nconst SettingsProvider = ({\n  children,\n  initialValue\n}) => {\n  const [settings, setSettings] = useState(initialValue);\n\n  const updateSettings = data => setSettings(prev => ({ ...prev,\n    ...data\n  }));\n\n  return /*#__PURE__*/React.createElement(SettingsContext.Provider, {\n    value: {\n      settings,\n      updateSettings\n    }\n  }, children);\n};\n\n\n\n//# sourceURL=webpack:///./modules/settings-page/app/SettingsContext.js?");

/***/ }),

/***/ "./node_modules/dot-prop/index.js":
/*!****************************************!*\
  !*** ./node_modules/dot-prop/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst isObj = __webpack_require__(/*! is-obj */ \"./node_modules/is-obj/index.js\");\n\nconst disallowedKeys = new Set([\n\t'__proto__',\n\t'prototype',\n\t'constructor'\n]);\n\nconst isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));\n\nfunction getPathSegments(path) {\n\tconst pathArray = path.split('.');\n\tconst parts = [];\n\n\tfor (let i = 0; i < pathArray.length; i++) {\n\t\tlet p = pathArray[i];\n\n\t\twhile (p[p.length - 1] === '\\\\' && pathArray[i + 1] !== undefined) {\n\t\t\tp = p.slice(0, -1) + '.';\n\t\t\tp += pathArray[++i];\n\t\t}\n\n\t\tparts.push(p);\n\t}\n\n\tif (!isValidPath(parts)) {\n\t\treturn [];\n\t}\n\n\treturn parts;\n}\n\nmodule.exports = {\n\tget(object, path, value) {\n\t\tif (!isObj(object) || typeof path !== 'string') {\n\t\t\treturn value === undefined ? object : value;\n\t\t}\n\n\t\tconst pathArray = getPathSegments(path);\n\t\tif (pathArray.length === 0) {\n\t\t\treturn;\n\t\t}\n\n\t\tfor (let i = 0; i < pathArray.length; i++) {\n\t\t\tobject = object[pathArray[i]];\n\n\t\t\tif (object === undefined || object === null) {\n\t\t\t\t// `object` is either `undefined` or `null` so we want to stop the loop, and\n\t\t\t\t// if this is not the last bit of the path, and\n\t\t\t\t// if it did't return `undefined`\n\t\t\t\t// it would return `null` if `object` is `null`\n\t\t\t\t// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`\n\t\t\t\tif (i !== pathArray.length - 1) {\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\n\t\treturn object === undefined ? value : object;\n\t},\n\n\tset(object, path, value) {\n\t\tif (!isObj(object) || typeof path !== 'string') {\n\t\t\treturn object;\n\t\t}\n\n\t\tconst root = object;\n\t\tconst pathArray = getPathSegments(path);\n\n\t\tfor (let i = 0; i < pathArray.length; i++) {\n\t\t\tconst p = pathArray[i];\n\n\t\t\tif (!isObj(object[p])) {\n\t\t\t\tobject[p] = {};\n\t\t\t}\n\n\t\t\tif (i === pathArray.length - 1) {\n\t\t\t\tobject[p] = value;\n\t\t\t}\n\n\t\t\tobject = object[p];\n\t\t}\n\n\t\treturn root;\n\t},\n\n\tdelete(object, path) {\n\t\tif (!isObj(object) || typeof path !== 'string') {\n\t\t\treturn false;\n\t\t}\n\n\t\tconst pathArray = getPathSegments(path);\n\n\t\tfor (let i = 0; i < pathArray.length; i++) {\n\t\t\tconst p = pathArray[i];\n\n\t\t\tif (i === pathArray.length - 1) {\n\t\t\t\tdelete object[p];\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t\tobject = object[p];\n\n\t\t\tif (!isObj(object)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\t},\n\n\thas(object, path) {\n\t\tif (!isObj(object) || typeof path !== 'string') {\n\t\t\treturn false;\n\t\t}\n\n\t\tconst pathArray = getPathSegments(path);\n\t\tif (pathArray.length === 0) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// eslint-disable-next-line unicorn/no-for-loop\n\t\tfor (let i = 0; i < pathArray.length; i++) {\n\t\t\tif (isObj(object)) {\n\t\t\t\tif (!(pathArray[i] in object)) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\tobject = object[pathArray[i]];\n\t\t\t} else {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\treturn true;\n\t}\n};\n\n\n//# sourceURL=webpack:///./node_modules/dot-prop/index.js?");

/***/ }),

/***/ "./node_modules/is-obj/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-obj/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = value => {\n\tconst type = typeof value;\n\treturn value !== null && (type === 'object' || type === 'function');\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-obj/index.js?");

/***/ }),

/***/ "./node_modules/slugify/slugify.js":
/*!*****************************************!*\
  !*** ./node_modules/slugify/slugify.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n;(function (name, root, factory) {\n  if (true) {\n    module.exports = factory()\n    module.exports['default'] = factory()\n  }\n  /* istanbul ignore next */\n  else {}\n}('slugify', this, function () {\n  var charMap = JSON.parse('{\"$\":\"dollar\",\"%\":\"percent\",\"&\":\"and\",\"<\":\"less\",\">\":\"greater\",\"|\":\"or\",\"¢\":\"cent\",\"£\":\"pound\",\"¤\":\"currency\",\"¥\":\"yen\",\"©\":\"(c)\",\"ª\":\"a\",\"®\":\"(r)\",\"º\":\"o\",\"À\":\"A\",\"Á\":\"A\",\"Â\":\"A\",\"Ã\":\"A\",\"Ä\":\"A\",\"Å\":\"A\",\"Æ\":\"AE\",\"Ç\":\"C\",\"È\":\"E\",\"É\":\"E\",\"Ê\":\"E\",\"Ë\":\"E\",\"Ì\":\"I\",\"Í\":\"I\",\"Î\":\"I\",\"Ï\":\"I\",\"Ð\":\"D\",\"Ñ\":\"N\",\"Ò\":\"O\",\"Ó\":\"O\",\"Ô\":\"O\",\"Õ\":\"O\",\"Ö\":\"O\",\"Ø\":\"O\",\"Ù\":\"U\",\"Ú\":\"U\",\"Û\":\"U\",\"Ü\":\"U\",\"Ý\":\"Y\",\"Þ\":\"TH\",\"ß\":\"ss\",\"à\":\"a\",\"á\":\"a\",\"â\":\"a\",\"ã\":\"a\",\"ä\":\"a\",\"å\":\"a\",\"æ\":\"ae\",\"ç\":\"c\",\"è\":\"e\",\"é\":\"e\",\"ê\":\"e\",\"ë\":\"e\",\"ì\":\"i\",\"í\":\"i\",\"î\":\"i\",\"ï\":\"i\",\"ð\":\"d\",\"ñ\":\"n\",\"ò\":\"o\",\"ó\":\"o\",\"ô\":\"o\",\"õ\":\"o\",\"ö\":\"o\",\"ø\":\"o\",\"ù\":\"u\",\"ú\":\"u\",\"û\":\"u\",\"ü\":\"u\",\"ý\":\"y\",\"þ\":\"th\",\"ÿ\":\"y\",\"Ā\":\"A\",\"ā\":\"a\",\"Ă\":\"A\",\"ă\":\"a\",\"Ą\":\"A\",\"ą\":\"a\",\"Ć\":\"C\",\"ć\":\"c\",\"Č\":\"C\",\"č\":\"c\",\"Ď\":\"D\",\"ď\":\"d\",\"Đ\":\"DJ\",\"đ\":\"dj\",\"Ē\":\"E\",\"ē\":\"e\",\"Ė\":\"E\",\"ė\":\"e\",\"Ę\":\"e\",\"ę\":\"e\",\"Ě\":\"E\",\"ě\":\"e\",\"Ğ\":\"G\",\"ğ\":\"g\",\"Ģ\":\"G\",\"ģ\":\"g\",\"Ĩ\":\"I\",\"ĩ\":\"i\",\"Ī\":\"i\",\"ī\":\"i\",\"Į\":\"I\",\"į\":\"i\",\"İ\":\"I\",\"ı\":\"i\",\"Ķ\":\"k\",\"ķ\":\"k\",\"Ļ\":\"L\",\"ļ\":\"l\",\"Ľ\":\"L\",\"ľ\":\"l\",\"Ł\":\"L\",\"ł\":\"l\",\"Ń\":\"N\",\"ń\":\"n\",\"Ņ\":\"N\",\"ņ\":\"n\",\"Ň\":\"N\",\"ň\":\"n\",\"Ō\":\"O\",\"ō\":\"o\",\"Ő\":\"O\",\"ő\":\"o\",\"Œ\":\"OE\",\"œ\":\"oe\",\"Ŕ\":\"R\",\"ŕ\":\"r\",\"Ř\":\"R\",\"ř\":\"r\",\"Ś\":\"S\",\"ś\":\"s\",\"Ş\":\"S\",\"ş\":\"s\",\"Š\":\"S\",\"š\":\"s\",\"Ţ\":\"T\",\"ţ\":\"t\",\"Ť\":\"T\",\"ť\":\"t\",\"Ũ\":\"U\",\"ũ\":\"u\",\"Ū\":\"u\",\"ū\":\"u\",\"Ů\":\"U\",\"ů\":\"u\",\"Ű\":\"U\",\"ű\":\"u\",\"Ų\":\"U\",\"ų\":\"u\",\"Ŵ\":\"W\",\"ŵ\":\"w\",\"Ŷ\":\"Y\",\"ŷ\":\"y\",\"Ÿ\":\"Y\",\"Ź\":\"Z\",\"ź\":\"z\",\"Ż\":\"Z\",\"ż\":\"z\",\"Ž\":\"Z\",\"ž\":\"z\",\"ƒ\":\"f\",\"Ơ\":\"O\",\"ơ\":\"o\",\"Ư\":\"U\",\"ư\":\"u\",\"ǈ\":\"LJ\",\"ǉ\":\"lj\",\"ǋ\":\"NJ\",\"ǌ\":\"nj\",\"Ș\":\"S\",\"ș\":\"s\",\"Ț\":\"T\",\"ț\":\"t\",\"˚\":\"o\",\"Ά\":\"A\",\"Έ\":\"E\",\"Ή\":\"H\",\"Ί\":\"I\",\"Ό\":\"O\",\"Ύ\":\"Y\",\"Ώ\":\"W\",\"ΐ\":\"i\",\"Α\":\"A\",\"Β\":\"B\",\"Γ\":\"G\",\"Δ\":\"D\",\"Ε\":\"E\",\"Ζ\":\"Z\",\"Η\":\"H\",\"Θ\":\"8\",\"Ι\":\"I\",\"Κ\":\"K\",\"Λ\":\"L\",\"Μ\":\"M\",\"Ν\":\"N\",\"Ξ\":\"3\",\"Ο\":\"O\",\"Π\":\"P\",\"Ρ\":\"R\",\"Σ\":\"S\",\"Τ\":\"T\",\"Υ\":\"Y\",\"Φ\":\"F\",\"Χ\":\"X\",\"Ψ\":\"PS\",\"Ω\":\"W\",\"Ϊ\":\"I\",\"Ϋ\":\"Y\",\"ά\":\"a\",\"έ\":\"e\",\"ή\":\"h\",\"ί\":\"i\",\"ΰ\":\"y\",\"α\":\"a\",\"β\":\"b\",\"γ\":\"g\",\"δ\":\"d\",\"ε\":\"e\",\"ζ\":\"z\",\"η\":\"h\",\"θ\":\"8\",\"ι\":\"i\",\"κ\":\"k\",\"λ\":\"l\",\"μ\":\"m\",\"ν\":\"n\",\"ξ\":\"3\",\"ο\":\"o\",\"π\":\"p\",\"ρ\":\"r\",\"ς\":\"s\",\"σ\":\"s\",\"τ\":\"t\",\"υ\":\"y\",\"φ\":\"f\",\"χ\":\"x\",\"ψ\":\"ps\",\"ω\":\"w\",\"ϊ\":\"i\",\"ϋ\":\"y\",\"ό\":\"o\",\"ύ\":\"y\",\"ώ\":\"w\",\"Ё\":\"Yo\",\"Ђ\":\"DJ\",\"Є\":\"Ye\",\"І\":\"I\",\"Ї\":\"Yi\",\"Ј\":\"J\",\"Љ\":\"LJ\",\"Њ\":\"NJ\",\"Ћ\":\"C\",\"Џ\":\"DZ\",\"А\":\"A\",\"Б\":\"B\",\"В\":\"V\",\"Г\":\"G\",\"Д\":\"D\",\"Е\":\"E\",\"Ж\":\"Zh\",\"З\":\"Z\",\"И\":\"I\",\"Й\":\"J\",\"К\":\"K\",\"Л\":\"L\",\"М\":\"M\",\"Н\":\"N\",\"О\":\"O\",\"П\":\"P\",\"Р\":\"R\",\"С\":\"S\",\"Т\":\"T\",\"У\":\"U\",\"Ф\":\"F\",\"Х\":\"H\",\"Ц\":\"C\",\"Ч\":\"Ch\",\"Ш\":\"Sh\",\"Щ\":\"Sh\",\"Ъ\":\"U\",\"Ы\":\"Y\",\"Ь\":\"\",\"Э\":\"E\",\"Ю\":\"Yu\",\"Я\":\"Ya\",\"а\":\"a\",\"б\":\"b\",\"в\":\"v\",\"г\":\"g\",\"д\":\"d\",\"е\":\"e\",\"ж\":\"zh\",\"з\":\"z\",\"и\":\"i\",\"й\":\"j\",\"к\":\"k\",\"л\":\"l\",\"м\":\"m\",\"н\":\"n\",\"о\":\"o\",\"п\":\"p\",\"р\":\"r\",\"с\":\"s\",\"т\":\"t\",\"у\":\"u\",\"ф\":\"f\",\"х\":\"h\",\"ц\":\"c\",\"ч\":\"ch\",\"ш\":\"sh\",\"щ\":\"sh\",\"ъ\":\"u\",\"ы\":\"y\",\"ь\":\"\",\"э\":\"e\",\"ю\":\"yu\",\"я\":\"ya\",\"ё\":\"yo\",\"ђ\":\"dj\",\"є\":\"ye\",\"і\":\"i\",\"ї\":\"yi\",\"ј\":\"j\",\"љ\":\"lj\",\"њ\":\"nj\",\"ћ\":\"c\",\"ѝ\":\"u\",\"џ\":\"dz\",\"Ґ\":\"G\",\"ґ\":\"g\",\"Ғ\":\"GH\",\"ғ\":\"gh\",\"Қ\":\"KH\",\"қ\":\"kh\",\"Ң\":\"NG\",\"ң\":\"ng\",\"Ү\":\"UE\",\"ү\":\"ue\",\"Ұ\":\"U\",\"ұ\":\"u\",\"Һ\":\"H\",\"һ\":\"h\",\"Ә\":\"AE\",\"ә\":\"ae\",\"Ө\":\"OE\",\"ө\":\"oe\",\"฿\":\"baht\",\"ა\":\"a\",\"ბ\":\"b\",\"გ\":\"g\",\"დ\":\"d\",\"ე\":\"e\",\"ვ\":\"v\",\"ზ\":\"z\",\"თ\":\"t\",\"ი\":\"i\",\"კ\":\"k\",\"ლ\":\"l\",\"მ\":\"m\",\"ნ\":\"n\",\"ო\":\"o\",\"პ\":\"p\",\"ჟ\":\"zh\",\"რ\":\"r\",\"ს\":\"s\",\"ტ\":\"t\",\"უ\":\"u\",\"ფ\":\"f\",\"ქ\":\"k\",\"ღ\":\"gh\",\"ყ\":\"q\",\"შ\":\"sh\",\"ჩ\":\"ch\",\"ც\":\"ts\",\"ძ\":\"dz\",\"წ\":\"ts\",\"ჭ\":\"ch\",\"ხ\":\"kh\",\"ჯ\":\"j\",\"ჰ\":\"h\",\"Ẁ\":\"W\",\"ẁ\":\"w\",\"Ẃ\":\"W\",\"ẃ\":\"w\",\"Ẅ\":\"W\",\"ẅ\":\"w\",\"ẞ\":\"SS\",\"Ạ\":\"A\",\"ạ\":\"a\",\"Ả\":\"A\",\"ả\":\"a\",\"Ấ\":\"A\",\"ấ\":\"a\",\"Ầ\":\"A\",\"ầ\":\"a\",\"Ẩ\":\"A\",\"ẩ\":\"a\",\"Ẫ\":\"A\",\"ẫ\":\"a\",\"Ậ\":\"A\",\"ậ\":\"a\",\"Ắ\":\"A\",\"ắ\":\"a\",\"Ằ\":\"A\",\"ằ\":\"a\",\"Ẳ\":\"A\",\"ẳ\":\"a\",\"Ẵ\":\"A\",\"ẵ\":\"a\",\"Ặ\":\"A\",\"ặ\":\"a\",\"Ẹ\":\"E\",\"ẹ\":\"e\",\"Ẻ\":\"E\",\"ẻ\":\"e\",\"Ẽ\":\"E\",\"ẽ\":\"e\",\"Ế\":\"E\",\"ế\":\"e\",\"Ề\":\"E\",\"ề\":\"e\",\"Ể\":\"E\",\"ể\":\"e\",\"Ễ\":\"E\",\"ễ\":\"e\",\"Ệ\":\"E\",\"ệ\":\"e\",\"Ỉ\":\"I\",\"ỉ\":\"i\",\"Ị\":\"I\",\"ị\":\"i\",\"Ọ\":\"O\",\"ọ\":\"o\",\"Ỏ\":\"O\",\"ỏ\":\"o\",\"Ố\":\"O\",\"ố\":\"o\",\"Ồ\":\"O\",\"ồ\":\"o\",\"Ổ\":\"O\",\"ổ\":\"o\",\"Ỗ\":\"O\",\"ỗ\":\"o\",\"Ộ\":\"O\",\"ộ\":\"o\",\"Ớ\":\"O\",\"ớ\":\"o\",\"Ờ\":\"O\",\"ờ\":\"o\",\"Ở\":\"O\",\"ở\":\"o\",\"Ỡ\":\"O\",\"ỡ\":\"o\",\"Ợ\":\"O\",\"ợ\":\"o\",\"Ụ\":\"U\",\"ụ\":\"u\",\"Ủ\":\"U\",\"ủ\":\"u\",\"Ứ\":\"U\",\"ứ\":\"u\",\"Ừ\":\"U\",\"ừ\":\"u\",\"Ử\":\"U\",\"ử\":\"u\",\"Ữ\":\"U\",\"ữ\":\"u\",\"Ự\":\"U\",\"ự\":\"u\",\"Ỳ\":\"Y\",\"ỳ\":\"y\",\"Ỵ\":\"Y\",\"ỵ\":\"y\",\"Ỷ\":\"Y\",\"ỷ\":\"y\",\"Ỹ\":\"Y\",\"ỹ\":\"y\",\"‘\":\"\\'\",\"’\":\"\\'\",\"“\":\"\\\\\\\"\",\"”\":\"\\\\\\\"\",\"†\":\"+\",\"•\":\"*\",\"…\":\"...\",\"₠\":\"ecu\",\"₢\":\"cruzeiro\",\"₣\":\"french franc\",\"₤\":\"lira\",\"₥\":\"mill\",\"₦\":\"naira\",\"₧\":\"peseta\",\"₨\":\"rupee\",\"₩\":\"won\",\"₪\":\"new shequel\",\"₫\":\"dong\",\"€\":\"euro\",\"₭\":\"kip\",\"₮\":\"tugrik\",\"₯\":\"drachma\",\"₰\":\"penny\",\"₱\":\"peso\",\"₲\":\"guarani\",\"₳\":\"austral\",\"₴\":\"hryvnia\",\"₵\":\"cedi\",\"₸\":\"kazakhstani tenge\",\"₹\":\"indian rupee\",\"₺\":\"turkish lira\",\"₽\":\"russian ruble\",\"₿\":\"bitcoin\",\"℠\":\"sm\",\"™\":\"tm\",\"∂\":\"d\",\"∆\":\"delta\",\"∑\":\"sum\",\"∞\":\"infinity\",\"♥\":\"love\",\"元\":\"yuan\",\"円\":\"yen\",\"﷼\":\"rial\"}')\n  var locales = JSON.parse('{\"de\":{\"Ä\":\"AE\",\"ä\":\"ae\",\"Ö\":\"OE\",\"ö\":\"oe\",\"Ü\":\"UE\",\"ü\":\"ue\"},\"vi\":{\"Đ\":\"D\",\"đ\":\"d\"}}')\n\n  function replace (string, options) {\n    if (typeof string !== 'string') {\n      throw new Error('slugify: string argument expected')\n    }\n\n    options = (typeof options === 'string')\n      ? {replacement: options}\n      : options || {}\n\n    var locale = locales[options.locale] || {}\n\n    var replacement = options.replacement === undefined ? '-' : options.replacement\n\n    var slug = string.split('')\n      // replace characters based on charMap\n      .reduce(function (result, ch) {\n        return result + (locale[ch] || charMap[ch] || ch)\n          // remove not allowed characters\n          .replace(options.remove || /[^\\w\\s$*_+~.()'\"!\\-:@]+/g, '')\n      }, '')\n      // trim leading/trailing spaces\n      .trim()\n      // convert spaces to replacement character\n      // also remove duplicates of the replacement character\n      .replace(new RegExp('[\\\\s' + replacement + ']+', 'g'), replacement)\n\n    if (options.lower) {\n      slug = slug.toLowerCase()\n    }\n\n    if (options.strict) {\n      // remove anything besides letters, numbers, and the replacement char\n      slug = slug\n        .replace(new RegExp('[^a-zA-Z0-9' + replacement + ']', 'g'), '')\n        // remove duplicates of the replacement character\n        .replace(new RegExp('[\\\\s' + replacement + ']+', 'g'), replacement)\n    }\n\n    return slug\n  }\n\n  replace.extend = function (customMap) {\n    for (var key in customMap) {\n      charMap[key] = customMap[key]\n    }\n  }\n\n  return replace\n}))\n\n\n//# sourceURL=webpack:///./node_modules/slugify/slugify.js?");

/***/ })

/******/ });