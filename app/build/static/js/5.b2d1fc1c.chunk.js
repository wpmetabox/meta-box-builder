(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[5,15],{19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(22),o=n(20);t.default=function(e){var t=e.name,n=e.type,a=e.index,l=e.data,u=e.removeItem,i=Object(o.c)().register;return r.a.createElement("div",{className:"og-attribute"},r.a.createElement("input",{type:"text",placeholder:"Enter key",ref:i,name:"".concat(t,"-").concat(n,"-").concat(a,"-key"),defaultValue:l.key}),r.a.createElement("input",{type:"text",placeholder:"Enter value",ref:i,name:"".concat(t,"-").concat(n,"-").concat(a,"-value"),defaultValue:l.label}),r.a.createElement("button",{type:"button",onClick:function(){return u(a)}},c.e))}},73:function(e,t,n){"use strict";n.r(t);var a=n(25),r=n(6),c=n(0),o=n.n(c),l=n(19);t.default=function(e){var t=Object(c.useState)([]),n=Object(r.a)(t,2),u=n[0],i=n[1],s=function(e){var t=Object(a.a)(u);t.splice(e,1),i(t)};return o.a.createElement("div",{className:"og-attributes"},o.a.createElement("h4",null,o.a.createElement("a",{href:"https://developer.wordpress.org/reference/functions/wp_editor/",target:"_blank",rel:"noopener noreferrer"},"Editor options")),u.map((function(t,n){return o.a.createElement(l.default,{data:t,key:n,index:n,removeItem:s,name:"fields-".concat(e.index),type:"options"})})),o.a.createElement("button",{type:"button",className:"button",onClick:function(){return i(u.concat({key:"",label:""}))}},"+ Add Input"))}}}]);