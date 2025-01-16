import{r as n,R as m}from"./react-DvpkfkhJ.js";import{R as w}from"./react-dom-CF0dK92T.js";import{m as x,D as P,a as F,R as y,u as k,N as _,b as N,c as I,d as D,e as U,f as A,g as O,h as H,i as K,j as M}from"./react-router-Bo5PTHDi.js";import{s as W,h as j,k as g,l as z,E as Y,i as q,n as G,j as J,o as X,m as $}from"./@remix-run-CDfvuXmI.js";/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const S="6";try{window.__reactRouterVersion=S}catch{}const R="startTransition",c=m[R],b="flushSync",Q=w[b],E="useId",Z=m[E];function ee(e){let{basename:h,children:v,future:o,window:p}=e,a=n.useRef();a.current==null&&(a.current=g({window:p,v5Compat:!0}));let t=a.current,[i,r]=n.useState({action:t.action,location:t.location}),{v7_startTransition:s}=o||{},l=n.useCallback(u=>{s&&c?c(()=>r(u)):r(u)},[r,s]);return n.useLayoutEffect(()=>t.listen(l),[t,l]),n.createElement(y,{basename:h,children:v,location:i.location,navigationType:i.action,navigator:t,future:o})}const te=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";var f;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(f||(f={}));var d;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(d||(d={}));export{ee as B};
