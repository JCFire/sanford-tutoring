define("audioCommon/mixins/audioMixin",["lodash","utils","santaProps"],function(a,b,c){"use strict";var d=c.Types;return{propTypes:{aspectData:d.Audio.data,createAudioObj:d.Audio.createAudioObj,updatePlayingComp:d.Audio.updatePlayingComp,updatePausingComp:d.Audio.updatePausingComp,onHTML5ErrorTryToReloadWithFlash:d.Audio.onHTML5ErrorTryToReloadWithFlash,isPlayingAllowed:d.RenderFlags.isPlayingAllowed,compData:d.Component.compData.isRequired,id:d.Component.id.isRequired,serviceTopology:d.ServiceTopology.serviceTopology,isMobileView:d.isMobileView},getInitialState:function(){this.audioObj=null;this.isAudioPlaying=false;this.trackPosition=0;this.isPlayingAllowed=this.props.isPlayingAllowed;return null},componentWillReceiveProps:function(a){if(this.props.compData.uri!==a.compData.uri){this.clearAudioObject()}if(a.aspectData.isPlaying){this.setState({$playerState:"playing"})}else if(this.props.aspectData.isPlaying){this.setState({$playerState:"pausing"})}},componentDidUpdate:function(){if(this.getDeviceState()!=="mobile"&&this.props.isPlayingAllowed){if(this.props.isPlayingAllowed!==this.isPlayingAllowed){this.isPlayingAllowed=this.props.isPlayingAllowed;if(this.autoPlay){this.initiatePlay()}}}else{this.isPlayingAllowed=this.props.isPlayingAllowed;if(!this.isPlayingAllowed&&this.props.aspectData.isPlaying){this.initiatePause()}}},componentDidMount:function(){if(this.getDeviceState()!=="mobile"&&this.autoPlay&&this.isPlayingAllowed){this.initiatePlay()}},componentWillUnmount:function(){this.clearAudioObject()},getOrCreateAudioObject:function(){return this.audioObj||this.createAudioObject()},createAudioObject:function(){var a=this;if(!a.props.compData.uri){return false}var b={id:a.props.id,url:a.props.serviceTopology.staticAudioUrl+"/"+a.props.compData.uri,autoPlay:false,stream:true,multiShot:true,multiShotEvents:true,autoLoad:!a.props.isMobileView||!a.props.isPlayingAllowed,usePolicyFile:false,whileloading:function(){if(typeof a.whileLoadingHandler==="function"){a.whileLoadingHandler(this.duration)}},onfailure:function(){a.failedToLoadAudioFile()},onfinish:function(){a.finishedPlayingAudio(this.id)},onsuspend:function(){a.audioLoadingSuspended(this.id)},onload:function(b){if(!b){a.props.onHTML5ErrorTryToReloadWithFlash()}}};return a.props.createAudioObj(b)},clearAudioObject:function(){if(this.audioObj){this.audioObj.pause();this.audioObj=null;this.trackPosition=0;if(this.resetTrackPosition){this.resetTrackPosition()}}},failedToLoadAudioFile:function(a){var c="Failed to load audio file "+a,d="color: #ff9494; font-size: 24px;";b.log.verbose("%c"+c,d);b.log.error(c)},audioLoadingSuspended:function(a){var c="Browser has chosen to stop downloading audio file "+a,d="color: #ff9494; font-size: 24px;";b.log.verbose("%c"+c,d)},playAudio:function(){var a=this,b={volume:a.audioVolume,position:a.trackPosition,whileplaying:function(){a.trackPosition=this.position;if(typeof a.whilePlayingHandler==="function"){a.whilePlayingHandler(this.position)}}};this.setVolume(this.audioVolume);this.audioObj.play(b)},updateAudioObject:function(){this.audioObj=this.getOrCreateAudioObject();if(this.props.aspectData.isSoundManagerOnResetup){this.audioObj=null}if(!this.audioObj){return}if(!this.isAudioPlaying&&this.state.$playerState==="playing"){this.isAudioPlaying=true;this.playAudio()}else if(this.isAudioPlaying&&this.state.$playerState==="pausing"){this.isAudioPlaying=false;this.audioObj.pause()}else if(this.state.$playerState==="repeat"){this.isAudioPlaying=false}},getDeviceState:function(){return this.props.isMobileView?"mobile":"desktop"},initiatePlay:function(){if(!a.isEmpty(this.props.compData.uri)&&this.props.compData.uri!==""){this.props.updatePlayingComp(this)}},initiatePause:function(){this.props.updatePausingComp()},getAudioDuration:function(){return this.audioObj.duration},seekAudio:function(a){this.trackPosition=a;if(this.isAudioPlaying){this.audioObj.setPosition(a)}else{this.initiatePlay()}},setVolume:function(a){this.audioVolume=a;if(this.isAudioPlaying){this.audioObj.setVolume(a)}},muteAudio:function(){this.audioObj.mute()},unmuteAudio:function(){this.audioObj.unmute()}}});define("audioCommon",["audioCommon/mixins/audioMixin"],function(a){"use strict";return{audioMixin:a}});