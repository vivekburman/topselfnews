(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{315:function(e,t,r){"use strict";var a=r(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r(4)),u=(a(r(0)),a(r(575))),i=(0,n.default)("div",{className:"margin-main w-100"},void 0,(0,n.default)(u.default,{})),o=function(){return i};t.default=o},575:function(e,t,r){"use strict";var a=r(18),n=r(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=n(r(4)),i=a(r(0)),o=n(r(83)),s=r(52),c=r(19),l=r(80),d=r(24),f=(0,u.default)("div",{},void 0,"Please Wait....."),v=(0,c.connect)(null,(function(e){return{setCurrentUser:function(t){return e((0,s.setCurrentUser)(t))}}}))((0,d.withRouter)((function(e){var t=e.setCurrentUser,r=e.history;return(0,i.useEffect)((function(){o.default.get("/api/auth/google/redirect".concat(location.search)).then((function(e){var a=e.status,n=e.data;if(200==a&&n.success){t({firstName:n.firstName,middleName:n.middleName,lastName:n.lastName,profilePicUrl:n.profilePicUrl,token:n.access_token,userId:n.userId});var u=localStorage.getItem(l.TSNEnum.LAST_VISITED_PAGE_BEFORE_LOGIN);u&&r.push(u)}else t(void 0)})).catch((function(e){console.error(e)}))}),[]),f})));t.default=v}}]);