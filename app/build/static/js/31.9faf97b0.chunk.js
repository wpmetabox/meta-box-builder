(this["webpackJsonponeline-generator"]=this["webpackJsonponeline-generator"]||[]).push([[31],{75:function(e,t,n){"use strict";n.r(t);var s=n(6),a=n(21),c=n(0),r=n.n(c),o=n(26),i=n(10);t.default=function(e){var t=e.name,n=e.register,u=Object(a.a)(e,["name","register"]),l=Object(c.useContext)(i.a).state,p=Object(c.useState)([]),f=Object(s.a)(p,2),b=f[0],m=f[1];return Object(c.useEffect)((function(){l.posts||i.c.getFieldTypes("posts")}),[]),Object(c.useEffect)((function(){l.posts&&m(l.posts)}),[l]),r.a.createElement(o.a,Object.assign({},u,{htmlFor:t,label:"Post type"}),r.a.createElement("select",{ref:n,id:t,name:t,multiple:!0},b.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.text)}))))}}}]);
//# sourceMappingURL=31.9faf97b0.chunk.js.map