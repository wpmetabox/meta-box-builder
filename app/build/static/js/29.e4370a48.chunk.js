(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[29],{72:function(e,t,a){"use strict";a.r(t);var n=a(25),c=a(6),r=a(0),o=a.n(r),l=a(22),u=function(e){var t=e.register,a=e.name,n=e.type,c=e.index,r=e.data,u=e.removeItem;return o.a.createElement("div",{className:"og-attribute"},o.a.createElement("input",{type:"text",placeholder:"Placeholder",ref:t,name:"".concat(a,"-").concat(n,"-").concat(c,"-key"),defaultValue:r.key}),o.a.createElement("input",{type:"text",placeholder:"Label",ref:t,name:"".concat(a,"-").concat(n,"-").concat(c,"-value"),defaultValue:r.label}),o.a.createElement("button",{type:"button",className:"button",onClick:function(){return u(c)}},l.g))};t.default=function(e){var t=Object(r.useState)([]),a=Object(c.a)(t,2),l=a[0],i=a[1],s=function(e){var t=Object(n.a)(l);t.splice(e,1),i(t)};return o.a.createElement("div",{className:"og-attributes"},o.a.createElement("h4",null,"Inputs"),l.map((function(t,a){return o.a.createElement(u,{data:t,key:a,index:a,removeItem:s,name:"fields-".concat(e.index),type:"options"})})),o.a.createElement("button",{type:"button",className:"button",onClick:function(){return i(l.concat({key:"",label:""}))}},"+ Add Input"))}}}]);