import{g}from"./@babel-EnWrEA7o.js";import{i as d}from"./is-primitive-DHkDp9ST.js";import{i as h}from"./is-plain-object-D4VpqrHc.js";/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) Jon Schlinkert (https://github.com/jonschlinkert).
 * Released under the MIT License.
 */const{deleteProperty:P}=Reflect,b=d,y=h,o=e=>typeof e=="object"&&e!==null||typeof e=="function",$=e=>e==="__proto__"||e==="constructor"||e==="prototype",m=e=>{if(!b(e))throw new TypeError("Object keys must be strings or symbols");if($(e))throw new Error(`Cannot set unsafe key: "${e}"`)},w=e=>Array.isArray(e)?e.flat().map(String).join(","):e,A=(e,r)=>{if(typeof e!="string"||!r)return e;let t=e+";";return r.arrays!==void 0&&(t+=`arrays=${r.arrays};`),r.separator!==void 0&&(t+=`separator=${r.separator};`),r.split!==void 0&&(t+=`split=${r.split};`),r.merge!==void 0&&(t+=`merge=${r.merge};`),r.preservePaths!==void 0&&(t+=`preservePaths=${r.preservePaths};`),t},v=(e,r,t)=>{const f=w(r?A(e,r):e);m(f);const c=l.cache.get(f)||t();return l.cache.set(f,c),c},O=(e,r={})=>{const t=r.separator||".",f=t==="/"?!1:r.preservePaths;if(typeof e=="string"&&f!==!1&&/\//.test(e))return[e];const c=[];let n="";const i=s=>{let a;s.trim()!==""&&Number.isInteger(a=Number(s))?c.push(a):c.push(s)};for(let s=0;s<e.length;s++){const a=e[s];if(a==="\\"){n+=e[++s];continue}if(a===t){i(n),n="";continue}n+=a}return n&&i(n),c},u=(e,r)=>r&&typeof r.split=="function"?r.split(e):typeof e=="symbol"?[e]:Array.isArray(e)?e:v(e,r,()=>O(e,r)),_=(e,r,t,f)=>{if(m(r),t===void 0)P(e,r);else if(f&&f.merge){const c=f.merge==="function"?f.merge:Object.assign;c&&y(e[r])&&y(t)?e[r]=c(e[r],t):e[r]=t}else e[r]=t;return e},l=(e,r,t,f)=>{if(!r||!o(e))return e;const c=u(r,f);let n=e;for(let i=0;i<c.length;i++){const s=c[i],a=c[i+1];if(m(s),a===void 0){_(n,s,t,f);break}if(typeof a=="number"&&!Array.isArray(n[s])){n=n[s]=[];continue}o(n[s])||(n[s]={}),n=n[s]}return e};l.split=u;l.cache=new Map;l.clear=()=>{l.cache=new Map};var K=l;const E=g(K);export{E as s};
