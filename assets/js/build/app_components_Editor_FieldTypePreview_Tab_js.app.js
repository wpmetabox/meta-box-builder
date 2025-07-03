"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Tab_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Tab.js":
/*!*******************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Tab.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/.pnpm/@wordpress+icons@10.23.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/archive.js");



const Tab = ({
  field
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "mb-field--tab__wrapper"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "mb-field--tab__content"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabIcon, {
  field: field
}), field.name));
const TabIcon = ({
  field
}) => {
  const maps = {
    url: field.icon_url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: field.icon_url
    }),
    dashicons: field.icon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicons dashicons-${field.icon}`
    }),
    fontawesome: field.icon_fa && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: field.icon_fa
    })
  };
  const defaultIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
  });
  return maps[field.icon_type] || defaultIcon;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tab);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Tab_js.app.js.map