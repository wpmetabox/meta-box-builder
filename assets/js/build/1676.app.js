"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1676],{1676:(e,t,l)=>{l.r(t),l.d(t,{default:()=>d});var a=l(1609),r=l(9266),u=l(3366),n=l(5497),c=l(1712);const d=({name:e,componentId:t,placeholder:l,defaultValue:d,...s})=>{const{getPrefix:i}=(0,u.A)(),{getAllFields:f}=(0,r.A)(),m=f().filter((e=>["text","select"].includes(e.type))).map((e=>[e.id,`${e.name} (${e.id})`]));return(0,a.createElement)(n.default,{htmlFor:t,...s},(0,a.createElement)(c.default,{id:t,name:e,defaultValue:d,placeholder:l,required:!0,items:m,onSelect:(e,t)=>{const l=e.current.value?e.current.value+",":"";e.current.value=l+`${i()||""}${t}`}}))}}}]);