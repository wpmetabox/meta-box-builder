"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8858],{8858:(e,t,l)=>{l.r(t),l.d(t,{default:()=>m});var a=l(1609),r=l(7723),n=l(5238),i=l(9266),d=l(2711),s=l(8612);const o=({field:e})=>{if(!e.collapsible)return;const t=e.group_title||(e.clone?(0,r.__)("Entry {#}","meta-box-builder"):(0,r.__)("Entry","meta-box-builder"));return(0,a.createElement)(a.Fragment,null,(0,a.createElement)("div",{className:"rwmb-group-title-wrapper"},(0,a.createElement)("h4",{className:"rwmb-group-title"},t),e.clone&&(0,a.createElement)("a",{href:"#",className:"rwmb-group-remove"},(0,r.__)("Remove","meta-box-builder"))),(0,a.createElement)("button",{className:"rwmb-group-toggle-handle button-link"},(0,a.createElement)("span",{className:"rwmb-group-toggle-indicator"})))},m=({field:e,parent:t})=>{const{getForList:l}=(0,i.A)(),{fields:m,...c}=l(e._id);return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(o,{field:e}),(0,a.createElement)(n.ReactSortable,{className:"mb-field--group__fields",delay:0,delayOnTouchOnly:!1,touchStartThreshold:0,animation:200,invertSwap:!0,group:{name:"nested",pull:!0,put:!0},list:m,setList:e=>c.setFields([...e].filter((e=>void 0!==e?._id))),onAdd:e=>{e.from.classList.contains("og-add-field__list")&&c.addFieldAt(e.item.dataset.type,e.newDraggableIndex)}},m.map((l=>(0,a.createElement)(s.A,{key:l._id,field:l,parent:`${t}[${e._id}][fields]`,...c})))),(0,a.createElement)(d.A,{text:(0,r.__)("+ Add Subfield","meta-box-builder"),variant:"secondary",...c}))}}}]);