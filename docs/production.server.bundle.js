!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){r(1),e.exports=r(2)},function(e,t){e.exports=require("babel-polyfill")},function(e,t,r){"use strict";(function(e){function t(e){return e&&e.__esModule?e:{default:e}}var n=r(3),o=t(n),u=r(4),s=t(u),i=r(5),c=t(i),f=r(6),l=t(f),a=r(7),d=t(a),p=r(8),x=t(p),v=r(9),b=t(v),g=r(10),q=t(g);r(11).config();var m=(0,o.default)(),y=process.env.PORT||3e3,j=d.default.createWriteStream(s.default.join(e,"access.log"),{flags:"a"});m.use((0,x.default)("combined",{stream:j})),m.use((0,l.default)()),m.use(c.default.json()),m.use(c.default.urlencoded({extended:!1})),m.use((0,b.default)(s.default.resolve(e,"../favicon.ico"))),m.use(o.default.static(s.default.join(e,"../build"))),m.get("/*",function(t,r){r.sendFile(s.default.resolve(e,"../build/index.html"))}),m.use(q.default),m.listen(y,process.env.SERVER_IP,function(){console.log("Listening on port "+y+"...")})}).call(t,"server")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("serve-favicon")},function(e,t,r){"use strict";function n(e){return{success:!1,errorType:e.type,error:e}}function o(e,t,r,o){r.status(200).json(n(e)),o()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t){e.exports=require("dotenv")}]);