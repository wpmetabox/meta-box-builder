"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_controls_DataList_js"],{

/***/ "./app/controls/DataList.js":
/*!**********************************!*\
  !*** ./app/controls/DataList.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const DataList = ({
  id,
  options
}) => options.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("datalist", {
  id: id
}, options.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  key: option
}, option)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataList);

/***/ })

}]);
//# sourceMappingURL=app_controls_DataList_js.app.js.map