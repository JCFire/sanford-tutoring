define("backgroundCommon/mixins/backgroundDetectionMixin",["lodash","react","utils","imageClientApi","color","santaProps"],function(a,b,c,d,e,f){"use strict";function g(b){return a.get(b.compDesign,"background",a.get(b.compData,"background",{}))}function h(a,b,e){var f=a&&a.uri;if(f){var g={id:f,width:a.width,height:a.height};var h={width:1,height:1};var j=d.getData(d.fittingTypes.SCALE_TO_FILL,g,h).uri;var k=this.props.getMediaFullStaticUrl(j);c.imageUtils.getImageMeanBrightness(k,{width:1,height:1},b,e)}else{var l=i.call(this);b(l.values.hsv[2],l.values.alpha)}}function i(){var a=g(this.props);return new e(c.colorParser.getColor(this.props.colorsMap,a.color,a.colorOpacity))}function j(a,b){var c=this.props.dynamicColorElementsAspect;c.updateInformation(this.props.id,{brightness:a,alpha:b})}function k(a,b){var c=a&&a.uri;var d=c!==this.lastBackgroundImageUrl;var e=b&&b.hexString();var f=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString();var g=!c&&e!==f;var i=b&&b.values.alpha!==this.lastAlpha;if(d||g||i){h.call(this,a,j.bind(this))}this.lastBackgroundImageUrl=c;this.lastBackgroundBgColor=b;this.lastAlpha=b.values.alpha}return{propTypes:{id:b.PropTypes.string,compDesign:b.PropTypes.object,compData:b.PropTypes.object,colorsMap:f.Types.Theme.colorsMap.isRequired,isMobileView:f.Types.isMobileView.isRequired,dynamicColorElementsAspect:f.Types.SiteAspects.dynamicColorElements.isRequired,getMediaFullStaticUrl:f.Types.ServiceTopology.getMediaFullStaticUrl.isRequired},componentDidMount:function(){if(!this.props.isMobileView){var a=i.call(this);var b=this.getMediaImageData();k.call(this,b,a)}},componentDidUpdate:function(){if(!this.props.isMobileView){var a=i.call(this);var b=a&&a.hexString();var c=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString();var d=this.getMediaImageData();var e=d&&d.uri;var f=b!==c;var g=e!==this.lastBackgroundImageUrl;var h=a&&a.values.alpha!==this.lastAlpha;if(f||g||h){k.call(this,d,a)}}},getMediaImageData:function(){var a=g(this.props);var b=a.mediaRef;if(b){switch(b.type){case"Image":return b;case"WixVideo":return b.posterImageRef}}return null}}});define("backgroundCommon/components/bgImage",["lodash","react","core","utils"],function(a,b,c,d){"use strict";var e=c.compMixins;return{displayName:"bgImage",mixins:[e.skinBasedComp],propTypes:{compData:b.PropTypes.object.isRequired,"data-type":b.PropTypes.string.isRequired},statics:{useSantaTypes:true},getSkinProperties:function(){var b={width:"100%"};var c={position:"absolute",width:"100%"};if(a.isNumber(this.props.compData.opacity)){c.opacity=this.props.compData.opacity}var e={"":{style:b}};e[d.balataConsts.IMAGE]={style:c,"data-type":this.props["data-type"]};return e}}});define("backgroundCommon/components/bgVideo",["lodash","react","core","utils","image","santaProps"],function(a,b,c,d,e,f){"use strict";var g=d.mediaConsts;return{displayName:"bgVideo",mixins:[c.compMixins.skinBasedComp],propTypes:a.defaults({compData:b.PropTypes.object.isRequired,mediaQuality:b.PropTypes.string.isRequired,notifyMediaState:b.PropTypes.func.isRequired,setMediaAPI:b.PropTypes.func.isRequired},f.santaTypesUtils.getSantaTypesByDefinition(e)),statics:{useSantaTypes:true},getInitialState:function(){return{posterDisplay:""}},componentDidMount:function(){this.props.setMediaAPI(this.mediaAPI);this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce);this.props.notifyMediaState({type:g.eventTypes.MOUNT,playbackState:g.playbackTypes.LOADING});this.setRate(this.props.compData.playbackSpeed||1)},componentDidUpdate:function(){this.setRate(this.props.compData.playbackSpeed||1)},componentWillUnmount:function(){this.props.setMediaAPI(null);this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce);this.removeVideoSecurely()},handlePosterVisibilityOnce:function(){if(this.refs.video.currentTime>0){this.setState({posterDisplay:"none"});this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce)}},resetPosterState:function(){if(this.state.posterDisplay){this.setState({posterDisplay:""});this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce)}},removeVideoSecurely:function(){this.refs.video.pause();a.forEach(this.refs.video.children,function(a){if(a.nodeName.toLowerCase()==="source"){a.setAttribute("src","")}});this.refs.video.load()},mediaAPI:function(a,b){var c=this[a];if(c){c.apply(this,b)}},play:function(a){if(a){this.seek(a)}this.refs.video.play()},pause:function(b){this.refs.video.pause();if(a.isNumber(b)){this.seek(b)}},stop:function(){this.pause(0);this.resetPosterState()},setVolume:function(a){this.refs.video.volume=Math.max(0,Math.min(1,a))},mute:function(){this.refs.video.muted=true},unMute:function(){this.refs.video.muted=false},seek:function(a){this.refs.video.currentTime=Math.max(0,Math.min(a,this.refs.video.duration||this.props.compData.duration))},setRate:function(a){this.refs.video.playbackRate=Math.max(0,a)},onLoadStart:function(){this.props.notifyMediaState({type:g.eventTypes.LOAD,playbackState:g.playbackTypes.READY,volume:this.refs.video.volume,muted:this.refs.video.muted,currentTime:this.refs.video.currentTime,progress:0})},onTimeUpdate:function(){this.props.notifyMediaState({type:g.eventTypes.TIME_UPDATE,currentTime:this.refs.video.currentTime})},onPlayEnded:function(){this.props.notifyMediaState({type:g.eventTypes.PLAYSTATE,playbackState:g.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:g.eventTypes.PLAYSTATE,playbackState:g.playbackTypes.PLAYING})},onPause:function(){this.props.notifyMediaState({type:g.eventTypes.PLAYSTATE,playbackState:g.playbackTypes.PAUSED})},onError:function(a){if(a.currentTarget.networkState===a.currentTarget.NETWORK_NO_SOURCE){this.props.notifyMediaState({type:g.eventTypes.ERROR,error:g.errorTypes.NO_VIDEO_FOUND})}else{this.props.notifyMediaState({type:g.eventTypes.ERROR,error:g.errorTypes.VIDEO_GENERAL_ERROR})}},onStalled:function(a){if(a.currentTarget.readyState===a.currentTarget.HAVE_NOTHING){this.props.notifyMediaState({type:g.eventTypes.ERROR,error:g.errorTypes.NO_VIDEO_FOUND})}},onProgress:function(){var a=this.refs.video.buffered;this.props.notifyMediaState({type:g.eventTypes.PROGRESS,progress:a&&a.length?a.end(a.length-1):0})},onSeekStart:function(){this.props.notifyMediaState({type:g.eventTypes.PLAYSTATE,playbackState:g.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:g.eventTypes.PLAYSTATE,playbackState:g.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(){this.props.notifyMediaState({type:g.eventTypes.VOLUME,volume:this.refs.video.volume,muted:this.refs.video.muted})},onRateChange:function(){this.props.notifyMediaState({type:g.eventTypes.RATE,playbackRate:this.refs.video.playbackRate})},getSkinProperties:function(){var a={width:"100%"};var b=this.createChildComponent(this.props.compData.posterImageRef,"core.components.Image",g.balataConsts.POSTER,{ref:g.balataConsts.POSTER,id:this.props.id+g.balataConsts.POSTER,imageData:this.props.compData.posterImageRef,displayMode:this.props.compData.fittingType,alignType:this.props.compData.alignType,containerWidth:0,containerHeight:0,style:{display:this.state.posterDisplay}});var c={"":{"data-quality":this.props.mediaQuality,style:a},video:{preload:this.props.compData.preload||"none",onEnded:this.onPlayEnded,onError:this.onError,onLoadStart:this.onLoadStart,onPause:this.onPause,onPlay:this.onPlay,onProgress:this.onProgress,onRateChange:this.onRateChange,onSeeked:this.onSeekEnd,onSeeking:this.onSeekStart,onStalled:this.onStalled,onTimeUpdate:this.onTimeUpdate,onVolumeChange:this.onVolumeChange},poster:b};if(this.props.compData.loop){c.video.loop="loop"}if(this.props.compData.mute){c.video.muted="muted"}return c}}});define("backgroundCommon/components/bgMedia",["lodash","react","core","santaProps","imageClientApi","image","backgroundCommon/components/bgImage","backgroundCommon/components/bgVideo","utils"],function(a,b,c,d,e,f,g,h,i){"use strict";var j=c.compMixins;var k=i.containerBackgroundUtils;var l=i.mediaConsts;var m=e.fittingTypes;var n=[m.TILE];var o={comp:"wysiwyg.viewer.components.background.bgImage",skin:"skins.viewer.bgImage.bgImageSkin",style:"bgImage","data-type":l.balataConsts.BG_IMAGE};var p={comp:"core.components.Image",skin:"skins.core.ImageNewSkinZoomable",style:"bgImage","data-type":l.balataConsts.IMAGE};var q={comp:"wysiwyg.viewer.components.background.bgVideo",skin:"skins.viewer.bgVideo.bgVideoSkin",style:"bgVideo"};function r(b){return a.includes(n,b)?o:p}function s(a,b){var c={};if(b===o.comp){c={ref:l.balataConsts.CONTENT,"data-type":o["data-type"]}}else if(b===p.comp){c={ref:l.balataConsts.CONTENT,key:"img_"+a.bgEffectName,containerWidth:0,containerHeight:0,imageData:a.compData,displayMode:a.fittingType,alignType:a.alignType,"data-type":p["data-type"]}}else if(b===q.comp){c={ref:l.balataConsts.CONTENT,key:"vid_"+a.compData.videoId,notifyMediaState:a.notifyMediaState,setMediaAPI:a.setMediaAPI,mediaQuality:a.mediaQuality}}return c}function t(a){var b=a.compData;var c;var d=r(a.fittingType);var e={image:{id:a.id+l.balataConsts.CONTENT,componentType:d.comp,skinPartData:{skin:d.skin,styleId:d.style},compData:b},poster:{id:a.id+l.balataConsts.CONTENT,componentType:d.comp,skinPartData:{skin:d.skin,styleId:d.style},compData:b.posterImageRef},video:{id:a.id+l.balataConsts.CONTENT,componentType:q.comp,skinPartData:{skin:q.skin,styleId:q.style},compData:b}};switch(b.type){case"Image":c=e.image;break;case"WixVideo":if(a.isDesktopDevice&&!a.isMobileView){c=e.video}else{c=e.poster}break}return c}return{displayName:"bgMedia",mixins:[j.skinBasedComp],propTypes:a.defaults({id:b.PropTypes.string.isRequired,compData:b.PropTypes.object.isRequired,alignType:b.PropTypes.string,fittingType:b.PropTypes.string,mediaTransforms:b.PropTypes.object,bgEffectName:b.PropTypes.string,style:b.PropTypes.object.isRequired,renderFixedPositionBackgrounds:d.Types.RenderFlags.renderFixedPositionBackgrounds,componentViewMode:d.Types.RenderFlags.componentViewMode.isRequired,isDesktopDevice:d.Types.Device.isDesktopDevice.isRequired,isMobileView:d.Types.isMobileView.isRequired,mediaQuality:b.PropTypes.string,notifyMediaState:b.PropTypes.func,setMediaAPI:b.PropTypes.func},d.santaTypesUtils.getSantaTypesByDefinition(f),d.santaTypesUtils.getSantaTypesByDefinition(g),d.santaTypesUtils.getSantaTypesByDefinition(h)),statics:{useSantaTypes:true},getDefaultSkinName:function(){return"skins.viewer.balata.bgMediaSkin"},getMediaComponent:function(){var b=t(this.props);var c=s(this.props,b.componentType);var d=a.assign({id:b.id},c);return this.createChildComponent(b.compData,b.componentType,b.skinPartData,d)},getSkinProperties:function(){var b=k.getPositionByEffect(this.props.bgEffectName,this.props.renderFixedPositionBackgrounds);var c=a.assign({},this.props.style,{position:b,pointerEvents:"none",top:0});var d=a.mapKeys(this.props.mediaTransforms,function(a,b){return"data-"+b});return{"":a.assign({key:"media_"+this.props.componentViewMode,children:this.getMediaComponent(),style:c,"data-effect":this.props.bgEffectName||"none","data-fitting":this.props.fittingType,"data-align":this.props.alignType},d)}}}});define("backgroundCommon/components/bgOverlay",["react","lodash","core","utils","santaProps"],function(a,b,c,d,e){"use strict";var f=c.compMixins;function g(a,b){return"url("+d.urlUtils.joinURL(a,b.uri)+")"}function h(a){var b={};if(a.colorOverlay){b.backgroundColor=d.colorParser.getColor(a.colorsMap,a.colorOverlay,a.colorOverlayOpacity)}if(a.imageOverlay){b.backgroundImage=g(a.staticMediaUrl,a.imageOverlay)}return b}function i(a){var c={width:"100%",height:"100%",position:"absolute"};var d=h(a);return b.assign(c,d)}function j(a,b,c){return b&&d.containerBackgroundUtils.isFullScreenByEffect(a,c)}function k(){var a=b.assign({position:"absolute"},this.props.style,{width:"100%",height:"100%"});if(j(this.props.bgEffectName,this.props.fixedBackgroundColorBalata,this.props.renderFixedPositionBackgrounds)){b.assign(a,{top:0,position:"fixed"})}return a}return{displayName:"bgOverlay",mixins:[f.skinBasedComp],propTypes:{style:a.PropTypes.object,colorOverlay:a.PropTypes.string,colorOverlayOpacity:a.PropTypes.number,imageOverlay:a.PropTypes.object,bgEffectName:a.PropTypes.string,colorsMap:e.Types.Theme.colorsMap.isRequired,staticMediaUrl:e.Types.ServiceTopology.staticMediaUrl,fixedBackgroundColorBalata:e.Types.BrowserFlags.fixedBackgroundColorBalata.isRequired,renderFixedPositionBackgrounds:e.Types.RenderFlags.renderFixedPositionBackgrounds},statics:{useSantaTypes:true},getSkinProperties:function(){var a=k.call(this);var b=i(this.props);var c={"":{style:a}};c[d.balataConsts.OVERLAY]={style:b};return c}}});define("backgroundCommon",["backgroundCommon/mixins/backgroundDetectionMixin","backgroundCommon/components/bgImage","backgroundCommon/components/bgMedia","backgroundCommon/components/bgOverlay","backgroundCommon/components/bgVideo"],function(a,b,c,d,e){"use strict";return{mixins:{backgroundDetectionMixin:a},components:{bgImage:b,bgMedia:c,bgOverlay:d,bgVideo:e}}});