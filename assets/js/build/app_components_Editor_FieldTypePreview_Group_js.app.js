"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["app_components_Editor_FieldTypePreview_Group_js"],{

/***/ "./app/components/Editor/FieldTypePreview/Group.js":
/*!*********************************************************!*\
  !*** ./app/components/Editor/FieldTypePreview/Group.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-sortablejs */ "./node_modules/.pnpm/react-sortablejs@6.1.4_@types+sortablejs@1.15.8_react-dom@18.3.1_react@18.3.1_sortablejs@1.15.4/node_modules/react-sortablejs/dist/index.js");
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _list_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../list-functions */ "./app/list-functions.js");
/* harmony import */ var _AddFieldButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AddFieldButton */ "./app/components/Editor/AddFieldButton.js");
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Node */ "./app/components/Editor/Node.js");






const Group = ({
  field,
  parent
}) => {
  const {
    fields,
    ...fieldActions
  } = (0,_list_functions__WEBPACK_IMPORTED_MODULE_3__["default"])(field._id)();
  const handleAdd = e => {
    // Only handle when drag from the Add Field panel.
    // We need to add a field manually at the given position.
    if (e.from.classList.contains('og-add-field__list')) {
      fieldActions.addFieldAt(e.item.dataset.type, e.newDraggableIndex);
    }
  };

  // If we drag a field type from the Add New panel, it won't have a proper format as a field object
  // As we manually added the field with a correct format in the handleAdd() function above
  // We need to remove the auto-added item by SortableJS.
  const setList = list => fieldActions.setFields([...list].filter(f => f?._id !== undefined));
  console.debug(`%c  Group ${field._id}`, "color:orange");
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CollapsibleElements, {
    field: field
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__.ReactSortable, {
    className: "mb-field--group__fields mb-fields",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: 0,
    animation: 200,
    invertSwap: true,
    group: {
      name: 'nested',
      pull: true,
      // Allow to drag fields to other lists
      put: true // Allow to receive fields from other lists
    },
    list: fields,
    setList: setList,
    onAdd: handleAdd
  }, fields.map(f => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Node__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: f._id,
    field: f,
    parent: `${parent}[${field._id}][fields]`,
    ...fieldActions
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddFieldButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('+ Add Subfield', 'meta-box-builder'),
    variant: "secondary",
    ...fieldActions
  }));
};
const CollapsibleElements = ({
  field
}) => {
  if (!field.collapsible) {
    return;
  }
  const groupTitle = field.group_title || (field.clone ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Entry {#}', 'meta-box-builder') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Entry', 'meta-box-builder'));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rwmb-group-title-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "rwmb-group-title"
  }, groupTitle)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "rwmb-group-toggle-handle button-link"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rwmb-group-toggle-indicator"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);

/***/ })

}]);
//# sourceMappingURL=app_components_Editor_FieldTypePreview_Group_js.app.js.map