"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5953],{5953:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var a=n(1609),r=n(6087),u=n(3344),c=n(7691);const d=({name:e,componentId:t,field:n,updateField:d,...l})=>{const i=(0,r.useRef)(),[s,o]=(0,r.useState)();return(0,r.useLayoutEffect)((()=>{s&&i.current&&([i.current.selectionStart,i.current.selectionEnd]=s)}),[s]),(0,a.createElement)(c.default,{htmlFor:t,...l},(0,a.createElement)("input",{ref:i,type:"text",id:t,name:e,value:n.name,onBlur:()=>d("_id_changed",!0),onInput:e=>{var t;d("name",e.target.value),t=e.target.value,["custom_html","divider","heading"].includes(n.type)||n._new&&(n._id_changed||d("id",(0,u.ni)(t))),o([e.target.selectionStart,e.target.selectionEnd])}}))}}}]);