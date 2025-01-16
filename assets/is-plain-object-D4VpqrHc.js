import{g as a}from"./@babel-EnWrEA7o.js";import{i as s}from"./isobject-CEi73sWr.js";/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var f=s;function i(t){return f(t)===!0&&Object.prototype.toString.call(t)==="[object Object]"}var u=function(o){var r,e;return!(i(o)===!1||(r=o.constructor,typeof r!="function")||(e=r.prototype,i(e)===!1)||e.hasOwnProperty("isPrototypeOf")===!1)};export{u as i};
