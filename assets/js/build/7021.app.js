"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7021],{7021:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var n=a(1609),l=a(6087),u=a(7691);const r=({defaultValue:e,componentId:t,name:a,...r})=>{const[c,m]=(0,l.useState)(e),o=(0,l.useRef)(),p=(0,l.useRef)(),i=c.replace(/[^0-9]+/,"").trim(),s=c.replace(/[0-9]+/,"").trim()||"kb",d=i&&s?c:"",f=()=>m(`${o.current.value}${p.current.value}`);return(0,n.createElement)(u.default,{htmlFor:t,...r},(0,n.createElement)("input",{type:"hidden",name:a,defaultValue:d}),(0,n.createElement)("div",{className:"og-input-group og-input-group--small"},(0,n.createElement)("input",{type:"number",min:"0",id:t,ref:o,defaultValue:i,onChange:f}),(0,n.createElement)("select",{ref:p,defaultValue:s,onChange:f},(0,n.createElement)("option",{value:"kb"},"KB"),(0,n.createElement)("option",{value:"mb"},"MB"),(0,n.createElement)("option",{value:"gb"},"GB"))))}}}]);