"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8858],{8858:(e,t,l)=>{l.r(t),l.d(t,{default:()=>c});var r=l(1609),a=l(7723),n=l(5238),i=l(9266),m=l(2711),s=l(8612);const o=({field:e})=>{if(!e.collapsible)return;const t=e.group_title||(e.clone?(0,a.__)("Entry {#}","meta-box-builder"):(0,a.__)("Entry","meta-box-builder"));return(0,r.createElement)(r.Fragment,null,(0,r.createElement)("div",{className:"rwmb-group-title-wrapper"},(0,r.createElement)("h4",{className:"rwmb-group-title"},t),e.clone&&(0,r.createElement)("a",{href:"#",className:"rwmb-group-remove"},(0,a.__)("Remove","meta-box-builder"))),(0,r.createElement)("button",{className:"rwmb-group-toggle-handle button-link"},(0,r.createElement)("span",{className:"rwmb-group-toggle-indicator"})))},c=({field:e,parent:t})=>{const{getForList:l}=(0,i.A)(),{fields:c,setFields:d,...u}=l(e._id);return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o,{field:e}),(0,r.createElement)(n.ReactSortable,{group:{name:"nested",pull:!0,put:["root","nested"]},animation:200,delayOnTouchStart:!0,delay:2,list:c,setList:d,invertSwap:!0,className:"mb-field--group__fields"},c.map((l=>(0,r.createElement)(s.A,{key:l._id,field:l,parent:`${t}[${e._id}][fields]`,...u})))),(0,r.createElement)(m.A,{text:(0,a.__)("+ Add Subfield","meta-box-builder"),variant:"secondary",...u}))}}}]);