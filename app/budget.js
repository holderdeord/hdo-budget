(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lib/angular.min.js');

module.exports = angular;

},{"./lib/angular.min.js":2}],2:[function(require,module,exports){
/*
 AngularJS v1.2.2
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(Z,P,s){'use strict';function C(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.2/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function ob(b){if(null==b||za(b))return!1;var a=
b.length;return 1===b.nodeType&&a?!0:B(b)||K(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(L(b))for(d in b)"prototype"!=d&&("length"!=d&&"name"!=d&&b.hasOwnProperty(d))&&a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(ob(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Ob(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Nc(b,a,c){for(var d=Ob(b),
e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Pb(b){return function(a,c){b(c,a)}}function Xa(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Qb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function u(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Qb(b,a);return b}function T(b){return parseInt(b,
10)}function Rb(b,a){return u(new (u(function(){},{prototype:b})),a)}function x(){}function Aa(b){return b}function da(b){return function(){return b}}function z(b){return"undefined"==typeof b}function F(b){return"undefined"!=typeof b}function X(b){return null!=b&&"object"==typeof b}function B(b){return"string"==typeof b}function pb(b){return"number"==typeof b}function Ja(b){return"[object Date]"==Ya.apply(b)}function K(b){return"[object Array]"==Ya.apply(b)}function L(b){return"function"==typeof b}
function Za(b){return"[object RegExp]"==Ya.apply(b)}function za(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Oc(b){return b&&(b.nodeName||b.on&&b.find)}function Pc(b,a,c){var d=[];q(b,function(b,h,g){d.push(a.call(c,b,h,g))});return d}function $a(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ka(b,a){var c=$a(b,a);0<=c&&b.splice(c,1);return a}function ga(b,a){if(za(b)||b&&b.$evalAsync&&b.$watch)throw La("cpws");if(a){if(b===
a)throw La("cpi");if(K(b))for(var c=a.length=0;c<b.length;c++)a.push(ga(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ga(b[d]);Qb(a,c)}}else(a=b)&&(K(b)?a=ga(b,[]):Ja(b)?a=new Date(b.getTime()):Za(b)?a=RegExp(b.source):X(b)&&(a=ga(b,{})));return a}function Qc(b,a){a=a||{};for(var c in b)b.hasOwnProperty(c)&&"$$"!==c.substr(0,2)&&(a[c]=b[c]);return a}function Ba(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&
"object"==c)if(K(b)){if(!K(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!Ba(b[d],a[d]))return!1;return!0}}else{if(Ja(b))return Ja(a)&&b.getTime()==a.getTime();if(Za(b)&&Za(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||za(b)||za(a)||K(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!L(b[d])){if(!Ba(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!L(a[d]))return!1;return!0}return!1}function Sb(){return P.securityPolicy&&
P.securityPolicy.isActive||P.querySelector&&!(!P.querySelector("[ng-csp]")&&!P.querySelector("[data-ng-csp]"))}function qb(b,a){var c=2<arguments.length?ta.call(arguments,2):[];return!L(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ta.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Rc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=s:za(a)?c="$WINDOW":a&&P===a?c="$DOCUMENT":a&&(a.$evalAsync&&
a.$watch)&&(c="$SCOPE");return c}function oa(b,a){return"undefined"===typeof b?s:JSON.stringify(b,Rc,a?"  ":null)}function Tb(b){return B(b)?JSON.parse(b):b}function Ma(b){b&&0!==b.length?(b=v(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.html("")}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?v(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+v(b)})}catch(d){return v(c)}}function Ub(b){try{return decodeURIComponent(b)}catch(a){}}
function Vb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Ub(c[0]),F(d)&&(b=F(c[1])?Ub(c[1]):!0,a[d]?K(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Wb(b){var a=[];q(b,function(b,d){K(b)?q(b,function(b){a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))}):a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))});return a.length?a.join("&"):""}function rb(b){return ua(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ua(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Sc(b,a){function c(a){a&&d.push(a)}var d=[b],e,h,g=["ng:app","ng-app","x-ng-app","data-ng-app"],f=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(g,function(a){g[a]=!0;c(P.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=f.exec(" "+a.className+" ");b?(e=a,h=
(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&g[b.name]&&(e=a,h=b.value)})}});e&&a(e,h?[h]:[])}function Xb(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===P?"document":ha(b);throw La("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=Yb(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;
if(Z&&!d.test(Z.name))return c();Z.name=Z.name.replace(d,"");ab.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function bb(b,a){a=a||"_";return b.replace(Tc,function(b,d){return(d?a:"")+b.toLowerCase()})}function sb(b,a,c){if(!b)throw La("areq",a||"?",c||"required");return b}function Na(b,a,c){c&&K(b)&&(b=b[b.length-1]);sb(L(b),a,"not a function, got "+(b&&"object"==typeof b?b.constructor.name||"Object":typeof b));return b}function va(b,a){if("hasOwnProperty"===b)throw La("badname",
a);}function tb(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,h=a.length,g=0;g<h;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&L(b)?qb(e,b):b}function ub(b){if(b.startNode===b.endNode)return y(b.startNode);var a=b.startNode,c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b.endNode);return y(c)}function Uc(b){var a=C("$injector"),c=C("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||C;return b.module||(b.module=function(){var b={};return function(e,h,g){if("hasOwnProperty"===e)throw c("badname",
"module");h&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!h)throw a("nomod",e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:h,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider",
"register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};g&&l(g);return n}())}}())}function Oa(b){return b.replace(Vc,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Wc,"Moz$1")}function vb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],m=a,k,l,n,r,p,A;if(!d||null!=b)for(;e.length;)for(k=e.shift(),l=0,n=k.length;l<n;l++)for(r=y(k[l]),m?r.triggerHandler("$destroy"):m=!m,p=0,r=(A=r.children()).length;p<
r;p++)e.push(Ca(A[p]));return h.apply(this,arguments)}var h=Ca.fn[b],h=h.$original||h;e.$original=h;Ca.fn[b]=e}function M(b){if(b instanceof M)return b;if(!(this instanceof M)){if(B(b)&&"<"!=b.charAt(0))throw wb("nosel");return new M(b)}if(B(b)){var a=P.createElement("div");a.innerHTML="<div>&#160;</div>"+b;a.removeChild(a.firstChild);xb(this,a.childNodes);y(P.createDocumentFragment()).append(this)}else xb(this,b)}function yb(b){return b.cloneNode(!0)}function Pa(b){Zb(b);var a=0;for(b=b.childNodes||
[];a<b.length;a++)Pa(b[a])}function $b(b,a,c,d){if(F(d))throw wb("offargs");var e=la(b,"events");la(b,"handle")&&(z(a)?q(e,function(a,c){zb(b,c,a);delete e[c]}):q(a.split(" "),function(a){z(c)?(zb(b,a,e[a]),delete e[a]):Ka(e[a]||[],c)}))}function Zb(b,a){var c=b[cb],d=Qa[c];d&&(a?delete Qa[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),$b(b)),delete Qa[c],b[cb]=s))}function la(b,a,c){var d=b[cb],d=Qa[d||-1];if(F(c))d||(b[cb]=d=++Xc,d=Qa[d]={}),d[a]=c;else return d&&d[a]}function ac(b,
a,c){var d=la(b,"data"),e=F(c),h=!e&&F(a),g=h&&!X(a);d||g||la(b,"data",d={});if(e)d[a]=c;else if(h){if(g)return d&&d[a];u(d,a)}else return d}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ba((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ba(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+
(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ba(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",ba(c))}}function xb(b,a){if(a){a=a.nodeName||!F(a.length)||za(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function bc(b,a){return db(b,"$"+(a||"ngController")+"Controller")}function db(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=K(a)?a:[a];b.length;){for(var d=0,e=a.length;d<e;d++)if((c=b.data(a[d]))!==s)return c;b=b.parent()}}
function cc(b,a){var c=eb[a.toLowerCase()];return c&&dc[b.nodeName]&&c}function Yc(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||P);if(z(c.defaultPrevented)){var h=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;h.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};q(a[e||c.type],
function(a){a.call(b,c)});8>=N?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Da(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=Xa()):c=b;return a+":"+c}function Ra(b){q(b,this.put,this)}function ec(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(Zc,""),c=c.match($c),
q(c[1].split(ad),function(b){b.replace(bd,function(b,c,d){a.push(d)})})),b.$inject=a):K(b)?(c=b.length-1,Na(b[c],"fn"),a=b.slice(0,c)):Na(b,"fn",!0);return a}function Yb(b){function a(a){return function(b,c){if(X(b))q(b,Pb(a));else return a(b,c)}}function c(a,b){va(a,"service");if(L(b)||K(b))b=n.instantiate(b);if(!b.$get)throw Sa("pget",a);return l[a+f]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,f,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(B(a))for(c=Ta(a),b=b.concat(e(c.requires)).concat(c._runBlocks),
d=c._invokeQueue,f=0,h=d.length;f<h;f++){var g=d[f],m=n.get(g[0]);m[g[1]].apply(m,g[2])}else L(a)?b.push(n.invoke(a)):K(a)?b.push(n.invoke(a)):Na(a,"module")}catch(l){throw K(a)&&(a=a[a.length-1]),l.message&&(l.stack&&-1==l.stack.indexOf(l.message))&&(l=l.message+"\n"+l.stack),Sa("modulerr",a,l.stack||l.message||l);}}});return b}function h(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===g)throw Sa("cdep",m.join(" <- "));return a[d]}try{return m.unshift(d),a[d]=g,a[d]=b(d)}finally{m.shift()}}
function d(a,b,e){var f=[],h=ec(a),g,k,m;k=0;for(g=h.length;k<g;k++){m=h[k];if("string"!==typeof m)throw Sa("itkn",m);f.push(e&&e.hasOwnProperty(m)?e[m]:c(m))}a.$inject||(a=a[g]);switch(b?-1:f.length){case 0:return a();case 1:return a(f[0]);case 2:return a(f[0],f[1]);case 3:return a(f[0],f[1],f[2]);case 4:return a(f[0],f[1],f[2],f[3]);case 5:return a(f[0],f[1],f[2],f[3],f[4]);case 6:return a(f[0],f[1],f[2],f[3],f[4],f[5]);case 7:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6]);case 8:return a(f[0],f[1],
f[2],f[3],f[4],f[5],f[6],f[7]);case 9:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8]);case 10:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],f[9]);default:return a.apply(b,f)}}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(K(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||L(e)?e:c},get:c,annotate:ec,has:function(b){return l.hasOwnProperty(b+f)||a.hasOwnProperty(b)}}}var g={},f="Provider",m=[],k=new Ra,l={$provide:{provider:a(c),factory:a(d),
service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,da(b))}),constant:a(function(a,b){va(a,"constant");l[a]=b;r[a]=b}),decorator:function(a,b){var c=n.get(a+f),d=c.$get;c.$get=function(){var a=p.invoke(d,c);return p.invoke(b,null,{$delegate:a})}}}},n=l.$injector=h(l,function(){throw Sa("unpr",m.join(" <- "));}),r={},p=r.$injector=h(r,function(a){a=n.get(a+f);return p.invoke(a.$get,a)});q(e(b),function(a){p.invoke(a||x)});return p}
function cd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==v(a.nodeName)||(b=a)});return b}function h(){var b=c.hash(),d;b?(d=g.getElementById(b))?d.scrollIntoView():(d=e(g.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var g=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(h)});return h}]}function dd(b,a,c,d){function e(a){try{a.apply(null,
ta.call(arguments,1))}finally{if(A--,0===A)for(;J.length;)try{J.pop()()}catch(b){c.error(b)}}}function h(a,b){(function ia(){q(U,function(a){a()});w=b(ia,a)})()}function g(){t=null;D!=f.url()&&(D=f.url(),q(H,function(a){a(f.url())}))}var f=this,m=a[0],k=b.location,l=b.history,n=b.setTimeout,r=b.clearTimeout,p={};f.isMock=!1;var A=0,J=[];f.$$completeOutstandingRequest=e;f.$$incOutstandingRequestCount=function(){A++};f.notifyWhenNoOutstandingRequests=function(a){q(U,function(a){a()});0===A?a():J.push(a)};
var U=[],w;f.addPollFn=function(a){z(w)&&h(100,n);U.push(a);return a};var D=k.href,E=a.find("base"),t=null;f.url=function(a,c){k!==b.location&&(k=b.location);if(a){if(D!=a)return D=a,d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),E.attr("href",E.attr("href"))):(t=a,c?k.replace(a):k.href=a),f}else return t||k.href.replace(/%27/g,"'")};var H=[],R=!1;f.onUrlChange=function(a){if(!R){if(d.history)y(b).on("popstate",g);if(d.hashchange)y(b).on("hashchange",g);else f.addPollFn(g);R=!0}H.push(a);
return a};f.baseHref=function(){var a=E.attr("href");return a?a.replace(/^https?\:\/\/[^\/]*/,""):""};var $={},S="",ca=f.baseHref();f.cookies=function(a,b){var d,e,f,h;if(a)b===s?m.cookie=escape(a)+"=;path="+ca+";expires=Thu, 01 Jan 1970 00:00:00 GMT":B(b)&&(d=(m.cookie=escape(a)+"="+escape(b)+";path="+ca).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(m.cookie!==S)for(S=m.cookie,d=S.split("; "),$={},f=0;f<d.length;f++)e=
d[f],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),$[a]===s&&($[a]=unescape(e.substring(h+1))));return $}};f.defer=function(a,b){var c;A++;c=n(function(){delete p[c];e(a)},b||0);p[c]=!0;return c};f.defer.cancel=function(a){return p[a]?(delete p[a],r(a),e(x),!0):!1}}function ed(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new dd(b,d,a,c)}]}function fd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(r?r==a&&(r=a.n):r=a,h(a.n,a.p),h(a,n),n=a,n.n=null)}
function h(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw C("$cacheFactory")("iid",b);var g=0,f=u({},d,{id:b}),m={},k=d&&d.capacity||Number.MAX_VALUE,l={},n=null,r=null;return a[b]={put:function(a,b){var c=l[a]||(l[a]={key:a});e(c);if(!z(b))return a in m||g++,m[a]=b,g>k&&this.remove(r.key),b},get:function(a){var b=l[a];if(b)return e(b),m[a]},remove:function(a){var b=l[a];b&&(b==n&&(n=b.p),b==r&&(r=b.n),h(b.n,b.p),delete l[a],delete m[a],g--)},removeAll:function(){m={};g=0;l={};n=r=null},destroy:function(){l=
f=m=null;delete a[b]},info:function(){return u({},f,{size:g})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function gd(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function gc(b){var a={},c="Directive",d=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,e=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,h=/^\s*(https?|ftp|mailto|tel|file):/,g=/^\s*(https?|ftp|file):|data:image\//,f=/^(on[a-z]+|formaction)$/;this.directive=function k(d,
e){va(d,"directive");B(d)?(sb(e,"directiveFactory"),a.hasOwnProperty(d)||(a[d]=[],b.factory(d+c,["$injector","$exceptionHandler",function(b,c){var e=[];q(a[d],function(a,f){try{var h=b.invoke(a);L(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=f;h.name=h.name||d;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"A";e.push(h)}catch(g){c(g)}});return e}])),a[d].push(e)):q(d,Pb(k));return this};this.aHrefSanitizationWhitelist=function(a){return F(a)?
(h=a,this):h};this.imgSrcSanitizationWhitelist=function(a){return F(a)?(g=a,this):g};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate",function(b,l,n,r,p,A,J,U,w,D,E){function t(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var f=R(a,b,a,c,d,e);return function(b,c,d){sb(b,"scope");var e=c?Ea.clone.call(a):
a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var h=e.length;d<h;d++){var g=e[d];1!=g.nodeType&&9!=g.nodeType||e.eq(d).data("$scope",b)}H(e,"ng-scope");c&&c(e,b);f&&f(b,e,e);return e}}function H(a,b){try{a.addClass(b)}catch(c){}}function R(a,b,c,d,e,f){function h(a,c,d,e){var f,k,l,n,p,r,A,ea=[];p=0;for(r=c.length;p<r;p++)ea.push(c[p]);A=p=0;for(r=g.length;p<r;A++)k=ea[A],c=g[p++],f=g[p++],l=y(k),c?(c.scope?(n=a.$new(),l.data("$scope",n),H(l,"ng-scope")):n=a,(l=c.transclude)||!e&&b?c(f,
n,k,d,$(a,l||b)):c(f,n,k,s,e)):f&&f(a,k.childNodes,s,e)}for(var g=[],k,l,n,p=0;p<a.length;p++)l=new Db,k=S(a[p],[],l,0===p?d:s,e),k=(f=k.length?wa(k,a[p],l,b,c,null,[],[],f):null)&&f.terminal||!a[p].childNodes||!a[p].childNodes.length?null:R(a[p].childNodes,f?f.transclude:b),g.push(f),g.push(k),n=n||f||k,f=null;return n?h:null}function $(a,b){return function(c,d,e){var f=!1;c||(c=a.$new(),f=c.$$transcluded=!0);d=b(c,d,e);if(f)d.on("$destroy",qb(c,c.$destroy));return d}}function S(a,b,c,f,h){var g=
c.$attr,k;switch(a.nodeType){case 1:ia(b,ma(Fa(a).toLowerCase()),"E",f,h);var l,n,p;k=a.attributes;for(var r=0,A=k&&k.length;r<A;r++){var J=!1,t=!1;l=k[r];if(!N||8<=N||l.specified){n=l.name;p=ma(n);Eb.test(p)&&(n=bb(p.substr(6),"-"));var D=p.replace(/(Start|End)$/,"");p===D+"Start"&&(J=n,t=n.substr(0,n.length-5)+"end",n=n.substr(0,n.length-6));p=ma(n.toLowerCase());g[p]=n;c[p]=l=ba(N&&"href"==n?decodeURIComponent(a.getAttribute(n,2)):l.value);cc(a,p)&&(c[p]=!0);M(a,b,l,p);ia(b,p,"A",f,h,J,t)}}a=a.className;
if(B(a)&&""!==a)for(;k=e.exec(a);)p=ma(k[2]),ia(b,p,"C",f,h)&&(c[p]=ba(k[3])),a=a.substr(k.index+k[0].length);break;case 3:v(b,a.nodeValue);break;case 8:try{if(k=d.exec(a.nodeValue))p=ma(k[1]),ia(b,p,"M",f,h)&&(c[p]=ba(k[2]))}catch(H){}}b.sort(x);return b}function ca(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function Q(a,
b,c){return function(d,e,f,h,g){e=ca(e[0],b,c);return a(d,e,f,h,g)}}function wa(a,b,c,d,e,f,h,g,k){function p(a,b,c,d){if(a){c&&(a=Q(a,c,d));a.require=G.require;if(R===G||G.$$isolateScope)a=W(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Q(b,c,d));b.require=G.require;if(R===G||G.$$isolateScope)b=W(b,{isolateScope:!0});g.push(b)}}function r(a,b,c){var d,e="data",f=!1;if(B(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),f=f||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+
a+"Controller");if(!d&&!f)throw ja("ctreq",a,x);}else K(a)&&(d=[],q(a,function(a){d.push(r(a,b,c))}));return d}function D(a,d,e,f,k){function p(a,b){var c;2>arguments.length&&(b=a,a=s);ia&&(c=S);return k(a,b,c)}var t,ea,U,E,ca,I,S={},Q;t=b===e?c:Qc(c,new Db(y(e),c.$attr));ea=t.$$element;if(R){var V=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(e);I=d.$new(!0);$&&$===R.$$originalDirective?f.data("$isolateScope",I):f.data("$isolateScopeNoTemplate",I);H(f,"ng-isolate-scope");q(R.scope,function(a,b){var c=a.match(V)||
[],e=c[3]||b,f="?"==c[2],c=c[1],h,g,k;I.$$isolateBindings[b]=c+e;switch(c){case "@":t.$observe(e,function(a){I[b]=a});t.$$observers[e].$$scope=d;t[e]&&(I[b]=l(t[e])(d));break;case "=":if(f&&!t[e])break;g=A(t[e]);k=g.assign||function(){h=I[b]=g(d);throw ja("nonassign",t[e],R.name);};h=I[b]=g(d);I.$watch(function(){var a=g(d);a!==I[b]&&(a!==h?h=I[b]=a:k(d,a=h=I[b]));return a});break;case "&":g=A(t[e]);I[b]=function(a){return g(d,a)};break;default:throw ja("iscp",R.name,b,a);}})}Q=k&&p;w&&q(w,function(a){var b=
{$scope:a===R||a.$$isolateScope?I:d,$element:ea,$attrs:t,$transclude:Q},c;ca=a.controller;"@"==ca&&(ca=t[a.name]);c=J(ca,b);S[a.name]=c;ia||ea.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(U=h.length;f<U;f++)try{E=h[f],E(E.isolateScope?I:d,ea,t,E.require&&r(E.require,ea,S),Q)}catch(hd){n(hd,ha(ea))}f=d;R&&(R.template||null===R.templateUrl)&&(f=I);a&&a(f,e.childNodes,s,k);for(f=g.length-1;0<=f;f--)try{E=g[f],E(E.isolateScope?I:d,ea,t,E.require&&r(E.require,
ea,S),Q)}catch(wa){n(wa,ha(ea))}}k=k||{};var U=-Number.MAX_VALUE,E,w=k.controllerDirectives,R=k.newIsolateScopeDirective,$=k.templateDirective;k=k.nonTlbTranscludeDirective;for(var wa=!1,ia=!1,Y=c.$$element=y(b),G,x,O,v=d,u,C=0,M=a.length;C<M;C++){G=a[C];var N=G.$$start,fb=G.$$end;N&&(Y=ca(b,N,fb));O=s;if(U>G.priority)break;if(O=G.scope)E=E||G,G.templateUrl||(z("new/isolated scope",R,G,Y),X(O)&&(R=G));x=G.name;!G.templateUrl&&G.controller&&(O=G.controller,w=w||{},z("'"+x+"' controller",w[x],G,Y),
w[x]=G);if(O=G.transclude)wa=!0,G.$$tlb||(z("transclusion",k,G,Y),k=G),"element"==O?(ia=!0,U=G.priority,O=ca(b,N,fb),Y=c.$$element=y(P.createComment(" "+x+": "+c[x]+" ")),b=Y[0],T(e,y(ta.call(O,0)),b),v=t(O,d,U,f&&f.name,{nonTlbTranscludeDirective:k})):(O=y(yb(b)).contents(),Y.html(""),v=t(O,d));if(G.template)if(z("template",$,G,Y),$=G,O=L(G.template)?G.template(Y,c):G.template,O=hc(O),G.replace){f=G;O=y("<div>"+ba(O)+"</div>").contents();b=O[0];if(1!=O.length||1!==b.nodeType)throw ja("tplrt",x,"");
T(e,Y,b);M={$attr:{}};O=S(b,[],M);var Eb=a.splice(C+1,a.length-(C+1));R&&V(O);a=a.concat(O).concat(Eb);fc(c,M);M=a.length}else Y.html(O);if(G.templateUrl)z("template",$,G,Y),$=G,G.replace&&(f=G),D=F(a.splice(C,a.length-C),Y,c,e,v,h,g,{controllerDirectives:w,newIsolateScopeDirective:R,templateDirective:$,nonTlbTranscludeDirective:k}),M=a.length;else if(G.compile)try{u=G.compile(Y,c,v),L(u)?p(null,u,N,fb):u&&p(u.pre,u.post,N,fb)}catch(Z){n(Z,ha(Y))}G.terminal&&(D.terminal=!0,U=Math.max(U,G.priority))}D.scope=
E&&!0===E.scope;D.transclude=wa&&v;return D}function V(a){for(var b=0,c=a.length;b<c;b++)a[b]=Rb(a[b],{$$isolateScope:!0})}function ia(d,e,f,h,g,l,p){if(e===g)return null;g=null;if(a.hasOwnProperty(e)){var r;e=b.get(e+c);for(var A=0,t=e.length;A<t;A++)try{r=e[A],(h===s||h>r.priority)&&-1!=r.restrict.indexOf(f)&&(l&&(r=Rb(r,{$$start:l,$$end:p})),d.push(r),g=r)}catch(J){n(J)}}return g}function fc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?
";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,f){"class"==f?(H(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function F(a,b,c,d,e,f,h,g){var k=[],l,n,A=b[0],t=a.shift(),J=u({},t,{templateUrl:null,transclude:null,replace:null,$$originalDirective:t}),H=L(t.templateUrl)?t.templateUrl(b,c):t.templateUrl;b.html("");r.get(D.getTrustedResourceUrl(H),
{cache:p}).success(function(p){var r,D;p=hc(p);if(t.replace){p=y("<div>"+ba(p)+"</div>").contents();r=p[0];if(1!=p.length||1!==r.nodeType)throw ja("tplrt",t.name,H);p={$attr:{}};T(d,b,r);var E=S(r,[],p);X(t.scope)&&V(E);a=E.concat(a);fc(c,p)}else r=A,b.html(p);a.unshift(J);l=wa(a,r,c,e,b,t,f,h,g);q(d,function(a,c){a==r&&(d[c]=b[0])});for(n=R(b[0].childNodes,e);k.length;){p=k.shift();D=k.shift();var U=k.shift(),ca=k.shift(),E=b[0];D!==A&&(E=yb(r),T(U,y(D),E));D=l.transclude?$(p,l.transclude):ca;l(n,
p,E,d,D)}k=null}).error(function(a,b,c,d){throw ja("tpload",d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):l(n,b,c,d,e)}}function x(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function z(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function v(a,b){var c=l(b,!0);c&&a.push({priority:0,compile:da(function(a,b){var d=b.parent(),e=d.data("$binding")||[];e.push(c);H(d.data("$binding",e),"ng-binding");a.$watch(c,
function(a){b[0].nodeValue=a})})})}function C(a,b){if("srcdoc"==b)return D.HTML;var c=Fa(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return D.RESOURCE_URL}function M(a,b,c,d){var e=l(c,!0);if(e){if("multiple"===d&&"SELECT"===Fa(a))throw ja("selmulti",ha(a));b.push({priority:100,compile:function(){return{pre:function(b,c,h){c=h.$$observers||(h.$$observers={});if(f.test(d))throw ja("nodomevents");if(e=l(h[d],!0,C(a,d)))h[d]=e(b),(c[d]||(c[d]=[])).$$inter=!0,(h.$$observers&&
h.$$observers[d].$$scope||b).$watch(e,function(a,b){"class"===d&&a!=b?h.$updateClass(a,b):h.$set(d,a)})}}}})}}function T(a,b,c){var d=b[0],e=b.length,f=d.parentNode,h,g;if(a)for(h=0,g=a.length;h<g;h++)if(a[h]==d){a[h++]=c;g=h+e-1;for(var k=a.length;h<k;h++,g++)g<k?a[h]=a[g]:delete a[h];a.length-=e-1;break}f&&f.replaceChild(c,d);a=P.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)f=b[d],y(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function W(a,
b){return u(function(){return a.apply(null,arguments)},a,b)}var Db=function(a,b){this.$$element=a;this.$attr=b||{}};Db.prototype={$normalize:ma,$addClass:function(a){a&&0<a.length&&E.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&E.removeClass(this.$$element,a)},$updateClass:function(a,b){this.$removeClass(ic(b,a));this.$addClass(ic(a,b))},$set:function(a,b,c,d){var e=cc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=
d=bb(a,"-"));e=Fa(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)if(!N||8<=N)e=xa(b).href,""!==e&&("href"===a&&!e.match(h)||"src"===a&&!e.match(g))&&(this[a]=b="unsafe:"+e);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){n(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);U.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var O=l.startSymbol(),
Y=l.endSymbol(),hc="{{"==O||"}}"==Y?Aa:function(a){return a.replace(/\{\{/g,O).replace(/}}/g,Y)},Eb=/^ngAttr[A-Z]/;return t}]}function ma(b){return Oa(b.replace(id,""))}function ic(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),h=0;a:for(;h<d.length;h++){for(var g=d[h],f=0;f<e.length;f++)if(g==e[f])continue a;c+=(0<c.length?" ":"")+g}return c}function jd(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){va(a,"controller");X(a)?u(b,a):b[a]=d};this.$get=["$injector","$window",function(c,
d){return function(e,h){var g,f,m;B(e)&&(g=e.match(a),f=g[1],m=g[3],e=b.hasOwnProperty(f)?b[f]:tb(h.$scope,f,!0)||tb(d,f,!0),Na(e,f,!0));g=c.instantiate(e,h);if(m){if(!h||"object"!=typeof h.$scope)throw C("$controller")("noscp",f||e.name,m);h.$scope[m]=g}return g}}]}function kd(){this.$get=["$window",function(b){return y(b.document)}]}function ld(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function jc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=
b.indexOf(":");c=v(ba(b.substr(0,e)));d=ba(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function kc(b){var a=X(b)?b:s;return function(c){a||(a=jc(b));return c?a[v(c)]||null:a}}function lc(b,a,c){if(L(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function md(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){B(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Tb(d)));return d}],
transformRequest:[function(a){return X(a)&&"[object File]"!==Ya.apply(a)?oa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:d,put:d,patch:d},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},h=this.interceptors=[],g=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,r){function p(a){function c(a){var b=u({},a,{data:lc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?
b:n.reject(b)}var d={transformRequest:e.transformRequest,transformResponse:e.transformResponse},f=function(a){function b(a){var c;q(a,function(b,d){L(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=u({},a.headers),f,h,c=u({},c.common,c[v(a.method)]);b(c);b(d);a:for(f in c){a=v(f);for(h in d)if(v(h)===a)continue a;d[f]=c[f]}return d}(a);u(d,a);d.headers=f;d.method=Ga(d.method);(a=Fb(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(f[d.xsrfHeaderName||e.xsrfHeaderName]=a);var h=
[function(a){f=a.headers;var b=lc(a.data,kc(f),a.transformRequest);z(a.data)&&q(f,function(a,b){"content-type"===v(b)&&delete f[b]});z(a.withCredentials)&&!z(e.withCredentials)&&(a.withCredentials=e.withCredentials);return A(a,b,f).then(c,c)},s],g=n.when(d);for(q(w,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&h.push(a.response,a.responseError)});h.length;){a=h.shift();var k=h.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,
b.status,b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function A(b,c,h){function g(a,b,c){q&&(200<=a&&300>a?q.put(s,[a,b,jc(c)]):q.remove(s));k(b,a,c);d.$$phase||d.$apply()}function k(a,c,d){c=Math.max(c,0);(200<=c&&300>c?r.resolve:r.reject)({data:a,status:c,headers:kc(d),config:b})}function m(){var a=$a(p.pendingRequests,b);-1!==a&&p.pendingRequests.splice(a,1)}var r=n.defer(),A=r.promise,q,w,s=J(b.url,b.params);p.pendingRequests.push(b);
A.then(m,m);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(q=X(b.cache)?b.cache:X(e.cache)?e.cache:U);if(q)if(w=q.get(s),F(w)){if(w.then)return w.then(m,m),w;K(w)?k(w[1],w[0],ga(w[2])):k(w,200,{})}else q.put(s,A);z(w)&&a(b.method,s,c,g,h,b.timeout,b.withCredentials,b.responseType);return A}function J(a,b){if(!b)return a;var c=[];Nc(b,function(a,b){null===a||z(a)||(K(a)||(a=[a]),q(a,function(a){X(a)&&(a=oa(a));c.push(ua(b)+"="+ua(a))}))});return a+(-1==a.indexOf("?")?"?":"&")+c.join("&")}var U=
c("$http"),w=[];q(h,function(a){w.unshift(B(a)?r.get(a):r.invoke(a))});q(g,function(a,b){var c=B(a)?r.get(a):r.invoke(a);w.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});p.pendingRequests=[];(function(a){q(arguments,function(a){p[a]=function(b,c){return p(u(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){p[a]=function(b,c,d){return p(u(d||{},{method:a,url:b,data:c}))}})})("post","put");p.defaults=
e;return p}]}function nd(){this.$get=["$browser","$window","$document",function(b,a,c){return od(b,pd,b.defer,a.angular.callbacks,c[0],a.location.protocol.replace(":",""))}]}function od(b,a,c,d,e,h){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;N&&8>=N?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);
return d}var f=-1;return function(e,k,l,n,r,p,A,J){function U(){D=f;t&&t();H&&H.abort()}function w(a,d,e,f){var g=h||xa(k).protocol;s&&c.cancel(s);t=H=null;d="file"==g?e?200:404:d;a(1223==d?204:d,e,f);b.$$completeOutstandingRequest(x)}var D;b.$$incOutstandingRequestCount();k=k||b.url();if("jsonp"==v(e)){var E="_"+(d.counter++).toString(36);d[E]=function(a){d[E].data=a};var t=g(k.replace("JSON_CALLBACK","angular.callbacks."+E),function(){d[E].data?w(n,200,d[E].data):w(n,D||-2);delete d[E]})}else{var H=
new a;H.open(e,k,!0);q(r,function(a,b){F(a)&&H.setRequestHeader(b,a)});H.onreadystatechange=function(){if(4==H.readyState){var a=null,b=null;D!==f&&(a=H.getAllResponseHeaders(),b=H.responseType?H.response:H.responseText);w(n,D||H.status,b,a)}};A&&(H.withCredentials=!0);J&&(H.responseType=J);H.send(l||null)}if(0<p)var s=c(U,p);else p&&p.then&&p.then(U)}}function qd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse",
"$exceptionHandler","$sce",function(c,d,e){function h(h,k,l){for(var n,r,p=0,A=[],J=h.length,q=!1,w=[];p<J;)-1!=(n=h.indexOf(b,p))&&-1!=(r=h.indexOf(a,n+g))?(p!=n&&A.push(h.substring(p,n)),A.push(p=c(q=h.substring(n+g,r))),p.exp=q,p=r+f,q=!0):(p!=J&&A.push(h.substring(p)),p=J);(J=A.length)||(A.push(""),J=1);if(l&&1<A.length)throw mc("noconcat",h);if(!k||q)return w.length=J,p=function(a){try{for(var b=0,c=J,f;b<c;b++)"function"==typeof(f=A[b])&&(f=f(a),f=l?e.getTrusted(l,f):e.valueOf(f),null===f||
z(f)?f="":"string"!=typeof f&&(f=oa(f))),w[b]=f;return w.join("")}catch(g){a=mc("interr",h,g.toString()),d(a)}},p.exp=h,p.parts=A,p}var g=b.length,f=a.length;h.startSymbol=function(){return b};h.endSymbol=function(){return a};return h}]}function rd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,g,f,m){var k=a.setInterval,l=a.clearInterval,n=c.defer(),r=n.promise,p=0,A=F(m)&&!m;f=F(f)?f:0;r.then(null,null,d);r.$$intervalId=k(function(){n.notify(p++);0<f&&p>=f&&(n.resolve(p),
l(r.$$intervalId),delete e[r.$$intervalId]);A||b.$apply()},g);e[r.$$intervalId]=n;return r}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],!0):!1};return d}]}function sd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",
posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",
mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function nc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=rb(b[a]);return b.join("/")}function oc(b,a,c){b=xa(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=T(b.port)||td[b.protocol]||null}function pc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=xa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=
Vb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function na(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ua(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Gb(b){return b.substr(0,Ua(b).lastIndexOf("/")+1)}function qc(b,a){this.$$html5=!0;a=a||"";var c=Gb(b);oc(b,this,b);this.$$parse=function(a){var e=na(c,a);if(!B(e))throw Hb("ipthprfx",a,c);pc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=
function(){var a=Wb(this.$$search),b=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=nc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=na(b,d))!==s)return d=e,(e=na(a,e))!==s?c+(na("/",e)||e):b+d;if((e=na(c,d))!==s)return c+e;if(c==d+"/")return c}}function Ib(b,a){var c=Gb(b);oc(b,this,b);this.$$parse=function(d){var e=na(b,d)||na(c,d),e="#"==e.charAt(0)?na(a,e):this.$$html5?e:"";if(!B(e))throw Hb("ihshprfx",d,a);pc(e,this,b);this.$$compose()};
this.$$compose=function(){var c=Wb(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=nc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Ua(b)==Ua(a))return a}}function rc(b,a){this.$$html5=!0;Ib.apply(this,arguments);var c=Gb(b);this.$$rewrite=function(d){var e;if(b==Ua(d))return d;if(e=na(c,d))return b+a+e;if(c===d+"/")return c}}function gb(b){return function(){return this[b]}}function sc(b,a){return function(c){if(z(c))return this[b];
this[b]=a(c);this.$$compose();return this}}function ud(){var b="",a=!1;this.hashPrefix=function(a){return F(a)?(b=a,this):b};this.html5Mode=function(b){return F(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,h){function g(a){c.$broadcast("$locationChangeSuccess",f.absUrl(),a)}var f,m=d.baseHref(),k=d.url();a?(m=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(m||"/"),e=e.history?qc:rc):(m=Ua(k),e=Ib);f=new e(m,"#"+b);f.$$parse(f.$$rewrite(k));h.on("click",
function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==v(b[0].nodeName);)if(b[0]===h[0]||!(b=b.parent())[0])return;var e=b.prop("href"),g=f.$$rewrite(e);e&&(!b.attr("target")&&g&&!a.isDefaultPrevented())&&(a.preventDefault(),g!=d.url()&&(f.$$parse(g),c.$apply(),Z.angular["ff-684208-preventDefault"]=!0))}});f.absUrl()!=k&&d.url(f.absUrl(),!0);d.onUrlChange(function(a){f.absUrl()!=a&&(c.$broadcast("$locationChangeStart",a,f.absUrl()).defaultPrevented?d.url(f.absUrl()):(c.$evalAsync(function(){var b=
f.absUrl();f.$$parse(a);g(b)}),c.$$phase||c.$digest()))});var l=0;c.$watch(function(){var a=d.url(),b=f.$$replace;l&&a==f.absUrl()||(l++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",f.absUrl(),a).defaultPrevented?f.$$parse(a):(d.url(f.absUrl(),b),g(a))}));f.$$replace=!1;return l});return f}]}function vd(){var b=!0,a=this;this.debugEnabled=function(a){return F(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?
"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||x;return e.apply?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function pa(b,a){if("constructor"===b)throw ya("isecfld",a);return b}
function Va(b,a){if(b&&b.constructor===b)throw ya("isecfn",a);if(b&&b.document&&b.location&&b.alert&&b.setInterval)throw ya("isecwindow",a);if(b&&(b.nodeName||b.on&&b.find))throw ya("isecdom",a);return b}function hb(b,a,c,d,e){e=e||{};a=a.split(".");for(var h,g=0;1<a.length;g++){h=pa(a.shift(),d);var f=b[h];f||(f={},b[h]=f);b=f;b.then&&e.unwrapPromises&&(qa(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}h=pa(a.shift(),d);return b[h]=c}function tc(b,a,c,d,
e,h,g){pa(b,h);pa(a,h);pa(c,h);pa(d,h);pa(e,h);return g.unwrapPromises?function(f,g){var k=g&&g.hasOwnProperty(b)?g:f,l;if(null===k||k===s)return k;(k=k[b])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!a||null===k||k===s)return k;(k=k[a])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!c||null===k||k===s)return k;(k=k[c])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!d||null===k||k===s)return k;
(k=k[d])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!e||null===k||k===s)return k;(k=k[e])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);return k}:function(f,h){var g=h&&h.hasOwnProperty(b)?h:f;if(null===g||g===s)return g;g=g[b];if(!a||null===g||g===s)return g;g=g[a];if(!c||null===g||g===s)return g;g=g[c];if(!d||null===g||g===s)return g;g=g[d];return e&&null!==g&&g!==s?g=g[e]:g}}function uc(b,a,c){if(Jb.hasOwnProperty(b))return Jb[b];
var d=b.split("."),e=d.length,h;if(a.csp)h=6>e?tc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,f){var h=0,g;do g=tc(d[h++],d[h++],d[h++],d[h++],d[h++],c,a)(b,f),f=s,b=g;while(h<e);return g};else{var g="var l, fn, p;\n";q(d,function(b,d){pa(b,c);g+="if(s === null || s === undefined) return s;\nl=s;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':
"")});var g=g+"return s;",f=new Function("s","k","pw",g);f.toString=function(){return g};h=function(a,b){return f(a,b,qa)}}"hasOwnProperty"!==b&&(Jb[b]=h);return h}function wd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return F(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return F(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;qa=function(b){a.logPromiseWarnings&&
!vc.hasOwnProperty(b)&&(vc[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Kb(a);e=(new Wa(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return x}}}]}function xd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return yd(function(a){b.$evalAsync(a)},a)}]}
function yd(b,a){function c(a){return a}function d(a){return g(a)}var e=function(){var f=[],m,k;return k={resolve:function(a){if(f){var c=f;f=s;m=h(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],m.then(a[0],a[1],a[2])})}},reject:function(a){k.resolve(g(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var k=e(),A=function(d){try{k.resolve((L(b)?b:c)(d))}catch(e){k.reject(e),a(e)}},J=function(b){try{k.resolve((L(g)?
g:d)(b))}catch(c){k.reject(c),a(c)}},q=function(b){try{k.notify((L(h)?h:c)(b))}catch(d){a(d)}};f?f.push([A,J,q]):m.then(A,J,q);return k.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,f){var g=null;try{g=(a||c)()}catch(h){return b(h,!1)}return g&&L(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,
!1)})}}}},h=function(a){return a&&L(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},g=function(c){return{then:function(g,h){var l=e();b(function(){try{l.resolve((L(h)?h:d)(c))}catch(b){l.reject(b),a(b)}});return l.promise}}};return{defer:e,reject:g,when:function(f,m,k,l){var n=e(),r,p=function(b){try{return(L(m)?m:c)(b)}catch(d){return a(d),g(d)}},A=function(b){try{return(L(k)?k:d)(b)}catch(c){return a(c),g(c)}},J=function(b){try{return(L(l)?l:c)(b)}catch(d){a(d)}};
b(function(){h(f).then(function(a){r||(r=!0,n.resolve(h(a).then(p,A,J)))},function(a){r||(r=!0,n.resolve(A(a)))},function(a){r||n.notify(J(a))})});return n.promise},all:function(a){var b=e(),c=0,d=K(a)?[]:{};q(a,function(a,e){c++;h(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function zd(){var b=10,a=C("$rootScope");this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=
["$injector","$exceptionHandler","$parse","$browser",function(c,d,e,h){function g(){this.$id=Xa();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$isolateBindings={}}function f(b){if(l.$$phase)throw a("inprog",l.$$phase);l.$$phase=b}function m(a,b){var c=e(a);Na(c,b);return c}function k(){}g.prototype={constructor:g,
$new:function(a){a?(a=new g,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=Xa());a["this"]=a;a.$$listeners={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,c){var d=m(a,"watch"),e=this.$$watchers,f={fn:b,last:k,
get:d,exp:a,eq:!!c};if(!L(b)){var g=m(b||x,"listener");f.fn=function(a,b,c){g(c)}}if("string"==typeof a&&d.constant){var h=f.fn;f.fn=function(a,b,c){h.call(this,a,b,c);Ka(e,f)}}e||(e=this.$$watchers=[]);e.unshift(f);return function(){Ka(e,f)}},$watchCollection:function(a,b){var c=this,d,f,g=0,h=e(a),k=[],l={},m=0;return this.$watch(function(){f=h(c);var a,b;if(X(f))if(ob(f))for(d!==k&&(d=k,m=d.length=0,g++),a=f.length,m!==a&&(g++,d.length=m=a),b=0;b<a;b++)d[b]!==f[b]&&(g++,d[b]=f[b]);else{d!==l&&
(d=l={},m=0,g++);a=0;for(b in f)f.hasOwnProperty(b)&&(a++,d.hasOwnProperty(b)?d[b]!==f[b]&&(g++,d[b]=f[b]):(m++,d[b]=f[b],g++));if(m>a)for(b in g++,d)d.hasOwnProperty(b)&&!f.hasOwnProperty(b)&&(m--,delete d[b])}else d!==f&&(d=f,g++);return g},function(){b(f,d,c)})},$digest:function(){var c,e,g,h,m=this.$$asyncQueue,q=this.$$postDigestQueue,s,D,E=b,t,H=[],y,x,S;f("$digest");do{D=!1;for(t=this;m.length;)try{S=m.shift(),S.scope.$eval(S.expression)}catch(F){d(F)}do{if(h=t.$$watchers)for(s=h.length;s--;)try{(c=
h[s])&&((e=c.get(t))!==(g=c.last)&&!(c.eq?Ba(e,g):"number"==typeof e&&"number"==typeof g&&isNaN(e)&&isNaN(g)))&&(D=!0,c.last=c.eq?ga(e):e,c.fn(e,g===k?e:g,t),5>E&&(y=4-E,H[y]||(H[y]=[]),x=L(c.exp)?"fn: "+(c.exp.name||c.exp.toString()):c.exp,x+="; newVal: "+oa(e)+"; oldVal: "+oa(g),H[y].push(x)))}catch(Q){d(Q)}if(!(h=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(h=t.$$nextSibling);)t=t.$parent}while(t=h);if(D&&!E--)throw l.$$phase=null,a("infdig",b,oa(H));}while(D||m.length);for(l.$$phase=
null;q.length;)try{q.shift()()}catch(z){d(z)}},$destroy:function(){if(l!=this&&!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=
null}},$eval:function(a,b){return e(a)(this,b)},$evalAsync:function(a){l.$$phase||l.$$asyncQueue.length||h.defer(function(){l.$$asyncQueue.length&&l.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return f("$apply"),this.$eval(a)}catch(b){d(b)}finally{l.$$phase=null;try{l.$digest()}catch(c){throw d(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);return function(){c[$a(c,
b)]=null}},$emit:function(a,b){var c=[],e,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(ta.call(arguments,1)),l,m;do{e=f.$$listeners[a]||c;h.currentScope=f;l=0;for(m=e.length;l<m;l++)if(e[l])try{e[l].apply(null,k)}catch(q){d(q)}else e.splice(l,1),l--,m--;if(g)break;f=f.$parent}while(f);return h},$broadcast:function(a,b){var c=this,e=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=
!0},defaultPrevented:!1},g=[f].concat(ta.call(arguments,1)),h,k;do{c=e;f.currentScope=c;e=c.$$listeners[a]||[];h=0;for(k=e.length;h<k;h++)if(e[h])try{e[h].apply(null,g)}catch(l){d(l)}else e.splice(h,1),h--,k--;if(!(e=c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(e=c.$$nextSibling);)c=c.$parent}while(c=e);return f}};var l=new g;return l}]}function Ad(b){if("self"===b)return b;if(B(b)){if(-1<b.indexOf("***"))throw ra("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,
"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(Za(b))return RegExp("^"+b.source+"$");throw ra("imatcher");}function wc(b){var a=[];F(b)&&q(b,function(b){a.push(Ad(b))});return a}function Bd(){this.SCE_CONTEXTS=fa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=wc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=wc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=
function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ra("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var h=d(),g={};g[fa.HTML]=d(h);g[fa.CSS]=d(h);g[fa.URL]=d(h);g[fa.JS]=d(h);g[fa.RESOURCE_URL]=d(g[fa.URL]);return{trustAs:function(a,b){var c=g.hasOwnProperty(a)?g[a]:null;if(!c)throw ra("icontext",a,b);if(null===b||b===
s||""===b)return b;if("string"!==typeof b)throw ra("itype",a);return new c(b)},getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var h=g.hasOwnProperty(c)?g[c]:null;if(h&&d instanceof h)return d.$$unwrapTrustedValue();if(c===fa.RESOURCE_URL){var h=xa(d.toString()),l,n,r=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Fb(h):b[l].exec(h.href)){r=!0;break}if(r)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Fb(h):a[l].exec(h.href)){r=!1;break}if(r)return d;throw ra("insecurl",d.toString());}if(c===
fa.HTML)return e(d);throw ra("unsafe");},valueOf:function(a){return a instanceof h?a.$$unwrapTrustedValue():a}}}]}function Cd(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ra("iequirks");var e=ga(fa);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Aa);e.parseAs=
function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,d(a,c))}};var h=e.parseAs,g=e.getTrusted,f=e.trustAs;q(fa,function(a,b){var c=v(b);e[Oa("parse_as_"+c)]=function(b){return h(a,b)};e[Oa("get_trusted_"+c)]=function(b){return g(a,b)};e[Oa("trust_as_"+c)]=function(b){return f(a,b)}});return e}]}function Dd(){this.$get=["$window","$document",function(b,a){var c={},d=T((/android (\d+)/.exec(v((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||
{}).userAgent),h=a[0]||{},g=h.documentMode,f,m=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=h.body&&h.body.style,l=!1,n=!1;if(k){for(var r in k)if(l=m.exec(r)){f=l[0];f=f.substr(0,1).toUpperCase()+f.substr(1);break}f||(f="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||f+"Transition"in k);n=!!("animation"in k||f+"Animation"in k);!d||l&&n||(l=B(h.body.style.webkitTransition),n=B(h.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!g||7<
g),hasEvent:function(a){if("input"==a&&9==N)return!1;if(z(c[a])){var b=h.createElement("div");c[a]="on"+a in b}return c[a]},csp:Sb(),vendorPrefix:f,transitions:l,animations:n,msie:N,msieDocumentMode:g}}]}function Ed(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,f,m){var k=c.defer(),l=k.promise,n=F(m)&&!m;f=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete h[l.$$timeoutId]}n||b.$apply()},f);l.$$timeoutId=f;h[f]=k;return l}
var h={};e.cancel=function(b){return b&&b.$$timeoutId in h?(h[b.$$timeoutId].reject("canceled"),delete h[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function xa(b,a){var c=b;N&&(aa.setAttribute("href",c),c=aa.href);aa.setAttribute("href",c);var c=aa.pathname,d=b;0===d.indexOf(a)&&(d=d.replace(a,""));xc.exec(d)||(c=(d=xc.exec(c))?d[1]:c);c="/"===c.charAt(0)?c:"/"+c;return{href:aa.href,protocol:aa.protocol?aa.protocol.replace(/:$/,""):"",host:aa.host,search:aa.search?aa.search.replace(/^\?/,
""):"",hash:aa.hash?aa.hash.replace(/^#/,""):"",hostname:aa.hostname,port:aa.port,pathname:c}}function Fb(b){b=B(b)?xa(b):b;return b.protocol===yc.protocol&&b.host===yc.host}function Fd(){this.$get=da(Z)}function zc(b){function a(d,e){if(X(d)){var h={};q(d,function(b,c){h[c]=a(c,b)});return h}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ac);a("date",Bc);a("filter",Gd);a("json",Hd);a("limitTo",Id);a("lowercase",
Jd);a("number",Cc);a("orderBy",Dc);a("uppercase",Kd)}function Gd(){return function(b,a,c){if(!K(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return ab.equals(a,b)}:function(a,b){b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var h=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!h(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,
b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&h(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(h(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)"$"==g?function(){if(a[g]){var b=g;e.push(function(c){return h(c,a[b])})}}():function(){if("undefined"!=typeof a[g]){var b=g;e.push(function(c){return h(tb(c,b),a[b])})}}();break;case "function":e.push(a);
break;default:return b}for(var d=[],f=0;f<b.length;f++){var m=b[f];e.check(m)&&d.push(m)}return d}}function Ac(b){var a=b.NUMBER_FORMATS;return function(b,d){z(d)&&(d=a.CURRENCY_SYM);return Ec(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Cc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Ec(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Ec(b,a,c,d,e){if(isNaN(b)||!isFinite(b))return"";var h=0>b;b=Math.abs(b);var g=b+"",f="",m=[],k=!1;if(-1!==g.indexOf("e")){var l=
g.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>e+1?g="0":(f=g,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(f=b.toFixed(e));else{g=(g.split(Fc)[1]||"").length;z(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));g=Math.pow(10,e);b=Math.round(b*g)/g;b=(""+b).split(Fc);g=b[0];b=b[1]||"";var l=0,n=a.lgSize,r=a.gSize;if(g.length>=n+r)for(l=g.length-n,k=0;k<l;k++)0===(l-k)%r&&0!==k&&(f+=c),f+=g.charAt(k);for(k=l;k<g.length;k++)0===(g.length-k)%n&&0!==k&&(f+=c),f+=g.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(f+=
d+b.substr(0,e))}m.push(h?a.negPre:a.posPre);m.push(f);m.push(h?a.negSuf:a.posSuf);return m.join("")}function Lb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function W(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Lb(e,a,d)}}function ib(b,a){return function(c,d){var e=c["get"+b](),h=Ga(a?"SHORT"+b:b);return d[h][e]}}function Bc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var h=
0,g=0,f=b[8]?a.setUTCFullYear:a.setFullYear,m=b[8]?a.setUTCHours:a.setHours;b[9]&&(h=T(b[9]+b[10]),g=T(b[9]+b[11]));f.call(a,T(b[1]),T(b[2])-1,T(b[3]));h=T(b[4]||0)-h;g=T(b[5]||0)-g;f=T(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));m.call(a,h,g,f,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var h="",g=[],f,m;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;B(c)&&(c=Ld.test(c)?T(c):a(c));pb(c)&&(c=
new Date(c));if(!Ja(c))return c;for(;e;)(m=Md.exec(e))?(g=g.concat(ta.call(m,1)),e=g.pop()):(g.push(e),e=null);q(g,function(a){f=Nd[a];h+=f?f(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return h}}function Hd(){return function(b){return oa(b,!0)}}function Id(){return function(b,a){if(!K(b)&&!B(b))return b;a=T(a);if(B(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<
e;d++)c.push(b[d]);return c}}function Dc(b){return function(a,c,d){function e(a,b){return Ma(b)?function(b,c){return a(c,b)}:a}if(!K(a)||!c)return a;c=K(c)?c:[c];c=Pc(c,function(a){var c=!1,d=a||Aa;if(B(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a)}return e(function(a,b){var c;c=d(a);var e=d(b),f=typeof c,h=typeof e;f==h?("string"==f&&(c=c.toLowerCase(),e=e.toLowerCase()),c=c===e?0:c<e?-1:1):c=f<h?-1:1;return c},c)});for(var h=[],g=0;g<a.length;g++)h.push(a[g]);
return h.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function sa(b){L(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function Gc(b,a){function c(a,c){c=c?"-"+bb(c,"-"):"";b.removeClass((a?jb:kb)+c).addClass((a?kb:jb)+c)}var d=this,e=b.parent().controller("form")||lb,h=0,g=d.$error={},f=[];d.$name=a.name||a.ngForm;d.$dirty=!1;d.$pristine=!0;d.$valid=!0;d.$invalid=!1;e.$addControl(d);b.addClass(Ha);c(!0);d.$addControl=function(a){va(a.$name,
"input");f.push(a);a.$name&&(d[a.$name]=a)};d.$removeControl=function(a){a.$name&&d[a.$name]===a&&delete d[a.$name];q(g,function(b,c){d.$setValidity(c,!0,a)});Ka(f,a)};d.$setValidity=function(a,b,f){var n=g[a];if(b)n&&(Ka(n,f),n.length||(h--,h||(c(b),d.$valid=!0,d.$invalid=!1),g[a]=!1,c(!0,a),e.$setValidity(a,!0,d)));else{h||c(b);if(n){if(-1!=$a(n,f))return}else g[a]=n=[],h++,c(!1,a),e.$setValidity(a,!1,d);n.push(f);d.$valid=!1;d.$invalid=!0}};d.$setDirty=function(){b.removeClass(Ha).addClass(mb);
d.$dirty=!0;d.$pristine=!1;e.$setDirty()};d.$setPristine=function(){b.removeClass(mb).addClass(Ha);d.$dirty=!1;d.$pristine=!0;q(f,function(a){a.$setPristine()})}}function nb(b,a,c,d,e,h){var g=!1;a.on("compositionstart",function(){g=!0});a.on("compositionend",function(){g=!1});var f=function(){if(!g){var e=a.val();Ma(c.ngTrim||"T")&&(e=ba(e));d.$viewValue!==e&&b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",f);else{var m,k=function(){m||(m=h.defer(function(){f();m=null}))};
a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||k()});a.on("change",f);if(e.hasEvent("paste"))a.on("paste cut",k)}d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var l=c.ngPattern,n=function(a,b){if(d.$isEmpty(b)||a.test(b))return d.$setValidity("pattern",!0),b;d.$setValidity("pattern",!1);return s};l&&((e=l.match(/^\/(.*)\/([gim]*)$/))?(l=RegExp(e[1],e[2]),e=function(a){return n(l,a)}):e=function(c){var d=b.$eval(l);if(!d||!d.test)throw C("ngPattern")("noregexp",
l,d,ha(a));return n(d,c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var r=T(c.ngMinlength);e=function(a){if(!d.$isEmpty(a)&&a.length<r)return d.$setValidity("minlength",!1),s;d.$setValidity("minlength",!0);return a};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var p=T(c.ngMaxlength);e=function(a){if(!d.$isEmpty(a)&&a.length>p)return d.$setValidity("maxlength",!1),s;d.$setValidity("maxlength",!0);return a};d.$parsers.push(e);d.$formatters.push(e)}}function Mb(b,a){b=
"ngClass"+b;return function(){return{restrict:"AC",link:function(c,d,e){function h(b){if(!0===a||c.$index%2===a){var d=g(b||"");f?Ba(b,f)||e.$updateClass(d,g(f)):e.$addClass(d)}f=ga(b)}function g(a){if(K(a))return a.join(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b.join(" ")}return a}var f;c.$watch(e[b],h,!0);e.$observe("class",function(a){h(c.$eval(e[b]))});"ngClass"!==b&&c.$watch("$index",function(d,f){var h=d&1;if(h!==f&1){var n=g(c.$eval(e[b]));h===a?e.$addClass(n):e.$removeClass(n)}})}}}}
var v=function(b){return B(b)?b.toLowerCase():b},Ga=function(b){return B(b)?b.toUpperCase():b},N,y,Ca,ta=[].slice,Od=[].push,Ya=Object.prototype.toString,La=C("ng"),ab=Z.angular||(Z.angular={}),Ta,Fa,ka=["0","0","0"];N=T((/msie (\d+)/.exec(v(navigator.userAgent))||[])[1]);isNaN(N)&&(N=T((/trident\/.*; rv:(\d+)/.exec(v(navigator.userAgent))||[])[1]));x.$inject=[];Aa.$inject=[];var ba=function(){return String.prototype.trim?function(b){return B(b)?b.trim():b}:function(b){return B(b)?b.replace(/^\s*/,
"").replace(/\s*$/,""):b}}();Fa=9>N?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Ga(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Tc=/[A-Z]/g,Pd={full:"1.2.2",major:1,minor:2,dot:2,codeName:"consciousness-inertia"},Qa=M.cache={},cb=M.expando="ng-"+(new Date).getTime(),Xc=1,Hc=Z.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},zb=Z.document.removeEventListener?
function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)},Vc=/([\:\-\_]+(.))/g,Wc=/^moz([A-Z])/,wb=C("jqLite"),Ea=M.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===P.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),M(Z).on("load",a))},toString:function(){var b=[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Od,sort:[].sort,splice:[].splice},
eb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){eb[v(b)]=b});var dc={};q("input select option textarea button form details".split(" "),function(b){dc[Ga(b)]=!0});q({data:ac,inheritedData:db,scope:function(b){return y(b).data("$scope")||db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:bc,injector:function(b){return db(b,"$injector")},removeAttr:function(b,
a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=Oa(a);if(F(c))b.style[a]=c;else{var d;8>=N&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=N&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=v(a);if(eb[d])if(F(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||x).specified?d:s;else if(F(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,
a,c){if(F(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(z(d))return e?b[e]:"";b[e]=d}var a=[];9>N?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(z(a)){if("SELECT"===Fa(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(z(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Pa(d[c]);b.innerHTML=
a}},function(b,a){M.prototype[a]=function(a,d){var e,h;if((2==b.length&&b!==Ab&&b!==bc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===ac)b(this[e],a);else for(h in a)b(this[e],h,a[h]);return this}e=b.$dv;h=e===s?Math.min(this.length,1):this.length;for(var g=0;g<h;g++){var f=b(this[g],a,d);e=e?e+f:f}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:Zb,dealoc:Pa,on:function a(c,d,e,h){if(F(h))throw wb("onargs");var g=la(c,"events"),f=la(c,"handle");g||la(c,"events",
g={});f||la(c,"handle",f=Yc(c,g));q(d.split(" "),function(d){var h=g[d];if(!h){if("mouseenter"==d||"mouseleave"==d){var l=P.body.contains||P.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};g[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=
a.relatedTarget;c&&(c===this||l(this,c))||f(a,d)})}else Hc(c,d,f),g[d]=[];h=g[d]}h.push(e)})},off:$b,replaceWith:function(a,c){var d,e=a.parentNode;Pa(a);q(new M(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.childNodes||[]},append:function(a,c){q(new M(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===
a.nodeType){var d=a.firstChild;q(new M(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Pa(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new M(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){z(d)&&(d=!Ab(a,c));(d?Cb:Bb)(a,c)},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;
for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName(c)},clone:yb,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:x,stopPropagation:x}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){M.prototype[c]=function(c,e,h){for(var g,f=0;f<this.length;f++)z(g)?(g=a(this[f],c,e,h),F(g)&&(g=y(g))):xb(g,a(this[f],c,e,h));return F(g)?g:this};M.prototype.bind=M.prototype.on;M.prototype.unbind=M.prototype.off});
Ra.prototype={put:function(a,c){this[Da(a)]=c},get:function(a){return this[Da(a)]},remove:function(a){var c=this[a=Da(a)];delete this[a];return c}};var $c=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,ad=/,/,bd=/^\s*(_?)(\S+?)\1\s*$/,Zc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Sa=C("$injector"),Qd=C("$animate"),Rd=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Qd("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.$get=["$timeout",
function(a){return{enter:function(d,e,h,g){h?h.after(d):(e&&e[0]||(e=h.parent()),e.append(d));g&&a(g,0,!1)},leave:function(d,e){d.remove();e&&a(e,0,!1)},move:function(a,c,h,g){this.enter(a,c,h,g)},addClass:function(d,e,h){e=B(e)?e:K(e)?e.join(" "):"";q(d,function(a){Cb(a,e)});h&&a(h,0,!1)},removeClass:function(d,e,h){e=B(e)?e:K(e)?e.join(" "):"";q(d,function(a){Bb(a,e)});h&&a(h,0,!1)},enabled:x}}]}],ja=C("$compile");gc.$inject=["$provide"];var id=/^(x[\:\-_]|data[\:\-_])/i,pd=Z.XMLHttpRequest||function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw C("$httpBackend")("noxhr");
},mc=C("$interpolate"),Sd=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,td={http:80,https:443,ftp:21},Hb=C("$location");rc.prototype=Ib.prototype=qc.prototype={$$html5:!1,$$replace:!1,absUrl:gb("$$absUrl"),url:function(a,c){if(z(a))return this.$$url;var d=Sd.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:gb("$$protocol"),host:gb("$$host"),port:gb("$$port"),path:sc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,
c){switch(arguments.length){case 0:return this.$$search;case 1:if(B(a))this.$$search=Vb(a);else if(X(a))this.$$search=a;else throw Hb("isrcharg");break;default:z(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:sc("$$hash",Aa),replace:function(){this.$$replace=!0;return this}};var ya=C("$parse"),vc={},qa,Ia={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:x,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return F(d)?
F(e)?d+e:d:F(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(F(d)?d:0)-(F(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":x,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},
">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Td={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Kb=function(a){this.options=a};Kb.prototype={constructor:Kb,lex:function(a){this.text=a;
this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&
this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),h=Ia[this.ch],g=Ia[d],f=Ia[e];f?(this.tokens.push({index:this.index,text:e,fn:f}),this.index+=3):g?(this.tokens.push({index:this.index,text:d,fn:g}),this.index+=2):h?(this.tokens.push({index:this.index,text:this.ch,fn:h,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",
this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=F(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ya("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=v(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,h,g,f;this.index<this.text.length;){f=this.text.charAt(this.index);if("."===f||this.isIdent(f)||this.isNumber(f))"."===f&&(e=this.index),c+=f;else break;this.index++}if(e)for(h=this.index;h<this.text.length;){f=this.text.charAt(h);if("("===f){g=c.substr(e-d+1);c=c.substr(0,
e-d);this.index=h;break}if(this.isWhitespace(f))h++;else break}d={index:d,text:c};if(Ia.hasOwnProperty(c))d.fn=Ia[c],d.json=Ia[c];else{var m=uc(c,this.options,this.text);d.fn=u(function(a,c){return m(a,c)},{assign:function(d,e){return hb(d,c,e,a.text,a.options)}})}this.tokens.push(d);g&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:g,json:!1}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,h=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),
e=e+g;if(h)"u"===g?(g=this.text.substring(this.index+1,this.index+5),g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,d+=String.fromCharCode(parseInt(g,16))):d=(h=Td[g])?d+h:d+g,h=!1;else if("\\"===g)h=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var Wa=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};Wa.ZERO=function(){return 0};
Wa.prototype={constructor:Wa,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),
this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw ya("syntax",c.text,a,c.index+1,this.text,
this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ya("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var h=this.tokens[0],g=h.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return h}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},
unaryFn:function(a,c){return u(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return u(function(e,h){return a(e,h)?c(e,h):d(e,h)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return u(function(e,h){return c(e,h,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,h=
0;h<a.length;h++){var g=a[h];g&&(e=g(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=function(a,e,f){f=[f];for(var m=0;m<d.length;m++)f.push(d[m](a,e));return c.apply(a,f)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=
this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,h){return a.assign(d,c(d,h),h)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,
c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+",
"-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(Wa.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=uc(d,this.options,this.text);return u(function(c,d,f){return e(f||
a(c,d),d)},{assign:function(e,g,f){return hb(a(e,f),d,g,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return u(function(e,h){var g=a(e,h),f=d(e,h),m;if(!g)return s;(g=Va(g[f],c.text))&&(g.then&&c.options.unwrapPromises)&&(m=g,"$$v"in g||(m.$$v=s,m.then(function(a){m.$$v=a})),g=g.$$v);return g},{assign:function(e,h,g){var f=d(e,g);return Va(a(e,g),c.text)[f]=h}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this;return function(h,g){for(var f=[],m=c?c(h,g):h,k=0;k<d.length;k++)f.push(d[k](h,g));k=a(h,g,m)||x;Va(m,e.text);Va(k,e.text);f=k.apply?k.apply(m,f):k(f[0],f[1],f[2],f[3],f[4]);return Va(f,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return u(function(c,d){for(var g=[],f=0;f<a.length;f++)g.push(a[f](c,d));return g},
{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return u(function(c,d){for(var e={},m=0;m<a.length;m++){var k=a[m];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Jb={},ra=C("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},aa=P.createElement("a"),
xc=/^\/?.*?:(\/.*)/,yc=xa(Z.location.href,!0);zc.$inject=["$provide"];Ac.$inject=["$locale"];Cc.$inject=["$locale"];var Fc=".",Nd={yyyy:W("FullYear",4),yy:W("FullYear",2,0,!0),y:W("FullYear",1),MMMM:ib("Month"),MMM:ib("Month",!0),MM:W("Month",2,1),M:W("Month",1,1),dd:W("Date",2),d:W("Date",1),HH:W("Hours",2),H:W("Hours",1),hh:W("Hours",2,-12),h:W("Hours",1,-12),mm:W("Minutes",2),m:W("Minutes",1),ss:W("Seconds",2),s:W("Seconds",1),sss:W("Milliseconds",3),EEEE:ib("Day"),EEE:ib("Day",!0),a:function(a,
c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Lb(Math[0<a?"floor":"ceil"](a/60),2)+Lb(Math.abs(a%60),2))}},Md=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ld=/^\-?\d+$/;Bc.$inject=["$locale"];var Jd=da(v),Kd=da(Ga);Dc.$inject=["$parse"];var Ud=da({restrict:"E",compile:function(a,c){8>=N&&(c.href||c.name||c.$set("href",""),a.append(P.createComment("IE fix")));return function(a,c){c.on("click",function(a){c.attr("href")||
a.preventDefault()})}}}),Nb={};q(eb,function(a,c){if("multiple"!=a){var d=ma("ng-"+c);Nb[d]=function(){return{priority:100,compile:function(){return function(a,h,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}}});q(["src","srcset","href"],function(a){var c=ma("ng-"+a);Nb[c]=function(){return{priority:99,link:function(d,e,h){h.$observe(c,function(c){c&&(h.$set(a,c),N&&e.prop(a,h[a]))})}}}});var lb={$addControl:x,$removeControl:x,$setValidity:x,$setDirty:x,$setPristine:x};Gc.$inject=["$element","$attrs",
"$scope"];var Ic=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:Gc,compile:function(){return{pre:function(a,e,h,g){if(!h.action){var f=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Hc(e[0],"submit",f);e.on("$destroy",function(){c(function(){zb(e[0],"submit",f)},0,!1)})}var m=e.parent().controller("form"),k=h.name||h.ngForm;k&&hb(a,k,g,k);if(m)e.on("$destroy",function(){m.$removeControl(g);k&&hb(a,k,s,k);u(g,lb)})}}}}}]},Vd=Ic(),Wd=
Ic(!0),Xd=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Yd=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,Zd=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Jc={text:nb,number:function(a,c,d,e,h,g){nb(a,c,d,e,h,g);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Zd.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=
parseFloat(d.min);if(!e.$isEmpty(a)&&a<c)return e.$setValidity("min",!1),s;e.$setValidity("min",!0);return a},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);if(!e.$isEmpty(a)&&a>c)return e.$setValidity("max",!1),s;e.$setValidity("max",!0);return a},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){if(e.$isEmpty(a)||pb(a))return e.$setValidity("number",!0),a;e.$setValidity("number",!1);return s})},url:function(a,c,d,e,h,g){nb(a,c,d,e,
h,g);a=function(a){if(e.$isEmpty(a)||Xd.test(a))return e.$setValidity("url",!0),a;e.$setValidity("url",!1);return s};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,h,g){nb(a,c,d,e,h,g);a=function(a){if(e.$isEmpty(a)||Yd.test(a))return e.$setValidity("email",!0),a;e.$setValidity("email",!1);return s};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){z(d.name)&&c.attr("name",Xa());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});
e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var h=d.ngTrueValue,g=d.ngFalseValue;B(h)||(h=!0);B(g)||(g=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==h};e.$formatters.push(function(a){return a===h});e.$parsers.push(function(a){return a?h:g})},hidden:x,button:x,submit:x,reset:x},Kc=["$browser","$sniffer",function(a,
c){return{restrict:"E",require:"?ngModel",link:function(d,e,h,g){g&&(Jc[v(h.type)]||Jc.text)(d,e,h,g,c,a)}}}],kb="ng-valid",jb="ng-invalid",Ha="ng-pristine",mb="ng-dirty",$d=["$scope","$exceptionHandler","$attrs","$element","$parse",function(a,c,d,e,h){function g(a,c){c=c?"-"+bb(c,"-"):"";e.removeClass((a?jb:kb)+c).addClass((a?kb:jb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=
!1;this.$name=d.name;var f=h(d.ngModel),m=f.assign;if(!m)throw C("ngModel")("nonassign",d.ngModel,ha(e));this.$render=x;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};var k=e.inheritedData("$formController")||lb,l=0,n=this.$error={};e.addClass(Ha);g(!0);this.$setValidity=function(a,c){n[a]!==!c&&(c?(n[a]&&l--,l||(g(!0),this.$valid=!0,this.$invalid=!1)):(g(!1),this.$invalid=!0,this.$valid=!1,l++),n[a]=!c,g(c,a),k.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;
this.$pristine=!0;e.removeClass(mb).addClass(Ha)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,e.removeClass(Ha).addClass(mb),k.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,m(a,d),q(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=f(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=
c,r.$render())}})}],ae=function(){return{require:["ngModel","^?form"],controller:$d,link:function(a,c,d,e){var h=e[0],g=e[1]||lb;g.$addControl(h);a.$on("$destroy",function(){g.$removeControl(h)})}}},be=da({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Lc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var h=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",
!0),a};e.$formatters.push(h);e.$parsers.unshift(h);d.$observe("required",function(){h(e.$viewValue)})}}}},ce=function(){return{require:"ngModel",link:function(a,c,d,e){var h=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!z(a)){var c=[];a&&q(a.split(h),function(a){a&&c.push(ba(a))});return c}});e.$formatters.push(function(a){return K(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},de=/^(true|false|\d+)$/,ee=function(){return{priority:100,
compile:function(a,c){return de.test(c.ngValue)?function(a,c,h){h.$set("value",a.$eval(h.ngValue))}:function(a,c,h){a.$watch(h.ngValue,function(a){h.$set("value",a)})}}}},fe=sa(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),ge=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],he=["$sce","$parse",
function(a,c){return function(d,e,h){e.addClass("ng-binding").data("$binding",h.ngBindHtml);var g=c(h.ngBindHtml);d.$watch(function(){return(g(d)||"").toString()},function(c){e.html(a.getTrustedHtml(g(d))||"")})}}],ie=Mb("",!0),je=Mb("Odd",0),ke=Mb("Even",1),le=sa({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),me=[function(){return{scope:!0,controller:"@",priority:500}}],Mc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=ma("ng-"+a);Mc[c]=["$parse",function(d){return{compile:function(e,h){var g=d(h[c]);return function(c,d,e){d.on(v(a),function(a){c.$apply(function(){g(c,{$event:a})})})}}}}]});var ne=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,h,g){var f,m;c.$watch(e.ngIf,function(h){Ma(h)?m||(m=c.$new(),g(m,function(c){f={startNode:c[0],endNode:c[c.length++]=P.createComment(" end ngIf: "+e.ngIf+" ")};a.enter(c,d.parent(),
d)})):(m&&(m.$destroy(),m=null),f&&(a.leave(ub(f)),f=null))})}}}],oe=["$http","$templateCache","$anchorScroll","$compile","$animate","$sce",function(a,c,d,e,h,g){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",compile:function(f,m){var k=m.ngInclude||m.src,l=m.onload||"",n=m.autoscroll;return function(f,m,q,s,y){var w=0,D,E,t=function(){D&&(D.$destroy(),D=null);E&&(h.leave(E),E=null)};f.$watch(g.parseAsResourceUrl(k),function(g){var k=function(){!F(n)||n&&!f.$eval(n)||d()},q=++w;
g?(a.get(g,{cache:c}).success(function(a){if(q===w){var c=f.$new(),d=y(c,x);t();D=c;E=d;E.html(a);h.enter(E,null,m,k);e(E.contents())(D);D.$emit("$includeContentLoaded");f.$eval(l)}}).error(function(){q===w&&t()}),f.$emit("$includeContentRequested")):t()})}}}}],pe=sa({compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),qe=sa({terminal:!0,priority:1E3}),re=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,h,g){var f=g.count,m=g.$attr.when&&h.attr(g.$attr.when),
k=g.offset||0,l=e.$eval(m)||{},n={},r=c.startSymbol(),p=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(g,function(a,c){s.test(c)&&(l[v(c.replace("when","").replace("Minus","-"))]=h.attr(g.$attr[c]))});q(l,function(a,e){n[e]=c(a.replace(d,r+f+"-"+k+p))});e.$watch(function(){var c=parseFloat(e.$eval(f));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-k));return n[c](e,h,!0)},function(a){h.text(a)})}}}],se=["$parse","$animate",function(a,c){var d=C("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,
$$tlb:!0,link:function(e,h,g,f,m){var k=g.ngRepeat,l=k.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),n,r,p,s,x,F,w={$id:Da};if(!l)throw d("iexp",k);g=l[1];f=l[2];(l=l[4])?(n=a(l),r=function(a,c,d){F&&(w[F]=a);w[x]=c;w.$index=d;return n(e,w)}):(p=function(a,c){return Da(c)},s=function(a){return a});l=g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",g);x=l[3]||l[1];F=l[2];var D={};e.$watchCollection(f,function(a){var f,g,l=h[0],n,S={},w,Q,z,V,B,u,v=[];if(ob(a))B=
a,n=r||p;else{n=r||s;B=[];for(z in a)a.hasOwnProperty(z)&&"$"!=z.charAt(0)&&B.push(z);B.sort()}w=B.length;g=v.length=B.length;for(f=0;f<g;f++)if(z=a===B?f:B[f],V=a[z],V=n(z,V,f),va(V,"`track by` id"),D.hasOwnProperty(V))u=D[V],delete D[V],S[V]=u,v[f]=u;else{if(S.hasOwnProperty(V))throw q(v,function(a){a&&a.startNode&&(D[a.id]=a)}),d("dupes",k,V);v[f]={id:V};S[V]=!1}for(z in D)D.hasOwnProperty(z)&&(u=D[z],f=ub(u),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),u.scope.$destroy());f=0;for(g=B.length;f<
g;f++){z=a===B?f:B[f];V=a[z];u=v[f];v[f-1]&&(l=v[f-1].endNode);if(u.startNode){Q=u.scope;n=l;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);u.startNode!=n&&c.move(ub(u),null,y(l));l=u.endNode}else Q=e.$new();Q[x]=V;F&&(Q[F]=z);Q.$index=f;Q.$first=0===f;Q.$last=f===w-1;Q.$middle=!(Q.$first||Q.$last);Q.$odd=!(Q.$even=0===(f&1));u.startNode||m(Q,function(a){a[a.length++]=P.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(l));l=a;u.scope=Q;u.startNode=l&&l.endNode?l.endNode:a[0];u.endNode=a[a.length-
1];S[u.id]=u})}D=S})}}}],te=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Ma(c)?"removeClass":"addClass"](d,"ng-hide")})}}],ue=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Ma(c)?"addClass":"removeClass"](d,"ng-hide")})}}],ve=sa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),we=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,h){var g,f,m=[];c.$watch(e.ngSwitch||e.on,function(d){for(var l=0,n=m.length;l<n;l++)m[l].$destroy(),a.leave(f[l]);f=[];m=[];if(g=h.cases["!"+d]||h.cases["?"])c.$eval(e.change),q(g,function(d){var e=c.$new();m.push(e);d.transclude(e,function(c){var e=d.element;f.push(c);a.enter(c,e.parent(),e)})})})}}}],xe=sa({transclude:"element",priority:800,require:"^ngSwitch",compile:function(a,c){return function(a,e,h,g,f){g.cases["!"+c.ngSwitchWhen]=g.cases["!"+c.ngSwitchWhen]||[];g.cases["!"+
c.ngSwitchWhen].push({transclude:f,element:e})}}}),ye=sa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,h){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:h,element:c})}}),ze=sa({controller:["$element","$transclude",function(a,c){if(!c)throw C("ngTransclude")("orphan",ha(a));this.$transclude=c}],link:function(a,c,d,e){e.$transclude(function(a){c.html("");c.append(a)})}}),Ae=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==
d.type&&a.put(d.id,c[0].text)}}}],Be=C("ngOptions"),Ce=da({terminal:!0}),De=["$compile","$parse",function(a,c){var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,e={$setViewValue:x};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var m=this,k={},l=e,n;m.databound=d.ngModel;m.init=function(a,c,d){l=a;n=d};m.addOption=
function(c){va(c,'"option value"');k[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};m.removeOption=function(a){this.hasOption(a)&&(delete k[a],l.$viewValue==a&&this.renderUnknownOption(a))};m.renderUnknownOption=function(c){c="? "+Da(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};m.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){m.renderUnknownOption=x})}],link:function(e,g,f,m){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?
(t.parent()&&t.remove(),c.val(a),""===a&&w.prop("selected",!0)):z(a)&&w?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){t.parent()&&t.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new Ra(d.$viewValue);q(c.find("option"),function(c){c.selected=F(a.get(c.value))})};a.$watch(function(){Ba(e,d.$viewValue)||(e=ga(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];q(c.find("option"),function(c){c.selected&&
a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,h){function g(){var a={"":[]},c=[""],d,k,s,u,w;u=h.$modelValue;w=r(e)||[];var z=n?Ob(w):w,B,v,I;v={};s=!1;var C,H;if(A)if(t&&K(u))for(s=new Ra([]),I=0;I<u.length;I++)v[m]=u[I],s.put(t(e,v),u[I]);else s=new Ra(u);for(I=0;B=z.length,I<B;I++){k=I;if(n){k=z[I];if("$"===k.charAt(0))continue;v[n]=k}v[m]=w[k];d=p(e,v)||"";(k=a[d])||(k=a[d]=[],c.push(d));A?d=F(s.remove(t?t(e,v):q(e,v))):(t?(d={},d[m]=u,d=t(e,d)===t(e,v)):d=u===q(e,v),s=s||d);C=l(e,v);
C=F(C)?C:"";k.push({id:t?t(e,v):n?z[I]:I,label:C,selected:d})}A||(x||null===u?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));v=0;for(z=c.length;v<z;v++){d=c[v];k=a[d];y.length<=v?(u={element:E.clone().attr("label",d),label:k.label},w=[u],y.push(w),f.append(u.element)):(w=y[v],u=w[0],u.label!=d&&u.element.attr("label",u.label=d));C=null;I=0;for(B=k.length;I<B;I++)s=k[I],(d=w[I+1])?(C=d.element,d.label!==s.label&&C.text(d.label=s.label),d.id!==s.id&&C.val(d.id=
s.id),C[0].selected!==s.selected&&C.prop("selected",d.selected=s.selected)):(""===s.id&&x?H=x:(H=D.clone()).val(s.id).attr("selected",s.selected).text(s.label),w.push({element:H,label:s.label,id:s.id,selected:s.selected}),C?C.after(H):u.element.append(H),C=H);for(I++;w.length>I;)w.pop().element.remove()}for(;y.length>v;)y.pop()[0].element.remove()}var k;if(!(k=u.match(d)))throw Be("iexp",u,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=c(k[2]?k[1]:m),r=c(k[7]),t=k[8]?c(k[8]):null,
y=[[{element:f,label:""}]];x&&(a(x)(e),x.removeClass("ng-scope"),x.remove());f.html("");f.on("change",function(){e.$apply(function(){var a,c=r(e)||[],d={},g,k,l,p,u,w,v;if(A)for(k=[],p=0,w=y.length;p<w;p++)for(a=y[p],l=1,u=a.length;l<u;l++){if((g=a[l].element)[0].selected){g=g.val();n&&(d[n]=g);if(t)for(v=0;v<c.length&&(d[m]=c[v],t(e,d)!=g);v++);else d[m]=c[g];k.push(q(e,d))}}else if(g=f.val(),"?"==g)k=s;else if(""===g)k=null;else if(t)for(v=0;v<c.length;v++){if(d[m]=c[v],t(e,d)==g){k=q(e,d);break}}else d[m]=
c[g],n&&(d[n]=g),k=q(e,d);h.$setViewValue(k)})});h.$render=g;e.$watch(g)}if(m[1]){var r=m[0],p=m[1],A=f.multiple,u=f.ngOptions,x=!1,w,D=y(P.createElement("option")),E=y(P.createElement("optgroup")),t=D.clone();m=0;for(var B=g.children(),v=B.length;m<v;m++)if(""===B[m].value){w=x=B.eq(m);break}r.init(p,x,t);if(A&&(f.required||f.ngRequired)){var C=function(a){p.$setValidity("required",!f.required||a&&a.length);return a};p.$parsers.push(C);p.$formatters.unshift(C);f.$observe("required",function(){C(p.$viewValue)})}u?
n(e,g,p):A?l(e,g,p):k(e,g,p,r)}}}}],Ee=["$interpolate",function(a){var c={addOption:x,removeOption:x};return{restrict:"E",priority:100,compile:function(d,e){if(z(e.value)){var h=a(d.text(),!0);h||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),l=k.data("$selectController")||k.parent().data("$selectController");l&&l.databound?d.prop("selected",!1):l=c;h?a.$watch(h,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],
Fe=da({restrict:"E",terminal:!0});(Ca=Z.jQuery)?(y=Ca,u(Ca.fn,{scope:Ea.scope,isolateScope:Ea.isolateScope,controller:Ea.controller,injector:Ea.injector,inheritedData:Ea.inheritedData}),vb("remove",!0,!0,!1),vb("empty",!1,!1,!1),vb("html",!1,!1,!0)):y=M;ab.element=y;(function(a){u(a,{bootstrap:Xb,copy:ga,extend:u,equals:Ba,element:y,forEach:q,injector:Yb,noop:x,bind:qb,toJson:oa,fromJson:Tb,identity:Aa,isUndefined:z,isDefined:F,isString:B,isFunction:L,isObject:X,isNumber:pb,isElement:Oc,isArray:K,
version:Pd,isDate:Ja,lowercase:v,uppercase:Ga,callbacks:{counter:0},$$minErr:C,$$csp:Sb});Ta=Uc(Z);try{Ta("ngLocale")}catch(c){Ta("ngLocale",[]).provider("$locale",sd)}Ta("ng",["ngLocale"],["$provide",function(a){a.provider("$compile",gc).directive({a:Ud,input:Kc,textarea:Kc,form:Vd,script:Ae,select:De,style:Fe,option:Ee,ngBind:fe,ngBindHtml:he,ngBindTemplate:ge,ngClass:ie,ngClassEven:ke,ngClassOdd:je,ngCloak:le,ngController:me,ngForm:Wd,ngHide:ue,ngIf:ne,ngInclude:oe,ngInit:pe,ngNonBindable:qe,ngPluralize:re,
ngRepeat:se,ngShow:te,ngStyle:ve,ngSwitch:we,ngSwitchWhen:xe,ngSwitchDefault:ye,ngOptions:Ce,ngTransclude:ze,ngModel:ae,ngList:ce,ngChange:be,required:Lc,ngRequired:Lc,ngValue:ee}).directive(Nb).directive(Mc);a.provider({$anchorScroll:cd,$animate:Rd,$browser:ed,$cacheFactory:fd,$controller:jd,$document:kd,$exceptionHandler:ld,$filter:zc,$interpolate:qd,$interval:rd,$http:md,$httpBackend:nd,$location:ud,$log:vd,$parse:wd,$rootScope:zd,$q:xd,$sce:Cd,$sceDelegate:Bd,$sniffer:Dd,$templateCache:gd,$timeout:Ed,
$window:Fd})}])})(ab);y(P).ready(function(){Sc(P,Xb)})})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>');
//# sourceMappingURL=angular.min.js.map

},{}],3:[function(require,module,exports){
angular.module("budgetApp", [])
  .directive("hdoToggle", function () {
    return {
      scope: {
        entity: "=",
        key: "@"
      },
      link: function (scope, element) {
        element.addClass("toggler");
        element.on("click", function () {
          scope.entity[scope.key + "Loaded"] = scope.entity[scope.key];
          element.parent().children().toggleClass("toggled");
          scope.$apply();
        });
      }
    }
  })
  .factory("budget", [function () {
    return require("./budgetFactory");
  }])
  .service("d3", function () {
    return d3;
  })
  .service("budgetLoader", ['$rootScope', '$q', 'budget', 'd3', function ($rootScope, $q, budget, d3) {
    var cachedStructure = {};
    var cachedBudgets = {};
    function structure(url) {
      var deferred = $q.defer();
      if (cachedStructure[url]) {
        deferred.resolve(cachedStructure[url]);
      } else {
        d3.csv(url, function (d){
          var keys = Object.keys(d);
            return {
              frameNo: d[keys[0]],
              frameName: d[keys[1]],
              chapterNo: d[keys[2]],
              chapterName: d[keys[3]]
            };
          }, function (error, rows) {
            cachedStructure[url] = rows;
            deferred.resolve(rows);
            $rootScope.$digest();
          });
      }
      return deferred.promise;
    }
    function posts(url) {
      var deferred = $q.defer();
      d3.csv(url, function parseKeys(d) {
        var keys = Object.keys(d);
        return {
          chapterNo: d[keys[0]],
          postNo: d[keys[1]],
          text: d[keys[2]],
          amount: parseInt(+d[keys[3]].replace(/\s/g, ""))
        };
      }, function (error, rows) {
        deferred.resolve(rows);
      });
      return deferred.promise;
    }
    function parsePosts(budget, deferred) {
      return function (rows) {
        rows.forEach(function (r) {
          budget.addPost(r.chapterNo, r.postNo, r.text, r.amount);
        });
        deferred.resolve(budget);
      };
    }
    function parseAlternatives(budget, deferred) {
      return function (rows) {
        rows.forEach(function (r) {
          budget.addAlternativePost(r.chapterNo, r.postNo, r.text, r.amount);
        });
        deferred.resolve(budget);
      }
    }
    function parseStructure(budget, deferred) {
      return function (rows) {
        rows.forEach(function (r) {
          budget.addFrame(r.frameNo, r.frameName);
          budget.addChapter(r.frameNo, r.chapterNo, r.chapterName);
        });
        deferred.resolve();
      }
    }
    function $new(meta) {
      var deferred = $q.defer();
      if (cachedBudgets[meta.name]) {
        deferred.resolve(cachedBudgets[meta.name]);
      } else {
        var b = budget.$new($q, meta);
        var promises = meta.posts.map(function (url) {
          var d = $q.defer();
          posts(url).then(parsePosts(b, d));
          return d.promise;
        });
        var structureDeferred = $q.defer();
        structure(meta.structure).then(parseStructure(b, structureDeferred));
        promises.push(structureDeferred);
        $q.all(promises).then(function () {
          deferred.resolve(b);
          cachedBudgets[meta.name] = b;
        });
      }
      return deferred.promise;
    }
    function alternative(budget, meta) {
      budget.resetAlternative();
      var deferred = $q.defer();
      var promises = meta.posts.map(function (url) {
        var d = $q.defer();
        posts(url).then(parseAlternatives(budget, d));
        return d.promise;
      });
      $q.all(promises).then(function () {
        budget.setAlternative(meta);
        deferred.resolve(budget);
      });
      return deferred.promise;
    }
    return {
      $new: $new,
      alternative: alternative,
      posts: posts,
      structure: structure
    };
  }])
  .controller("BudgetController", ["$scope", "budgetLoader", "d3", function ($scope, budgetLoader, d3) {
    function prepareAlternatives(budgets, selected) {
      return budgets.filter(function (b) {
        return b !== selected;
      });
    }
    d3.json("/data/budgets.json", function (budgets) {
      $scope.budgets = budgets;
      $scope.selectedBudget = budgets[0];
      $scope.alternatives = prepareAlternatives(budgets, $scope.selectedBudget);
      budgetLoader.$new(budgets[0]).then(function (budget) {
        $scope.budget = budget;
      });
    });
    $scope.d = function (entity, alternative) {
      if (!entity) return 0;
      if (!alternative) return entity.revenue - entity.cost;
      return entity.revenue - alternative.revenue - entity.cost + alternative.cost;
    };
    $scope.m = function (value) {
      if (value == 0) return "";
      return numeral(value).format("0,0");
    };
    $scope.selectAlternative = function (alternative) {
      $scope.selectedAlternative = alternative;
      budgetLoader.alternative($scope.budget, alternative).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
    $scope.selectBudget = function (budget) {
      $scope.selectedBudget = budget;
      $scope.alternatives = prepareAlternatives($scope.budgets, budget);
      $scope.budget = null;
      $scope.alternative = null;
      $scope.selectedAlternative = null;
      budgetLoader.$new(budget).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
  }]);
},{"./budgetFactory":4}],4:[function(require,module,exports){
var angular = require("angular");

function update (cost, revenue) {
  this.cost += cost;
  this.revenue += revenue;
}
function Budget(meta) {
  angular.extend(this, meta);
  this.cost = 0;
  this.revenue = 0;
  this.alternative = {
    cost: 0,
    revenue: 0
  };
  this.resetAlternative = function () {
    this.alternative.cost = 0;
    this.alternative.revenue = 0;
    this.frames.forEach(function (f) {
      f.resetAlternative();
      f.chapters.forEach(function (c) {
        c.resetAlternative();
      });
    });
  };
  this.setAlternative = function (meta) {
    this.alternative.name = meta.name;
    this.alternative.cost = this.alternative.cost || 0;
    this.alternative.revenue = this.alternative.revenue || 0;
  };
  this.addAlternative = function (alternative) {
    this.alternative.cost += alternative.cost;
    this.alternative.revenue += alternative.revenue;
  };
  this.update = function (cost, revenue) {
    update.call(this, cost, revenue);
  };
}
function FrameFactory ($q, budget) {
  function Frame(frameNo, frameName) {
    this.no = frameNo;
    this.name = frameName;
    this.chapters = [];
    this.cost = 0;
    this.revenue = 0;
    this.alternative = {
      cost: 0,
      revenue: 0
    };
    this.addAlternative = function (alternative) {
      budget.addAlternative(alternative);
      this.alternative.cost += alternative.cost;
      this.alternative.revenue += alternative.revenue;
    };
    this.addChapter = function (chapter) {
      this.chapters.push(chapter);
    };
    this.resetAlternative = function () {
      this.alternative = {
        cost: 0,
        revenue: 0
      };
    };
    this.update = function (cost, revenue) {
      budget.update(cost, revenue);
      update.call(this, cost, revenue);
    };
  }
  var frameIsResolved = {};
  var frameMap = {};
  var frames = [];
  return {
    add: function (frameNo, frameName) {
      if (frameIsResolved[frameNo]) return;
      frameMap[frameNo] = frameMap[frameNo] || $q.defer();
      var frame = new Frame(frameNo, frameName);
      frameMap[frameNo].resolve(frame);
      frames.push(frame);
      frameIsResolved[frameNo] = true;
    },
    frameMap: frameMap,
    frames: frames,
    get: function (frameNo) {
      frameMap[frameNo] = frameMap[frameNo] || $q.defer();
      return frameMap[frameNo].promise;
    }
  }
}
function ChapterFactory($q, frames) {
  function Chapter(frame, chapterNo, chapterName) {
    this.frame = frame;
    this.no = chapterNo;
    this.name = chapterName;
    this.cost = 0;
    this.revenue = 0;
    this.posts = [];
    this.alternative = {
      cost: 0,
      revenue: 0
    };
    this.addPost = function (post) {
      this.posts.push(post);
      this.cost += post.cost;
      this.revenue += post.revenue;
      this.frame.update(post.cost, post.revenue);
    };
    this.addAlternative = function (alternative) {
      this.frame.addAlternative(alternative);
      this.alternative.cost += alternative.cost;
      this.alternative.revenue += alternative.revenue;
    };
    this.resetAlternative = function () {
      this.alternative = {
        cost: 0,
        revenue: 0
      };
    }
  }
  var chapterIsResolved = {};
  var chapterMap = {};
  var chapters =  [];
  return {
    add: function (frameNo, chapterNo, chapterName) {
      if (chapterIsResolved[chapterNo]) return;
      chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
      frames
        .get(frameNo)
        .then(function (frame) {
          var chapter = new Chapter(frame, chapterNo, chapterName);
          chapterMap[chapterNo].resolve(chapter);
          chapters.push(chapter);
          frame.addChapter(chapter);
        });
      chapterIsResolved[chapterNo] = true;
    },
    chapterMap: chapterMap,
    chapters: chapters,
    get: function (chapterNo) {
      chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
      return chapterMap[chapterNo].promise;
    }
  }
}
function PostFactory(chapters) {
  function Post(chapter, postNo, text, amount) {
    this.chapter = chapter;
    this.no = postNo;
    this.text = text;
    this.cost = chapter.no <= 2800 ? amount : 0;
    this.revenue = chapter.no > 3000 ? amount : 0;
    this.alternative = null;
    this.setAlternative = function (alternative) {
      this.alternative = alternative;
      this.chapter.addAlternative(alternative);
    };
  }
  function AlternativePost(chapterNo, amount) {
    this.cost = chapterNo <= 2800 ? amount : 0;
    this.revenue = chapterNo > 3000 ? amount : 0;
  }
  var postMap = {};
  var posts = [];
  function add (chapterNo, postNo, text, amount, alternative) {
    chapters
      .get(chapterNo)
      .then(function (chapter) {
        var post = new Post(chapter, postNo, text, amount);
        posts.push(post);
        chapter.addPost(post);
        postMap[chapterNo + '-' + postNo] = post;
        if (alternative) {
          post.setAlternative(alternative);
        }
      });
  }
  return {
    add: add,
    addAlternative: function (chapterNo, postNo, text, amount) {
      var alternative = new AlternativePost(chapterNo, amount);
      var post = postMap[chapterNo + '-' + postNo];
      if (post) {
        post.setAlternative(alternative);
        return;
      }
      add(chapterNo, postNo, text, 0, alternative);
    },
    posts: posts
  }
}
module.exports = {
  $new: function ($q, meta) {
    var budget = new Budget(meta);
    var frames = new FrameFactory($q, budget);
    var chapters = new ChapterFactory($q, frames);
    var posts = new PostFactory(chapters);
    return {
      addFrame: frames.add,
      addChapter: chapters.add,
      addPost: posts.add,
      addAlternativePost: posts.addAlternative,
      alternative: budget.alternative,
      chapters: chapters.chapters,
      chapterMap: chapters.chapterMap,
      frames: frames.frames,
      meta: budget,
      posts: posts.posts,
      resetAlternative: budget.resetAlternative,
      setAlternative: budget.setAlternative
    }
  }
};
},{"angular":1}]},{},[3,4])