define("stripContainer",["lodash","core","mediaCommon","backgroundCommon"],function(a,b,c,d){"use strict";var e=b.compMixins;var f=c.mediaLogicMixins.fill;return{displayName:"StripContainer",mixins:[f,e.skinBasedComp,d.mixins.backgroundDetectionMixin],statics:{useSantaTypes:true,behaviors:f.behaviorsAPI},getDefaultSkinName:function(){return"wysiwyg.viewer.skins.stripContainer.DefaultStripContainer"},getSkinProperties:function(){return{"":{},background:this.createFillLayers(),inlineContent:{children:this.props.children}}}}});