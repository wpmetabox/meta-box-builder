(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[1,15],{19:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(22),o=n(20);t.default=function(e){var t=e.name,n=e.type,a=e.index,l=e.data,u=e.removeItem,i=Object(o.c)().register;return c.a.createElement("div",{className:"og-attribute"},c.a.createElement("input",{type:"text",placeholder:"Enter key",ref:i,name:"".concat(t,"-").concat(n,"-").concat(a,"-key"),defaultValue:l.key}),c.a.createElement("input",{type:"text",placeholder:"Enter value",ref:i,name:"".concat(t,"-").concat(n,"-").concat(a,"-value"),defaultValue:l.label}),c.a.createElement("button",{type:"button",className:"button",onClick:function(){return u(a)}},r.g))}},61:function(e,t,n){"use strict";n.r(t);var a=n(25),c=n(6),r=n(0),o=n.n(r),l=n(19);t.default=function(e){var t=Object(r.useState)([]),n=Object(c.a)(t,2),u=n[0],i=n[1],s=function(e){var t=Object(a.a)(u);t.splice(e,1),i(t)};return o.a.createElement("div",{className:"og-attributes"},o.a.createElement("h4",null,o.a.createElement("a",{href:"https://select2.org/configuration",target:"_blank",rel:"noreferrer noopener"},"Select2 options")),u.map((function(t,n){return o.a.createElement(l.default,{data:t,key:n,index:n,removeItem:s,name:"fields-".concat(e.index),type:"js_options"})})),o.a.createElement("button",{type:"button",className:"button",onClick:function(){return i(u.concat({key:"",label:""}))}},"+ Add Option"))}}}]);