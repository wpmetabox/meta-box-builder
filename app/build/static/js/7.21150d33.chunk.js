(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[7,15],{19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(22),o=n(20);t.default=function(e){var t=e.name,n=e.type,a=e.index,u=e.data,l=e.removeItem,s=Object(o.c)().register;return r.a.createElement("div",{className:"og-attribute"},r.a.createElement("input",{type:"text",placeholder:"Enter key",ref:s,name:"".concat(t,"-").concat(n,"-").concat(a,"-key"),defaultValue:u.key}),r.a.createElement("input",{type:"text",placeholder:"Enter value",ref:s,name:"".concat(t,"-").concat(n,"-").concat(a,"-value"),defaultValue:u.label}),r.a.createElement("button",{type:"button",onClick:function(){return l(a)}},c.g))}},78:function(e,t,n){"use strict";n.r(t);var a=n(25),r=n(6),c=n(0),o=n.n(c),u=n(32),l=n(19);t.default=function(e){var t=Object(c.useState)([]),n=Object(r.a)(t,2),s=n[0],i=n[1],m=function(e){var t=Object(a.a)(s);t.splice(e,1),i(t)};return o.a.createElement("div",{className:"og-attributes"},o.a.createElement("h4",null,o.a.createElement("a",{href:"https://developer.wordpress.org/reference/functions/get_terms/",target:"_blank",rel:"noreferrer noopener"},"Query args"),o.a.createElement(u.a,{content:"Query arguments for getting taxonomy terms. Use the same arguments as get_terms()."})),s.map((function(t,n){return o.a.createElement(l.default,{data:t,key:n,index:n,removeItem:m,name:"fields-".concat(e.index),type:"query_args"})})),o.a.createElement("button",{type:"button",onClick:function(){return i(s.concat({key:"",label:""}))}},"+ Add Argument"))}}}]);
//# sourceMappingURL=7.21150d33.chunk.js.map