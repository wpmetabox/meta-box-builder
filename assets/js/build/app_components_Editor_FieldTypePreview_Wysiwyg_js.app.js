"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Wysiwyg_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Wysiwyg.js":
/*!***********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Wysiwyg.js ***!
  \***********************************************************/
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



const Wysiwyg = ({
  field
}) => {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const settings = getDefaultEditorSettings();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const selector = `#${field._id}`;
    const input = document.querySelector(selector);
    const editor = input.closest('.rwmb-input').querySelector('.mce-container');
    if (editor) {
      editor.remove();
    }
    tinymce.remove(selector);
    settings.tinymce.selector = selector;
    tinymce.init(settings.tinymce);
  }, [field.clone]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-core-ui wp-editor-wrap tmce-active"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-editor-tools"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-media-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button insert-media add_media"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wp-media-buttons-icon"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Media', 'meta-box-builder'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-editor-tabs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "aria-pressed": "true",
    className: "wp-switch-editor switch-tmce"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visual', 'meta-box-builder')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "wp-switch-editor switch-html"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text', 'meta-box-builder')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-editor-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: field._id
  })));
};
const getDefaultEditorSettings = () => {
  let settings = wp.editor.getDefaultSettings();
  settings.tinymce.toolbar1 = 'formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,fullscreen,wp_adv';
  settings.tinymce.toolbar2 = 'strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help';
  settings.quicktags.buttons = 'strong,em,link,block,del,ins,img,ul,ol,li,code,more,close';
  return settings;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wysiwyg);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Wysiwyg_js.app.js.map