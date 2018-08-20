define("mediaPlayer",["lodash","core","compDesignUtils","santaProps","mediaCommon","mediaControls"],function(a,b,c,d,e,f){"use strict";var g=e.mediaLogicMixins.mediaPlayer;var h={skinPart:"controls",componentName:"wysiwyg.viewer.components.mediaControls",skinName:"skins.viewer.mediaControlsDefaultSkin",styleId:"mcnt1",style:{width:480,height:40,marginLeft:-240,left:"50%",position:"absolute",bottom:0}};var i={skinPart:"overlayControls",componentName:"wysiwyg.viewer.components.mediaOverlayControls",skinName:"skins.viewer.mediaOverlayControlsDefaultSkin",styleId:"mocnt1",style:{position:"absolute"}};return{displayName:"MediaPlayer",mixins:[g,b.compMixins.skinBasedComp],propTypes:a.defaults({style:d.Types.Component.style.isRequired,compDesign:d.Types.Component.compDesign},d.santaTypesUtils.getSantaTypesByDefinition(f.mediaControls)),statics:{useSantaTypes:true,behaviors:g.behaviorsAPI},getDefaultSkinName:function(){return"wysiwyg.viewer.skins.mediaPlayerSkin"},getControls:function(){var a={};var b=h.componentName;var c=h.skinPart;var d={ref:c,skinPart:c,id:this.props.id+c,playerId:this.props.id,style:h.style};return this.createChildComponent(a,b,c,d)},getOverlayControls:function(){var a={};var b=i.componentName;var c=i.skinPart;var d={ref:c,skinPart:c,id:this.props.id+c,playerId:this.props.id,style:i.style};return this.createChildComponent(a,b,c,d)},getCatcherProperties:function(){var b={};if(this.props.autoplay==="manual"){b.onClick=a.noop}if(this.props.autoplay==="hover"){b.onMouseEnter=a.noop;b.onMouseLeave=a.noop}return b},getSkinProperties:function(){var a={"":{style:this.props.style},background:this.createFillLayers(),catcher:this.getCatcherProperties(),overlayControls:{},controls:this.getControls(),container:{style:c.getContainerStyle(this.props.compDesign)}};return a}}});