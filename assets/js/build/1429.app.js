"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1429],{1429:(e,t,a)=>{a.r(t),a.d(t,{default:()=>_});var l=a(1609),r=a(7723),b=a(9266),m=a(3366),o=a(5497),u=a(1712);const i=e=>"term"===e?[["cb",(0,r.__)("Checkbox","meta-box-builder")],["name",(0,r.__)("Name","meta-box-builder")],["description",(0,r.__)("Description","meta-box-builder")],["slug",(0,r.__)("Slug","meta-box-builder")],["count",(0,r.__)("Count","meta-box-builder")]]:"user"===e?[["cb",(0,r.__)("Checkbox","meta-box-builder")],["username",(0,r.__)("Username","meta-box-builder")],["name",(0,r.__)("Name","meta-box-builder")],["email",(0,r.__)("Email","meta-box-builder")],["role",(0,r.__)("Role","meta-box-builder")],["posts",(0,r.__)("Posts","meta-box-builder")]]:[["cb",(0,r.__)("Checkbox","meta-box-builder")],["title",(0,r.__)("Title","meta-box-builder")],["author",(0,r.__)("Author","meta-box-builder")],["categories",(0,r.__)("Categories","meta-box-builder")],["tags",(0,r.__)("Tags","meta-box-builder")],["comments",(0,r.__)("Comments","meta-box-builder")],["date",(0,r.__)("Date","meta-box-builder")]],_=({name:e,componentId:t,defaultValue:a,..._})=>{const{getObjectType:d}=(0,m.A)(),n=d(),c={term:"name",user:"username"}[n]||"title",{getAllFields:s}=(0,b.A)();let x=s().filter((e=>["text","select"].includes(e.type))).map((e=>[e.id,`${e.name} (${e.id})`]));return x=[...i(n),...x],(0,l.createElement)(o.default,{..._},(0,l.createElement)("select",{name:`${e}[type]`,defaultValue:a.type||"after"},(0,l.createElement)("option",{value:"after"},(0,r.__)("After","meta-box-builder")),(0,l.createElement)("option",{value:"before"},(0,r.__)("Before","meta-box-builder")),(0,l.createElement)("option",{value:"replace"},(0,r.__)("Replace","meta-box-builder"))),(0,l.createElement)(u.default,{id:t,name:`${e}[column]`,defaultValue:a.column||c,items:x,isID:!0,exclude:i(n)}))}}}]);