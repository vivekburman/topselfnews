(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{363:function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.months=o.default=void 0;var a={oneSecond:1e3};a.oneMinute=60*a.oneSecond,a.oneHour=60*a.oneMinute,a.oneDay=24*a.oneHour,a.oneWeek=7*a.oneDay,a.oneMonth=4*a.oneWeek,a.oneYear=12*a.oneWeek;o.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];o.default=function(e){var o=new Date(e),n=Date.now()-o;return(new Date).getFullYear()-o.getFullYear()>1?o.getFullYear():n<a.oneMinute?"".concat(Math.floor(n/a.oneSecond)," seconds ago."):n<a.oneHour?"".concat(Math.floor(n/a.oneMinute)," minutes ago."):n<a.oneDay?"".concat(Math.floor(n/a.oneHour)," hours ago."):n<a.oneWeek?"".concat(Math.floor(n/a.oneDay)," days ago."):n<a.oneMonth?"".concat(Math.floor(n/a.oneWeek)," weeks ago."):n<a.oneYear?"".concat(Math.floor(n/a.oneMonth)," months ago."):void 0}}}]);