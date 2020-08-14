(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[9],{377:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"c",(function(){return c})),t.d(a,"b",(function(){return r}));var n={categoryNameEnglish:"",categoryNameMalayalam:"",image:null,status:!1,isDeleted:!1,priority:null},c={_id:null,categoryId:null,active:!1,productNameEnglish:"",productNameMalayalam:"",unit:"1kg",actualPrice:"",sellingPrice:"",isDeleted:!1,validity:{startTime:null,endTime:null},description:"",image:null,priority:null},r={_id:null,active:!1,location:""}},861:function(e,a,t){"use strict";t.r(a);var n=t(99),c=t(419),r=t(42),l=t(0),i=t.n(l),u=t(860),s=t(603),m=t(82),d=t(339),o=t(856),b=t(44),g=t(377),f=t(63),E=(t(168),t(341)),v=t(600),p=t(340),O=t(859),j=t(429),y=t(500),h=t(497),k=t.n(h),I=t(857),N=i.a.memo((function(e){var a=e.value,t=e.onChange,n=Object(l.useState)(a?k()(a,"HH:mm"):void 0),c=Object(r.a)(n,2),u=c[0],s=c[1];Object(l.useEffect)((function(){s(a&&"undefined"!==a?k()(a,"HH:mm"):null)}),[a]);var m=Object(l.useCallback)((function(e){t&&t(e)}),[t]),d=Object(l.useCallback)((function(e){s(e);var a=e?e.format("HH:mm"):void 0;m(a)}),[m]);return i.a.createElement("span",null,i.a.createElement(I.a,{onChange:d,value:u,style:{width:"150px"},placeholder:"Hour:Minutes",format:"HH:mm",use12Hours:!0}))})),P=E.a.TextArea,C=v.a.Option,x=function(e){var a=e.visibility,t=e.handleCancel,c=e.handleSave,u=e.value,s=p.a.useForm(),m=Object(r.a)(s,1)[0],d=Object(l.useState)(null),o=Object(r.a)(d,2),b=o[0],g=o[1];Object(l.useEffect)((function(){(0,m.setFieldsValue)(Object(n.a)({},u)),g(null)}),[u,m]);return i.a.createElement(O.a,{visible:a,okText:u._id?"Save":"Add",onOk:function(){var e=m.getFieldsValue;(0,m.validateFields)().then((function(){var a=e();c(Object(n.a)(Object(n.a)(Object(n.a)({},u),a),{},{image:b}))}))},onCancel:t,closable:!1},i.a.createElement(p.a,{form:m},i.a.createElement(p.a.Item,{name:["productNameEnglish"],label:"Category Name in English",rules:[{required:!0,message:"Name is rquired"}]},i.a.createElement(E.a,null)),i.a.createElement(p.a.Item,{name:["productNameMalayalam"],label:"Category Name in Malayalam",rules:[{required:!0,message:"Name is required"}]},i.a.createElement(E.a,null)),i.a.createElement(p.a.Item,{name:["unit"],label:"Unit",rules:[{required:!0,message:"Unit is required"}]},i.a.createElement(v.a,null,i.a.createElement(C,{value:"1Piece"},"1Piece"),i.a.createElement(C,{value:"100g"},"100g"),i.a.createElement(C,{value:"200g"},"200g"),i.a.createElement(C,{value:"250g"},"250g"),i.a.createElement(C,{value:"300g"},"300g"),i.a.createElement(C,{value:"500g"},"500g"),i.a.createElement(C,{value:"750g"},"750g"),i.a.createElement(C,{value:"1kg"},"1Kg"),i.a.createElement(C,{value:"2kg"},"2Kg"),i.a.createElement(C,{value:"250l"},"250l"),i.a.createElement(C,{value:"500l"},"500l"),i.a.createElement(C,{value:"1l"},"1l"))),i.a.createElement(p.a.Item,{name:["actualPrice"],label:"Actual Price",rules:[{required:!0,message:"Actual price is required"}]},i.a.createElement(E.a,null)),i.a.createElement(p.a.Item,{name:["sellingPrice"],label:"Selling Price",rules:[{required:!0,message:"Price is required"}]},i.a.createElement(E.a,null)),i.a.createElement(p.a.Item,{name:["priority"],label:"Priority"},i.a.createElement(E.a,null)),i.a.createElement(j.a,null,i.a.createElement(y.a,{span:12},i.a.createElement(p.a.Item,{name:["startTime"],label:"Start Time",rules:[]},i.a.createElement(N,{format:"HH:mm"}))),i.a.createElement(y.a,{span:12},i.a.createElement(p.a.Item,{name:["endTime"],label:"Start Time",rules:[]},i.a.createElement(N,{format:"HH:mm"})))),i.a.createElement(p.a.Item,{name:["description"],label:"Description",rules:[]},i.a.createElement(P,{rows:3})),i.a.createElement("input",{type:"file",onChange:function(e){g(e.target.files[0])}})))};a.default=function(e){var a=Object(l.useState)([]),t=Object(r.a)(a,2),E=t[0],v=t[1],p=Object(l.useState)(!1),O=Object(r.a)(p,2),j=O[0],y=O[1],h=Object(l.useState)(null),k=Object(r.a)(h,2),I=k[0],N=k[1],P=Object(l.useState)(!0),C=Object(r.a)(P,2),S=C[0],T=C[1],_=Object(l.useState)(null),H=Object(r.a)(_,2),A=H[0],q=H[1];Object(l.useEffect)((function(){var a=e.match.params.id;f.a.getAction("/api/v1/product/all/".concat(a)).then((function(e){var a=e.data.products;v(Object(c.a)(a)),T(!1)})).catch((function(e){u.a.error({message:"Error while fetching products please refresh"}),T(!1)})),q(a)}),[e.match.params]);var w=Object(l.useCallback)((function(e,a){T(!0),f.b.postAction("/api/v1/product/update/".concat(e),{active:a}).then((function(t){if(200===t.status){var n=Object(c.a)(Object(b.a)(E)).find((function(a){return a._id===e})),r=Object(c.a)(Object(b.a)(E)).findIndex((function(a){return a._id===e}));n.active=a;var l=Object(c.a)(Object(b.a)(E));l[r]=n,v(Object(c.a)(l)),T(!1)}})).catch((function(e){u.a.error({message:"Error while updating status"}),T(!1)}))}),[E]),M=Object(l.useCallback)((function(e){var a=Object(c.a)(Object(b.a)(E));if(T(!0),e._id){var t=Object(b.c)(Object(n.a)(Object(n.a)({},e),{},{categoryId:A}));f.b.postAction("/api/v1/product/".concat(e._id),t).then((function(e){var t=e.data.product,r=E.findIndex((function(e){return e._id===t._id}));a[r]=Object(n.a)({},t),v(Object(c.a)(a)),u.a.success({message:"Category Editted successfully"}),T(!1)})).catch((function(e){u.a.error({message:"Error while Editting product"}),N(null),T(!1)}))}else{var r=Object(b.c)(Object(n.a)(Object(n.a)({},e),{},{categoryId:A}));f.b.postAction("/api/v1/product",r).then((function(e){var t=e.data.product;u.a.success({message:"Product added successfully"}),a.push(Object(n.a)({},t)),v(Object(c.a)(a)),T(!1)})).catch((function(e){u.a.error({message:"Error while Adding category"}),N(null),T(!1)}))}v(Object(c.a)(a)),y(!1),N(null)}),[E]),D=[{title:"Status",dataIndex:"active",key:"active",render:function(e,a){return i.a.createElement(s.a,{checked:e,onClick:function(e){return w(a._id,e)}})}},{title:"Name(English)",dataIndex:"productNameEnglish",key:"productNameEnglish"},{title:"Name(Malayalam)",dataIndex:"productNameMalayalam",key:"productNameMalayalam"},{title:"Unit",dataIndex:"unit",key:"unit"},{title:"Actual Price",dataIndex:"actualPrice",key:"actualPrice"},{title:"Selling Price",dataIndex:"sellingPrice",key:"sellingPrice"},{title:"Validity",dataIndex:"startTime",key:"startTime",render:function(e,a){return i.a.createElement("span",null,a.startTime&&"undefined"!==a.startTime&&a.endTime&&"undefined"!==a.startTime?"".concat(a.startTime," ").concat(a.endTime):"Not set")}},{title:"Priority",dataIndex:"priority",key:"priority"},{title:"Image",dataIndex:"image",key:"image",render:function(e){return i.a.createElement("img",{className:"image",src:"".concat(e),alt:e})}},{title:"",dataIndex:"_id",key:"_id",render:function(e){return i.a.createElement(m.a,{className:"edit-button",onClick:function(){return function(e){var a=Object(c.a)(E).find((function(a){return a._id===e}));N(Object(n.a)({},a)),y(!0)}(e)}},"Edit")}},{title:"",dataIndex:"_id",key:"_id",render:function(e){return i.a.createElement(m.a,{onClick:function(){return a=e,T(!0),void f.b.postAction("/api/v1/product/delete/".concat(a),{}).then((function(e){if(200===e.status){u.a.success({message:"Product deleted successfully"});var t=Object(c.a)(Object(b.a)(E)).filter((function(e){return e._id!==a}));v(t),T(!1)}})).catch((function(e){u.a.error({message:"Error while deleting category"}),T(!1)}));var a},type:"primary",danger:!0},"Delete")}}];return i.a.createElement(d.a,{size:"large",spinning:S},i.a.createElement("div",{className:"items-list"},i.a.createElement("div",{className:"add-button"},i.a.createElement(m.a,{type:"primary",onClick:function(){N(Object(n.a)({},g.c)),y(!0)}},"+ Add New")),j&&i.a.createElement(x,{visibility:j,handleCancel:function(){y(!1),N(null)},value:I,handleSave:M}),i.a.createElement("div",{className:"list-table"},i.a.createElement(o.a,{dataSource:Object(b.a)(E),columns:D}))))}}}]);
//# sourceMappingURL=9.00643599.chunk.js.map