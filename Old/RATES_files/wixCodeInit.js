define("wixCodeInit/utils/urlBuilder",[],function(){"use strict";function a(){var a=arguments[0];for(var b=1;b<arguments.length;++b){a=a.replace(/\/$/,"")+"/"+arguments[b].replace(/^\//,"")}return a}function b(a){return/^https?:\/\/localhost\/?$/.test(a)}function c(a){return/^https?:\/\/s3.amazonaws.com\/integration-tests-statics\/SNAPSHOT\/santa?$/.test(a)}function d(a){return/^\d+\.\d+\.\d+$/.test(a)}function e(a,b){var c=a.lastIndexOf("/");return d(b)?a.substring(0,c+1)+b:a}function f(a,d){var f=a.serviceTopology;var g=b(a.santaBase)||c(a.santaBase)?f.scriptsLocationMap.santa:a.santaBase;g=e(g,d);return/(.*\/services\/)?(.*)/.exec(g)[2]}function g(b,c,d){var e=c.extensionId;var g="//"+e+".";var h=b.serviceTopology.wixCloudBaseDomain;var i="static/wixcode/index.html";var j=f(b,d);return g+a(h,"_partials",j,i)}function h(a){return Object.keys(a).map(function(b){return encodeURIComponent(b)+"="+encodeURIComponent(a[b])}).join("&")}function i(a,b,c){c=c||{};var d=g(a,b,c.runtimeSource);var e=!!a.publicModel;var f={compId:"wixCode_"+b.appDefinitionId,deviceType:c.isMobileView?"mobile":"desktop",viewMode:e?"site":a.renderFlags.componentViewMode||"preview",instance:b.signature,locale:a.rendererModel.languageCode};if(c.sdkSource){f.sdkSource=c.sdkSource}if(c.applications){f.applications=JSON.stringify(c.applications)}if(c.ReactSource){f.ReactSource=c.ReactSource}var i=h(f);return d+"?"+i}return{buildUrl:i}});define("wixCodeInit/utils/messageHolder",[],function(){"use strict";function a(){var a=[];var b=null;return{sendOrHoldMessage:function(c){if(!b){a.push(c)}else{b(c)}},setMessageTarget:function(c){b=c;while(a.length>0){b(a.shift())}}}}return{get:a}});define("wixCodeInit/utils/iFrameUtils",[],function(){"use strict";function a(a,b){var c=window.document.createElement("iframe");c.style.display="none";c.src=a;c.className="wix-code-app";c.setAttribute("data-app-id",b.applicationId);c.setAttribute("data-app-definition-id",b.appDefinitionId);return c}function b(a,b){return b.source===a.contentWindow}return{getIFrameForApp:a,isIFrameEvent:b}});define("wixCodeInit/utils/appsUtils",["lodash"],function(a){"use strict";function b(b,c){var d;a.forEach(c,function(a){var c=b.getDynamicPageData(a);if(c){d=c}});return d}function c(c,d,e){if(!c){return}var f=b(c,e);if(!f){return}var g=f.routerData;var h=f.routerDefinition;if(!g||!h){return}var i=h.appDefinitionId==="wix-code";if(i){a.forEach(e,function(b){a.forEach(d,function(a){if(a.id===b){a.routerData=g}})})}else{var j=a.find(d,{id:h.appDefinitionId});if(j){j.routerData=g}}}function d(b){var c={displayName:"siteextension"};return a(b).reject(c).map(function(b){return a.assign({type:"Application"},b)}).value()}function e(b,c,d,e,f){if(a.find(b,c)){var g=e.isPlatformAppOnPage("masterPage","wixCode");a.forEach(d,function(a){var b=e.isPlatformAppOnPage(a,"wixCode");var c=e.getDataByQuery(a);var d=c.isPopup;if(b){f.push({id:a,type:d?"Popup":"Page",displayName:e.getPageTitle(a)})}if(!d&&g){f.push({id:a,type:"masterPage"})}})}}function f(b,f,g){b=a.without(b,"masterPage");var h={displayName:"siteextension"};var i=d(g);e(g,h,b,f,i);c(f,i,b);return i}function g(){var a=arguments[0];for(var b=1;b<arguments.length;++b){a=a.replace(/\/$/,"")+"/"+arguments[b].replace(/^\//,"")}return a}function h(a,b,c){var d=g(a.scriptsDomainUrl,"services",b);if(c){return g(d,c)}return a.scriptsLocationMap[b]}function i(b,c,d){if(a.get(b,"port")&&a.get(b,"path")&&a.get(b,"id")){d=a.endsWith(d,"/")?d.slice(0,-1):d;var e=a.template("<%= santaBase %><%= port %>/<%= path %>");var f;if(b.port==="80"){f=e({santaBase:d,port:"",path:b.path})}else{f=e({santaBase:d,port:":"+b.port,path:b.path})}c.push({type:"Application",id:b.id,url:f,displayName:b.id})}}function j(b,c,d,e){if(a.find(b,{type:"siteextension"})&&!a.find(c,{id:"dataBinding"})){c.push({type:"Application",id:"dataBinding",url:g(h(d,"dbsm-viewer-app",e.dataBinding),"/app.js"),displayName:"Data Binding"})}}function k(b){return a(b).filter(function(b){return b.type==="siteextension"||a.get(b,"platformApp.viewerUrl")}).map(function(b){var c={id:b.appDefinitionId,displayName:b.type,appInnerId:b.applicationId};var d=a.get(b,"platformApp.viewerUrl");if(d){c.url=d}return c}).value()}function l(a){var b=k(a.clientSpecMap);var c=o(a.viewerPlatformAppSources);i(c,b,a.santaBase);j(a.clientSpecMap,b,a.serviceTopology,c);return b}function m(b){var c=l(b);return a.filter(d(c),"url")}function n(b,c,d){var e=a.get(d,["currentUrl","query","viewerPlatformAppSources"]);var g=l({clientSpecMap:b,viewerPlatformAppSources:e,serviceTopology:d.serviceTopology,santaBase:d.santaBase});return f(c,d,g)}function o(b){return a(b||"").split(",").invokeMap("split",":").fromPairs().value()}return{getApplications:n,getAppsBaseInfo:m}});define("wixCodeInit/utils/widgetsPreLoader",["wixCodeInit/utils/appsUtils"],function(a){"use strict";function b(a){if(a===null||typeof a!=="object"){return a}var b={};for(var c in a){if(a.hasOwnProperty(c)){b[c]=a[c]}}return b}function c(a,b,c,d){requirejs(["utils","widgets","wixCode"],function(e,f,g){var h=d(e);var i=e.wixUrlParser.parseUrl(h,a);var j=i&&i.pageId;if(!j){return}var k=b(f,h,j);var l=g.wixCodeWidgetService.getWixCodeSpec(h.rendererModel.clientSpecMap);var m=g.messageBuilder.getExtendedMessage(k,h.rendererModel.wixCodeModel||{},l,h);c(m)})}function d(b,d,e){var f=function(c,d,e){var f=a.getApplications(b.rendererModel.clientSpecMap,[e],d);var g=b.routers||{configMap:{}};return c.messageBuilder.loadWidgetsMessage(f,g.configMap,[e])};var g=function(a){return new a.SiteData(b,function(){})};c(d,f,e,g)}function e(a,b,d){var e=function(a,b,c){var d={};d[c]=a.widgetService.getControllersToInit(b,c);return a.messageBuilder.initWidgetsMessage(d)};var f=function(){return a};c(b,e,d,f)}function f(a,c){if(c.type==="load_widgets"){var d=a.widgets.map(function(a){return a.id});if(d.length>0){c=b(c);c.widgets=c.widgets.filter(function(a){return d.indexOf(a.id)===-1});if(c.widgets.length===0){return null}}}return c}return{asyncGetPreLoadMessage:d,asyncGetPreInitMessage:e,filterPreLoadedWidgets:f}});define("wixCodeInit/utils/specMapUtils",[],function(){"use strict";var a="siteextension";function b(b){for(var c in b){if(b.hasOwnProperty(c)&&b[c].type===a){return b[c]}}}return{getAppSpec:b}});define("wixCodeInit/api/wixCodeAppApi",["wixCodeInit/utils/urlBuilder","wixCodeInit/utils/messageHolder","wixCodeInit/utils/iFrameUtils","wixCodeInit/utils/widgetsPreLoader","wixCodeInit/utils/specMapUtils"],function(a,b,c,d,e){"use strict";function f(a){return a.intent==="WIX_CODE"&&a.type==="wix_code_iframe_loaded"}function g(a){return a.intent==="WIX_CODE_SITE_API"&&a.type==="reportBI"}function h(a){if(window.document.readyState!=="loading"){window.document.body.appendChild(a)}else{window.document.addEventListener("DOMContentLoaded",function(){window.document.body.appendChild(a)})}}function i(){var i=[];var j=[];var k=b.get();var l=false;var m=true;var n=null;var o=null;function p(a,b){if(!c.isIFrameEvent(a,b)){return}if(f(b.data)){k.setMessageTarget(function(b){a.contentWindow.postMessage(b,"*")})}if(g(b.data)&&!i.length){var d=b.data.reportDef;var e=b.data.params;if(d.errorCode){window.wixBiSession.sendError(d,e.p1,e.p2,e.p3,e.p4)}else{window.wixBiSession.sendBI(d.endpoint,d.eventId,d.src,e)}}i.forEach(function(a){a(b.data)})}function q(b,d,f){if(l){console.warn("Wix code is already initiated");return}var g=e.getAppSpec(d);if(g){var i=a.buildUrl(b,g,f);var j=c.getIFrameForApp(i,g);var k=p.bind(null,j);window.addEventListener("message",k,false);h(j);l=true}}function r(a){i.push(a)}function s(a){j.push(a)}function t(a){var b=a;j.forEach(function(a){b=a(b)});return b}function u(a){if(m){a=n?d.filterPreLoadedWidgets(n,a):a}if(a){k.sendOrHoldMessage(t(a))}m=false}function v(a,b){var c=e.getAppSpec(a.rendererModel.clientSpecMap);if(m&&!n&&c){d.asyncGetPreLoadMessage(a,b,function(a){if(m&&!n){n=a;k.sendOrHoldMessage(n)}})}}function w(a,b){var c=e.getAppSpec(a.rendererModel.clientSpecMap);if(m&&!o&&c){d.asyncGetPreInitMessage(a,b,function(a){if(m&&!o){o=a;k.sendOrHoldMessage(o)}})}}return{init:q,sendMessage:u,registerMessageHandler:r,registerMessageModifier:s,preLoadWidgets:v,preInitWidgets:w}}return{getApi:i}});define("wixCodeInit/api/initMainR",["lodash","wixCodeInit/utils/specMapUtils","wixCodeInit/utils/appsUtils"],function(a,b,c){"use strict";function d(d,e,f,g){var h=a.trimEnd(e.serviceTopology.scriptsLocationMap["js-wixcode-sdk"],"/")+"/lib/wix.min.js";var i={isMobileView:f,sdkSource:g.getParameterByName("sdkSource")||h,runtimeSource:g.getParameterByName("WixCodeRuntimeSource"),ReactSource:g.getParameterByName("ReactSource")};var j=g.getParameterByName("viewerPlatformAppSources");i.applications=c.getAppsBaseInfo({clientSpecMap:e.rendererModel.clientSpecMap,serviceTopology:e.serviceTopology,viewerPlatformAppSources:j,santaBase:e.santaBase});var k=!!e.publicModel;function l(a){return k&&(b.getAppSpec(a)||i.applications.length)}function m(a){d.init(e,a,i);if(l(a)){d.preLoadWidgets(e,window.document.location.href)}}m(e.rendererModel.clientSpecMap)}return d});define("wixCodeInit",["wixCodeInit/api/wixCodeAppApi","wixCodeInit/api/initMainR","wixCodeInit/utils/specMapUtils","wixCodeInit/utils/appsUtils"],function(a,b,c,d){"use strict";return{getAppApi:a.getApi,initMainR:b,specMapUtils:c,appsUtils:d}});