(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[28],{71:function(e,t,n){"use strict";n.r(t);var a=n(25),c=n(6),r=n(0),o=n.n(r),l=n(22),u=function(e){var t=e.register,n=e.name,a=e.type,c=e.index,r=e.data,u=e.removeItem;return o.a.createElement("div",{className:"og-attribute"},o.a.createElement("input",{type:"text",placeholder:"Enter key",ref:t,name:"".concat(n,"-").concat(a,"-").concat(c,"-key"),defaultValue:r.key}),o.a.createElement("input",{type:"text",placeholder:"Enter label",ref:t,name:"".concat(n,"-").concat(a,"-").concat(c,"-value"),defaultValue:r.label}),o.a.createElement("button",{type:"button",onClick:function(){return u(c)}},l.g))};t.default=function(e){var t=Object(r.useState)(e.data.options),n=Object(c.a)(t,2),l=n[0],i=n[1],p=function(e){var t=Object(a.a)(l);t.splice(e,1),i(t)};return o.a.createElement("div",{className:"og-attributes"},o.a.createElement("h4",null,"Inputs"),l.map((function(t,n){return o.a.createElement(u,{data:t,key:n,index:n,removeItem:p,name:"fields-".concat(e.index),type:"options"})})),o.a.createElement("button",{type:"button",onClick:function(){return i(l.concat({key:"",label:""}))}},"+ Add Input"))}}}]);