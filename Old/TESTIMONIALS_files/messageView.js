define("messageView",["lodash","core","santaProps","siteButton"],function(a,b,c,d){"use strict";var e=b.compMixins;function f(){var a={label:"OK",id:"ok"};var b={align:"center"};var c="okButton";return this.createChildComponent(a,"wysiwyg.viewer.components.SiteButton",c,{skinPart:c,compProp:b,onClick:this.props.compProp.onCloseCallback})}return{displayName:"MessageView",mixins:[e.skinBasedComp],propTypes:a.assign({compProp:c.Types.Component.compProp},c.santaTypesUtils.getSantaTypesByDefinition(d)),statics:{useSantaTypes:true},getSkinProperties:function(){return{"":{style:{display:"block",position:"absolute"}},blockingLayer:{},dialog:{},title:{children:this.props.compProp.title},description:{dangerouslySetInnerHTML:{__html:this.props.compProp.description||""}},okButton:f.call(this)}}}});