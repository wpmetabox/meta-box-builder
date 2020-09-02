(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[50],{22:function(e,t,a){"use strict";a.d(t,"d",(function(){return c})),a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"e",(function(){return s}));var n=a(0),r=a.n(n),c=r.a.createElement("svg",{viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"})),l=r.a.createElement("svg",{viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M14,8H4c-1.103,0-2,0.897-2,2v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V10C16,8.897,15.103,8,14,8z"}),r.a.createElement("path",{d:"M20,2H10C8.896,2,8,2.896,8,4v2h1h7c1.104,0,2,0.896,2,2v7v1h2c1.104,0,2-0.896,2-2V4C22,2.896,21.104,2,20,2z"})),i=r.a.createElement("svg",{viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M11.998 17L18.998 9 4.998 9z"})),o=r.a.createElement("svg",{viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M5 15L19 15 12 7z"})),s=r.a.createElement("svg",{viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M16.207,14.793l-1.414,1.414L12,13.414 l-2.793,2.793l-1.414-1.414L10.586,12L7.793,9.207l1.414-1.414L12,10.586l2.793-2.793l1.414,1.414L13.414,12L16.207,14.793z"}))},24:function(e,t,a){"use strict";var n=a(21),r=a(0),c=a.n(r),l=a(26),i=a(20);t.a=function(e){var t=e.name,a=e.defaultValue,r=e.type,o=void 0===r?"text":r,s=Object(n.a)(e,["name","defaultValue","type"]),d=Object(i.c)().register;return c.a.createElement(l.a,Object.assign({htmlFor:t},s),c.a.createElement("input",{type:o,id:t,name:t,ref:d,defaultValue:a}))}},26:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(32);t.a=function(e){var t=e.label,a=e.children,n=e.className,l=void 0===n?"":n,i=e.htmlFor,o=void 0===i?"":i,s=e.description,d=void 0===s?"":s,m=e.tooltip,u=void 0===m?"":m,p=e.keyValue,g=void 0===p?"":p,f=e.required,b=void 0!==f&&f;return r.a.createElement("div",{className:"og-field ".concat(l),key:g},r.a.createElement("label",{className:"og-label",htmlFor:o},r.a.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),b&&r.a.createElement("span",{className:"og-required"},"*"),u&&r.a.createElement(c.a,{id:o,content:u})),r.a.createElement("div",{className:"og-input"},a,d&&r.a.createElement("div",{className:"og-description"},d)))}},27:function(e,t,a){"use strict";var n=a(21),r=a(0),c=a.n(r),l=a(26),i=a(20);t.a=function(e){var t=e.name,a=e.defaultValue,r=Object(n.a)(e,["name","defaultValue"]),o=Object(i.c)().register;return c.a.createElement(l.a,Object.assign({htmlFor:t},r),c.a.createElement("input",{type:"checkbox",id:t,name:t,ref:o,defaultChecked:a}))}},311:function(e,t,a){"use strict";a.r(t),a.d(t,"MainTabs",(function(){return X}));var n=a(6),r=a(0),c=a.n(r),l=(a(294),a(20)),i=a(38),o=a(24),s=a(27),d=a(26),m=function(e){var t=e.register;return c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",null,"Options"),c.a.createElement(o.a,{register:t,name:"title",label:"Meta box title",defaultValue:"Untitled"}),c.a.createElement(o.a,{register:t,name:"id",label:"Meta box ID",defaultValue:"untitled"}),c.a.createElement(d.a,{label:"Post types",className:"og-field--check"},c.a.createElement("label",null,c.a.createElement("input",{type:"checkbox",ref:t,name:"post_types",value:"post",defaultChecked:!0})," Post"),c.a.createElement("label",null,c.a.createElement("input",{type:"checkbox",ref:t,name:"post_types",value:"page"})," Page")),c.a.createElement(d.a,{label:"Position",htmlFor:"context"},c.a.createElement("select",{ref:t,id:"context",name:"context",defaultValue:"advanced"},c.a.createElement("option",{value:"normal"},"After content"),c.a.createElement("option",{value:"side"},"Side"),c.a.createElement("option",{value:"form_top"},"Before post title"),c.a.createElement("option",{value:"after_title"},"After post title"))),c.a.createElement(d.a,{label:"Priority",className:"og-field--check"},c.a.createElement("label",null,c.a.createElement("input",{ref:t,type:"radio",name:"priority",value:"high",defaultChecked:!0})," High"),c.a.createElement("label",null,c.a.createElement("input",{ref:t,type:"radio",name:"priority",value:"low"})," Low")),c.a.createElement(s.a,{register:t,name:"autosave",label:"Autosave"}),c.a.createElement("h3",null,"Advanced"),c.a.createElement(o.a,{register:t,name:"prefix",label:"Field ID prefix",defaultValue:"prefix-",description:"Prefix for all fields' ID. Leave empty to ignore or use _ to make fields hidden.",tooltip:"Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins."}),c.a.createElement(o.a,{register:t,name:"text_domain",label:"Text domain",defaultValue:"online-generator",tooltip:"Required for multilingual website. Used in the exported code only."}))},u=a(25),p=a(2),g=a(1),f=a(22),b=function(e){var t=e.onSelectField,a=Object(r.useState)("Basic"),l=Object(n.a)(a,2),i=l[0],o=l[1];return c.a.createElement(c.a.Fragment,null,Object.keys(g.i).map((function(e,a){return c.a.createElement("div",{className:"og-panel og-collapsible".concat(e===i?" og-collapsible--expanded":""),key:a},c.a.createElement("h4",{className:"og-collapsible__header",onClick:function(){return o(e)}},e,e===i?f.b:f.a),c.a.createElement("div",{className:"og-panel__body og-collapsible__body"},Object.keys(g.i[e]).map((function(a,n){return c.a.createElement("button",{type:"button",className:"button",key:n,onClick:function(){return t(a)}},g.i[e][a])}))))})))},E=a(7),v=function(e){var t=function(e){var t=[];return Object.values(g.i).forEach((function(a){Object.keys(a).forEach((function(n){a[n].toLowerCase().includes(e.toLowerCase())&&t.push({type:n,title:a[n]})}))})),t}(e.searchParam);return c.a.createElement("div",{className:"og-search-results"},t.map((function(t,a){return c.a.createElement("button",{type:"button",className:"button",onClick:function(){return e.onSelectField(t.type)},key:a},t.title)})))},y=Object(r.memo)((function(e){return c.a.createElement("div",{className:"og-item__content"},Object.keys(e.fieldData).map((function(t,n){return c.a.createElement(r.Suspense,{fallback:null,key:t+n},function(t){var n=Object(E.b)(t,e.type),l=Object(r.lazy)((function(){return a(39)("./".concat(n))}));return c.a.createElement(l,{name:"fields-".concat(e.index,"-").concat(t),label:t,setLabel:e.setLabel,defaultValue:e.fieldData[t],data:e.fieldData,index:e.index,type:e.type})}(t))})))}),(function(e,t){return e.index===t.index})),j=Object(r.memo)((function(e){return c.a.createElement("div",{className:"og-item__content"},Object.keys(e.data).map((function(t,n){return c.a.createElement(r.Suspense,{fallback:null,key:t+n},function(t){var n=Object(E.b)(t,e.type),l=Object(r.lazy)((function(){return a(39)("./".concat(n))}));return c.a.createElement(l,{name:"fields-".concat(e.index,"-").concat(t),label:t,defaultValue:e.data[t],data:e.data,type:e.type,index:e.index})}(t))})))})),h=a(33),x={CARD:"card",CONTAINER:"container"},O=a(297),_={beginDrag:function(e){return{id:e.id,parent:e.parent}},endDrag:function(e,t){if(t.didDrop()){var a=t.getItem(),n=t.getDropResult(),r=Object(E.d)(),c=k(a.id,n.parent,n.index);r!==c&&e.changeSelectedList(c)}}},S=function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}},N=Object(O.a)((function e(t,a,n,r,c){t.id===a&&r(t,c,n),t.items&&t.items.map((function(n,c){n&&e(n,a,c,r,t)}))})),k=function(e,t,a,n){var r=null,c=null,l=Object(E.d)();if(N(l,t,0,(function(e){r=e})),r&&(N(l,e,0,(function(e,a,r){if(a=a||l,c=C(c=e),V(n)){var i=T(Object(p.a)({},c));a.items.splice(r+1,0,i)}(M(n)||A(a.id,t))&&a.items.splice(r,1)})),c))return M(n)&&r.items.splice(a,0,c),Object(E.f)(l),l},C=function e(t){var a=Object(p.a)({},t),n=t.items;return a.data=Object(E.a)(t.type,t.id),n&&(a.items=[],n.map((function(t){I?a.items.push(Object(p.a)({},t,{data:Object(E.a)(t.type,t.id)})):a.items.push(e(t))}))),a},D=function(e,t,a){return k(e,t,a,"copy")},L=function(e,t,a){return k(e,t,a,"delete")},T=function(e){var t=Object(p.a)({},e),a="".concat(e.type,"_").concat(F());return t.id=a,t.data.general.id=a,t.data.general.name+=" Copy",t},I=function(e){return"group"!==e},V=function(e){return"copy"===e},A=function(e,t){return e===t},M=function(e){return"delete"!==e},F=function(){return Math.random().toString(36).substr(2)},P=function(e){return c.a.createElement("div",{className:"og-item__header og-collapsible__header",onClick:e.toggleSettings},c.a.createElement("div",{className:"og-item__title",id:"og-item__title__".concat(e.index)},e.name||Object(E.e)(e.type)),c.a.createElement("div",{className:"og-item__actions"},c.a.createElement("span",{className:"og-item__type"},e.type),c.a.createElement("span",{className:"og-item__action og-item__action--remove",title:"Remove",onClick:function(t){t.stopPropagation();var a=L(e.index,e.parent,e.indexVal);e.changeSelectedList(a)}},f.d),c.a.createElement("span",{className:"og-item__action og-item__action--duplicate",title:"Duplicate",onClick:function(t){t.stopPropagation();var a=D(e.index,e.parent,e.indexVal);e.changeSelectedList(a)}},f.c),c.a.createElement("span",{className:"og-item__action og-item__action--toggle",title:"Toggle Settings"},e.expanded?f.b:f.a)))},w=Object(r.memo)(Object(h.DragSource)(x.CARD,_,S)((function(e){var t=e.connectDragSource,a=e.data.general.type,l=e.id,o=Object(r.useState)(!1),s=Object(n.a)(o,2),d=s[0],m=s[1];return t(c.a.createElement("div",{className:"og-item og-item--".concat(a," og-collapsible").concat(d?" og-collapsible--expanded":"")},c.a.createElement("li",{className:"d",id:"list"},c.a.createElement("input",{ref:e.register,type:"hidden",name:"fields-".concat(l,"-type"),defaultValue:a}),c.a.createElement(P,{type:a,index:l,name:e.data.general.name,expanded:d,copyItem:e.copyItem,removeItem:e.removeItem,toggleSettings:function(){return m(!d)},changeSelectedList:e.changeSelectedList,parent:e.parent,indexVal:e.indexVal}),c.a.createElement("div",{className:"og-item__body og-collapsible__body"},c.a.createElement(i.d,{forceRenderTabPanel:!0},c.a.createElement(i.b,null,c.a.createElement(i.a,null,"General"),c.a.createElement(i.a,null,"Advanced")),c.a.createElement(i.c,null,c.a.createElement(y,{type:a,index:l,fieldData:e.data.general})),c.a.createElement(i.c,null,c.a.createElement(j,{type:a,index:l,data:e.data.advanced})))))))})),(function(e,t){return e.id===t.id})),R=function(e){return c.a.createElement("div",{className:"og-item__header og-collapsible__header",onClick:e.toggleSettings},c.a.createElement("div",{className:"og-item__title",id:"og-item__title__".concat(e.index)},e.name||Object(E.e)(e.type)),c.a.createElement("div",{className:"og-item__actions"},c.a.createElement("span",{className:"og-item__type"},e.type),c.a.createElement("span",{className:"og-item__action og-item__action--remove",title:"Remove",onClick:function(t){t.stopPropagation();var a=L(e.index,e.parent,e.indexVal);e.changeSelectedList(a)}},f.d),c.a.createElement("span",{className:"og-item__action og-item__action--duplicate",title:"Duplicate",onClick:function(t){t.stopPropagation();var a=D(e.index,e.parent,e.indexVal);e.changeSelectedList(a)}},f.c),c.a.createElement("span",{className:"og-item__action og-item__action--toggle",title:"Toggle Settings"},e.expanded?f.b:f.a)))},z=Object(r.memo)(Object(h.DragSource)(x.CARD,_,S)((function(e){var t=e.connectDragSource,a=e.data.general.type,l=e.id,o=Object(r.useState)(!1),s=Object(n.a)(o,2),d=s[0],m=s[1],u=function(){return m(!d)};return t("divider"===a?c.a.createElement("div",{className:"og-item og-item--".concat(a," og-collapsible").concat(d?" og-collapsible--expanded":"")},c.a.createElement("input",{ref:e.register,type:"hidden",name:"fields-".concat(l,"-type"),defaultValue:a}),c.a.createElement(R,{type:a,index:l,name:e.data.general.name,expanded:d,copyItem:e.copyItem,removeItem:e.removeItem,toggleSettings:u}),c.a.createElement("div",{className:"og-item__body og-collapsible__body"},c.a.createElement(y,{type:a,index:l,fieldData:e.data.general}))):c.a.createElement("div",{className:"og-item og-item--".concat(a," og-collapsible").concat(d?" og-collapsible--expanded":"")},c.a.createElement("li",{className:"d",id:"leaf"},c.a.createElement("input",{ref:e.register,type:"hidden",name:"fields-".concat(l,"-type"),defaultValue:a}),c.a.createElement(R,{type:a,index:l,name:e.data.general.name,expanded:d,copyItem:e.copyItem,removeItem:e.removeItem,toggleSettings:u,changeSelectedList:e.changeSelectedList,parent:e.parent,indexVal:e.indexVal}),c.a.createElement("div",{className:"og-item__body og-collapsible__body"},c.a.createElement(i.d,{forceRenderTabPanel:!0},c.a.createElement(i.b,null,c.a.createElement(i.a,null,"General"),c.a.createElement(i.a,null,"Advanced")),c.a.createElement(i.c,null,c.a.createElement(y,{type:a,index:l,fieldData:e.data.general})),c.a.createElement(i.c,null,c.a.createElement(j,{type:a,index:l,data:e.data.advanced})))))))})),(function(e,t){return e.id===t.id}));var B=Object(r.memo)(Object(h.DropTarget)(x.CARD,{drop:function(e,t,a){return{parent:e.parent,index:e.index}},canDrop:function(e,t){var a=t.getItem();return t.isOver({shallow:!0})&&-1===[e.id,e.parent].indexOf(a.id)}},(function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver(),isOverCurrent:t.isOver({shallow:!0})}}))((function(e){var t=e.isOverCurrent;return(0,e.connectDropTarget)(c.a.createElement("div",{className:"og-drop-area".concat(t?" og-drop-area--active":"")}))}))),J=function(e){var t=e.id,a=e.items,n=e.changeSelectedList;return c.a.createElement(c.a.Fragment,null,c.a.createElement("ul",null,a.map((function(e,a){return c.a.createElement("div",{key:e.id},c.a.createElement(B,{parent:t,index:a}),c.a.createElement(H,{key:e.id,id:e.id,item:e,parent:t,index:a,changeSelectedList:n}))})),c.a.createElement(B,{index:a.length,parent:t})),0===a.length&&c.a.createElement("div",{className:"og-group-drop-area"},"Drag and drop child fields here."))},H=Object(r.memo)((function(e){var t=e.id,a=e.item,n=e.changeSelectedList,r=e.parent,l=e.index;return"group"===a.data.general.type?c.a.createElement(c.a.Fragment,null,c.a.createElement(w,{id:t,data:a.data,items:a.items,parent:r,indexVal:l,changeSelectedList:n}),c.a.createElement(J,{id:t,items:a.items,parent:r,changeSelectedList:n})):c.a.createElement(z,{data:a.data,id:t,parent:r,indexVal:l,changeSelectedList:n})}),(function(e,t){return"group"!==t.item.type&&e.id===t.id})),Q=Object(r.memo)((function(e){var t=e.id,a=e.item,n=e.changeSelectedList,r=e.index;return c.a.createElement("div",{key:a.id},c.a.createElement(B,{index:r,parent:t}),c.a.createElement(H,{id:a.id,item:a,parent:t,index:r,changeSelectedList:n}))})),U=function(){return Math.random().toString(36).substr(2)},G=function(e){var t=Object(r.useState)({id:"root",items:[]}),a=Object(n.a)(t,2),l=a[0],i=a[1],o=Object(r.useState)(""),s=Object(n.a)(o,2),d=s[0],m=s[1],f=function(e){var t="".concat(e,"_").concat(U()),a=Object(p.a)({},g.j[e],{general:Object(p.a)({},g.j[e].general,{id:t})}),n=Object(p.a)({},l,{items:[].concat(Object(u.a)(l.items),[{id:t,type:e,data:a,items:[]}])});i(n),Object(E.f)(n)},y=Object(r.useCallback)((function(e){return i(e)}),[]);return c.a.createElement("div",{className:"og-fields-wrapper"},c.a.createElement("div",{className:"og-sidebar"},c.a.createElement("input",{type:"search",className:"og-search",placeholder:"Enter field type here",onChange:function(e){return m(e.target.value)}}),d?c.a.createElement(v,{onSelectField:f,searchParam:d}):c.a.createElement(b,{onSelectField:f})),c.a.createElement("div",{className:"og-main"},0===l.items.length&&c.a.createElement("p",null,"No fields. Select fields on the left to add them to this field group."),c.a.createElement("ul",null,l.items.map((function(e,t){return c.a.createElement(Q,{key:e.id+t,id:"root",item:e,index:t,changeSelectedList:y})})))))},q=a(310),K=a(305),W=a(9),X=function(){var e=Object(l.b)(),t=e.handleSubmit,a=e.register,o=e.control,s=Object(l.b)(),d=Object(r.useContext)(W.a),u=Object(r.useState)(!1),p=Object(n.a)(u,2),g=p[0],f=p[1];return Object(r.useEffect)((function(){return f(!1)}),[d.state.responseTime]),c.a.createElement(l.a,Object.assign({},s,{register:a,control:o}),c.a.createElement("form",{onSubmit:t((function(e){f(!0),W.c.generatePHPCode(e)}))},c.a.createElement(i.d,{forceRenderTabPanel:!0},c.a.createElement(i.b,null,c.a.createElement(i.a,null,"Fields"),c.a.createElement(i.a,null,"Settings")),c.a.createElement(i.c,null,c.a.createElement(q.a,{backend:K.a},c.a.createElement(G,null))),c.a.createElement(i.c,null,c.a.createElement(m,{register:a}))),c.a.createElement("button",{type:"submit",className:"button button-primary",disabled:g},"Generate Code")," ",g&&c.a.createElement("span",{className:"og-loading"},"Generating code. Please wait...")))};t.default=X},32:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(306);t.a=function(e){var t=e.id,a=e.content;return r.a.createElement(r.a.Fragment,null,r.a.createElement("svg",{viewBox:"0 0 24 24",className:"og-tooltip-icon","data-for":"tooltip-".concat(t),"data-tip":a},r.a.createElement("path",{d:"M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"})),r.a.createElement(c.a,{id:"tooltip-".concat(t),effect:"solid"}))}},39:function(e,t,a){var n={"./AddressField":[49,14],"./AddressField.js":[49,14],"./AdvancedAdditionalItem":[19,15],"./AdvancedAdditionalItem.js":[19,15],"./After":[50,9],"./After.js":[50,9],"./ApiKey":[51,16],"./ApiKey.js":[51,16],"./Attributes":[52,0],"./Attributes.js":[52,0],"./Before":[53,10],"./Before.js":[53,10],"./Clone":[54,17],"./Clone.js":[54,17],"./Desc":[55,11],"./Desc.js":[55,11],"./FieldType":[56,18],"./FieldType.js":[56,18],"./ForceDelete":[57,19],"./ForceDelete.js":[57,19],"./Id":[58,20],"./Id.js":[58,20],"./Inline":[59,21],"./Inline.js":[59,21],"./InlineDate":[60,22],"./InlineDate.js":[60,22],"./JsOptions":[61,1],"./JsOptions.js":[61,1],"./JsOptionsDate":[62,2],"./JsOptionsDate.js":[62,2],"./JsOptionsSlider":[63,3],"./JsOptionsSlider.js":[63,3],"./JsOptionsTime":[64,4],"./JsOptionsTime.js":[64,4],"./MaxStatus":[65,23],"./MaxStatus.js":[65,23],"./MimeType":[66,24],"./MimeType.js":[66,24],"./Multiple":[67,25],"./Multiple.js":[67,25],"./Name":[68,26],"./Name.js":[68,26],"./NumberInput":[69,27],"./NumberInput.js":[69,27],"./Options":[70,12],"./Options.js":[70,12],"./OptionsFieldsetText":[71,28],"./OptionsFieldsetText.js":[71,28],"./OptionsTextList":[72,29],"./OptionsTextList.js":[72,29],"./OptionsWysiwyg":[73,5],"./OptionsWysiwyg.js":[73,5],"./Parent":[74,30],"./Parent.js":[74,30],"./PostType":[75,31],"./PostType.js":[75,31],"./Prefix":[76,32],"./Prefix.js":[76,32],"./QueryArgs":[77,6],"./QueryArgs.js":[77,6],"./QueryArgsTaxonomy":[78,7],"./QueryArgsTaxonomy.js":[78,7],"./QueryArgsUser":[79,8],"./QueryArgsUser.js":[79,8],"./RadioCheckbox":[80,33],"./RadioCheckbox.js":[80,33],"./Raw":[81,34],"./Raw.js":[81,34],"./Region":[82,35],"./Region.js":[82,35],"./StdButton":[83,36],"./StdButton.js":[83,36],"./StdCheckbox":[84,37],"./StdCheckbox.js":[84,37],"./StdChoice":[85,13],"./StdChoice.js":[85,13],"./StdMap":[86,38],"./StdMap.js":[86,38],"./Step":[87,39],"./Step.js":[87,39],"./Suffix":[88,40],"./Suffix.js":[88,40],"./Taxonomy":[89,41],"./Taxonomy.js":[89,41],"./TextInput":[90,42],"./TextInput.js":[90,42],"./Timestamp":[91,43],"./Timestamp.js":[91,43],"./Type":[92,44],"./Type.js":[92,44]};function r(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return a.e(t[1]).then((function(){return a(r)}))}r.keys=function(){return Object.keys(n)},r.id=39,e.exports=r}}]);