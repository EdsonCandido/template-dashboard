import{r as i,j as e}from"./react-DvpkfkhJ.js";import{m as te,r as se,n as ae,s as oe,t as ie,v as re,F as o,T as m,I as R,J as H,D as ne,G as ce,B as E,S as T}from"./@chakra-ui-C9DuU7ys.js";import{e as le,f as de,g as pe,d as ue}from"./react-icons-BlHos5WE.js";import{e as me}from"./react-router-Bo5PTHDi.js";import{h as I}from"./index-DBbmc-P8.js";import{B as c}from"./react-toastify-Cqs8j3S4.js";import{L as J,d as P}from"./index-CjR_1hqN.js";import{d as k,P as xe,S as fe,a as he,b as ge,C as D}from"./devextreme-react-DHTNyOwS.js";import{I as B}from"./rsuite-CY3zEWee.js";import"./@babel-EnWrEA7o.js";import"./lodash.mergewith-MzEnzzL6.js";import"./copy-to-clipboard-B5MxSLyl.js";import"./toggle-selection-D00ubgGT.js";import"./@zag-js-CSdeJI-4.js";import"./framesync-DZVyisK4.js";import"./color2k-C2CVZzAR.js";import"./@emotion-C5Sm4HH8.js";import"./stylis-DVCB9w4v.js";import"./hoist-non-react-statics-DDprGHWZ.js";import"./react-is-dWBEnTxV.js";import"./framer-motion-B4PBGtp1.js";import"./react-fast-compare-BL8hGDR_.js";import"./react-dom-CF0dK92T.js";import"./scheduler-Cli78dbN.js";import"./react-focus-lock-o1DDLFEd.js";import"./prop-types-CjdIqZjW.js";import"./focus-lock-B6tW63jD.js";import"./use-callback-ref-DQzgWeaL.js";import"./use-sidecar-TqgxduIf.js";import"./tslib-PVoL_lNK.js";import"./detect-node-es-vyeUQQMA.js";import"./react-clientside-effect-5lQa3ANZ.js";import"./@popperjs-VWH4A8P6.js";import"./aria-hidden-JgPW08nP.js";import"./react-remove-scroll-BQ-6cI2l.js";import"./react-remove-scroll-bar-EDN2jL_s.js";import"./react-style-singleton-zeAVULNG.js";import"./get-nonce-CgXfylQE.js";import"./@remix-run-CDfvuXmI.js";import"./next-themes-DiVf4tRQ.js";import"./react-router-dom-DUfO2FZg.js";import"./axios--aCgW92I.js";import"./devextreme-C0VZ1woi.js";import"./devexpress-diagram-LzCszTuq.js";import"./jszip-Crv7fNFW.js";import"./devexpress-gantt-DPmbUJ3C.js";import"./devextreme-quill-CVQqOFz3.js";import"./rrule-mVpBVL30.js";import"./inferno-B6I4Zw_M.js";import"./@devextreme-JjotehCy.js";import"./inferno-create-element-BMpTjFue.js";import"./clsx-B-dksMZM.js";import"./classnames-D1gig9Ag.js";import"./lodash-CJT0cwKt.js";import"./@rsuite-DzjRYDZ2.js";import"./dom-lib-9y2JbmSD.js";import"./@juggle-C8OzoCMD.js";import"./react-window-BAMTUyjQ.js";import"./memoize-one-CcMeOnPo.js";import"./schema-typed-pIcAd6pZ.js";import"./get-value-At7x-fOk.js";import"./isobject-CEi73sWr.js";import"./set-value-CHDA_Ij2.js";import"./is-primitive-DHkDp9ST.js";import"./is-plain-object-D4VpqrHc.js";import"./react-use-set-D9zgYVzE.js";import"./rsuite-table-nYf0olwj.js";import"./date-fns-KlCNVD47.js";const je=({onSuccess:F,isOpen:v,noticiaId:p,setIsOpenModal:w,setNoticiaId:C})=>{const[y,g]=i.useState(!1),[t,j]=i.useState(!1),[x,n]=i.useState(""),[S,r]=i.useState(""),[l,_]=i.useState(""),[b,N]=i.useState(""),[Q,z]=i.useState(!1),[f,q]=i.useState(),[h,O]=i.useState(),[W,K]=i.useState(""),[U,V]=i.useState(""),[A,X]=i.useState(!1),Y=async()=>{j(!0),c.dismiss();let s=!1;if(x.length<1&&(c.warn("Título da Noticia não pode ser vazio",{position:"top-left"}),s=!0),l.length<1&&(c.warn("Data de inicio não pode ser vazia",{position:"top-left"}),s=!0),b.length<1&&(c.warn("Data final não pode ser vazia",{position:"top-left"}),s=!0),l>b&&(c.warn("Data de inicio não pode ser maior que a data final",{position:"top-left"}),s=!0),A||(f||(c.warn("Você deve anexar uma capa",{position:"top-left"}),s=!0),h||(c.warn("Você deve anexar uma imagem de conteúdo",{position:"top-left"}),s=!0)),s){c.warn("Preença todos os campos corretamente",{position:"top-left"}),setTimeout(()=>{j(!1)},1500);return}const a=new FormData;a.append("titulo",x),a.append("descricao",S),a.append("dt_inicio",l),a.append("dt_fim",b),A?a.append("is_ativo",Q?"1":"0"):a.append("is_ativo","1"),f&&a.append("arquivo_capa",f),h&&a.append("arquivo_conteudo",h),p&&a.append("cod",p.toString());const u=await I.post("/noticias/",a,{headers:{"Content-Type":"multipart/form-data"}}).then(d=>({data:d.data,success:!0,error:null,message:"OK"})).catch(d=>{var M,G;return{data:null,success:!1,error:(M=d.response)==null?void 0:M.data,message:((G=d.response)==null?void 0:G.data)||d.message}});u.success?(A?c.success("Notícia editada com sucesso!",{position:"top-left"}):c.success("Notícia cadastrada com sucesso!",{position:"top-left"}),j(!1),L()):(console.error(u),c.warn(u.message)),j(!1),await F()},$=s=>new Date(s).toISOString().split("T")[0],Z=async()=>{var s;if(p){const a=await I.get("/noticias/"+p).then(u=>({data:u.data,success:!0,error:null,message:"OK"})).catch(u=>{var d,M;return{data:null,success:!1,error:(d=u.response)==null?void 0:d.data,message:((M=u.response)==null?void 0:M.data)||u.message}});a.success&&(n(a.data.titulo),r(a.data.descricao),z(!!((s=a.data)!=null&&s.is_ativo)),N($(a.data.dt_fim)),_($(a.data.dt_inicio)),K(a.data.arquivo_capa),V(a.data.arquivo_conteudo))}},L=()=>{n(""),r(""),z(!1),w(!1),N(""),_(""),C(null)},ee=async()=>{g(!0),p&&(await Z(),X(!0)),g(!1)};return i.useEffect(()=>{v&&ee()},[v]),i.useEffect(()=>{f&&(async()=>{if(f){const a=new FileReader;a.onloadend=()=>{const d=a.result.split(",")[1];K(d)},a.readAsDataURL(f)}})()},[f]),i.useEffect(()=>{h&&(async()=>{if(h){const a=new FileReader;a.onloadend=()=>{const d=a.result.split(",")[1];V(d)},a.readAsDataURL(h)}})()},[h]),e.jsxs(te,{onClose:L,closeOnOverlayClick:!1,closeOnEsc:!1,isOpen:v,size:"md",children:[e.jsx(se,{}),e.jsxs(ae,{children:[e.jsx(oe,{}),e.jsx(ie,{as:"p",children:p?"Editar Notícia":"Novo Notícia"}),e.jsx(re,{children:y?e.jsx(J,{}):e.jsxs(o,{w:"100%",p:1,gap:1,flexDir:"column",children:[e.jsxs(o,{w:"100%",p:1,gap:1,flexDir:"column",children:[e.jsxs(o,{children:[e.jsx(m,{children:"Título"}),e.jsx("span",{style:{color:"red"},children:"*"})]}),e.jsx(R,{isDisabled:t,value:x,onChange:s=>n(s.target.value),type:"text"})]}),e.jsxs(o,{w:"100%",p:1,gap:1,flexDir:"column",children:[e.jsx(m,{children:"Descrição"}),e.jsx(R,{isDisabled:t,value:S,onChange:s=>r(s.target.value),type:"text"})]}),e.jsxs(o,{children:[e.jsxs(o,{w:"50%",p:1,gap:1,flexDir:"column",children:[e.jsxs(o,{children:[e.jsx(m,{children:"Data Inicio"}),e.jsx("span",{style:{color:"red"},children:"*"})]}),e.jsx(R,{isDisabled:t,value:l,onChange:s=>_(s.target.value),type:"date"})]}),e.jsxs(o,{w:"50%",p:1,gap:1,flexDir:"column",children:[e.jsxs(o,{children:[e.jsx(m,{children:"Data Fim"}),e.jsx("span",{style:{color:"red"},children:"*"})]}),e.jsx(R,{isDisabled:t,value:b,onChange:s=>N(s.target.value),type:"date"})]})]}),e.jsxs(o,{p:1,align:"center",justify:"center",direction:"column",children:[e.jsxs(o,{direction:"column",children:[e.jsxs(o,{children:[e.jsx(m,{children:"Capa"}),e.jsx("span",{style:{color:"red"},children:"*"})]}),e.jsx(k.FileUploader,{accept:"image/*",value:f?[f]:[],onValueChange:s=>{s&&s[0]?q(s[0]):q(void 0)},uploadMode:"useForm"})]}),W&&e.jsx(o,{align:"center",justify:"center",direction:"column",children:e.jsx(H,{src:`data:image/jpg;base64,${W}`,alt:"capa",width:"80%"})}),e.jsx(ne,{my:4}),e.jsxs(o,{direction:"column",children:[e.jsxs(o,{children:[e.jsx(m,{children:"Conteúdo"}),e.jsx("span",{style:{color:"red"},children:"*"})]}),e.jsx(k.FileUploader,{accept:"image/*",value:h?[h]:[],onValueChange:s=>{s&&s[0]?O(s[0]):O(void 0)},uploadMode:"useForm"})]}),U&&e.jsx(o,{align:"certer",justify:"center",direction:"column",children:e.jsx(H,{src:`data:image/jpg;base64,${U}`,alt:"conteudo",width:"100%"})})]})]})}),e.jsx(ce,{children:!y&&e.jsxs(e.Fragment,{children:[e.jsx(E,{variant:"outline",mr:3,onClick:L,children:"Cancelar"}),e.jsx(E,{colorScheme:"blue",isDisabled:t,onClick:Y,children:"Salvar"})]})})]})]})},ve=({isLoadingPage:F,dataFormat:v,onPressModal:p,onSuccess:w})=>{const C=t=>{p(t)},y=t=>e.jsx(e.Fragment,{children:e.jsx("p",{style:{backgroundColor:t?"#38a169":"#e53e3e",borderRadius:"5px",color:"white",textAlign:"center",height:"20px",paddingRight:"5px",paddingLeft:"5px"},children:t?"Sim":"Não"})}),g=async(t,j)=>{const x=await I.delete("noticias/"+t).then(n=>({data:n.data,success:!0,error:null,message:"OK"})).catch(n=>{var S,r;return{data:null,success:!1,error:(S=n.response)==null?void 0:S.data,message:((r=n.response)==null?void 0:r.data)||n.message}});x.success?(c.success(`Notícia ${j===1?"desativada":"ativada"} com sucesso`),await w()):c.error(x.message)};return e.jsx(e.Fragment,{children:F?e.jsx(T,{w:"100%",bg:"white",borderRadius:"5px",p:"10px",gap:"10px",boxShadow:"lg",children:e.jsx(J,{})}):e.jsx(T,{w:"100%",bg:"white",borderRadius:"5px",p:"10px",gap:"10px",boxShadow:"lg",children:e.jsxs(k.DataGrid,{dataSource:v,keyExpr:"cod",width:"100%",height:"35hw",hoverStateEnabled:!0,showRowLines:!0,allowColumnResizing:!0,columnAutoWidth:!0,showBorders:!0,children:[e.jsx(xe,{showPageSizeSelector:!0,showNavigationButtons:!0,showInfo:!0,infoText:"Total de itens: {2} ",visible:!0}),e.jsx(fe,{visible:!0}),e.jsx(he,{defaultPageSize:25,enabled:!0}),e.jsx(ge,{mode:"single"}),e.jsx(D,{caption:" - ",dataField:"cod",alignment:"center",fixedPosition:"right",type:"buttons",width:"120px",allowResizing:!1,cellRender:t=>e.jsxs(o,{gap:3,justifyContent:"center",align:"center",children:[e.jsx(B,{icon:e.jsx(le,{color:"gray",size:20}),onClick:()=>C(t.row.data.cod)}),t.row.data.is_ativo===0?e.jsx(B,{icon:e.jsx(de,{color:"#e53e3e",size:20}),onClick:()=>{g(t.row.data.cod,t.row.data.is_ativo)}}):e.jsx(B,{icon:e.jsx(pe,{color:"#38a169",size:20}),onClick:()=>g(t.row.data.cod,t.row.data.is_ativo)})]})}),e.jsx(D,{caption:"Criada em.",dataField:"created_at",minWidth:100,cellRender:t=>e.jsxs(m,{children:[" ",P(t.value,"dd/MM/yyyy")]})}),e.jsx(D,{caption:"Título",dataField:"titulo",minWidth:110,alignment:"center",cellRender:t=>e.jsx(m,{children:t.value})}),e.jsx(D,{caption:"Descrição",alignment:"center",dataField:"descricao"}),e.jsx(D,{caption:"Dt. Início",alignment:"center",dataField:"dt_inicio",cellRender:t=>e.jsx(m,{children:P(t.value,"dd/MM/yyyy")})}),e.jsx(D,{caption:"Dt. Fim",alignment:"center",dataField:"dt_fim",cellRender:t=>e.jsx(m,{children:P(t.value,"dd/MM/yyyy")})}),e.jsx(D,{caption:"Ativo",alignment:"center",dataField:"is_ativo",cellRender:t=>y(t.value)})]})})})},Pt=()=>{const F=me(),[v,p]=i.useState(null),[w,C]=i.useState(!1),[y,g]=i.useState(!1),[t,j]=i.useState(null),x=(r=null)=>{g(!0),p(r)},n=async()=>{C(!0);const r=await I.get("/noticias").then(l=>({data:l.data,success:!0,error:null,message:"OK"})).catch(l=>{var _,b;return{data:null,success:!1,error:(_=l.response)==null?void 0:_.data,message:((b=l.response)==null?void 0:b.data)||l.message}});r.success&&j(r==null?void 0:r.data),setTimeout(()=>{C(!1)},1500)},S=i.useMemo(()=>t?t==null?void 0:t.map((r,l)=>({index:l,...r})):[],[t]);return i.useEffect(()=>{n()},[]),e.jsx(e.Fragment,{children:e.jsxs(o,{flexDir:"column",justifyContent:"center",alignItems:"flex-start",gap:"10px",children:[e.jsx(o,{children:e.jsx(m,{cursor:"pointer",onClick:()=>F(-1),_hover:{textDecoration:"underline",color:"blue"},children:" Configurações / Admin / Noticias"})}),e.jsx(T,{w:"100%",bg:"white",borderRadius:"5px",p:"10px",gap:"10px",boxShadow:"lg",children:e.jsxs(o,{w:"100%",justify:"space-between",children:[e.jsx(o,{w:"100%"}),e.jsx(o,{w:"100%",justify:"flex-end",children:e.jsx(E,{onClick:()=>x(),isDisabled:w,isLoading:w,colorScheme:"green",size:"sm",leftIcon:e.jsx(ue,{}),children:"  Novo "})})]})}),e.jsx(ve,{dataFormat:S,isLoadingPage:w,onPressModal:x,onSuccess:n}),y&&e.jsx(je,{onSuccess:n,isOpen:y,setIsOpenModal:g,setNoticiaId:p,noticiaId:v})]})})};export{Pt as default};
