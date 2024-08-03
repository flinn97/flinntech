import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import React from "react";
import { cardInterface } from "./cardInteface";
/**
 * card component for adding good UI
 */
export default class Card extends BaseComponent {

  type;
  theme;
  interface;
  // set up fucntions
  constructor(props) {
    super(props);
    
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.initialPropsSetupFunctions=[...this.initialPropsSetupFunctions, this.setApp,this.setType,this.setClassStr,]
    this.state={
      defaultType: this.props.type?this.props.type:"fit",
      defaultTheme: this.props.theme?this.props.theme: "Default",
      typeKey: "type",
      themeKey:"theme"
    }
    this.interface = cardInterface
  }
  


  //mount for popups
  componentDidMount() {
    if(this.props.popup){
      document.addEventListener('mousedown', this.handleClickOutside);

    }
}

//unmount the mousedown event listener
componentWillUnmount() {
  if(this.props.popup){
    document.removeEventListener('mousedown', this.handleClickOutside);

  }
}

//handle close if clicked outside.
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if(this.props.handleClose){this.props.handleClose();}} 
}

/**
 * create a wrapper popup for the html if this.props.popup is true
 * @param {*} html 
 * @returns 
 */
  isPopup(html){
    
    if(this.props.popup){
      
      let closePopup = this.closePopup.getHtml({content:this.props.closeUI||<>X</>, props:{onClick:()=>{if(this.props.handleClose){this.props.handleClose();}}}});
      let popup = this.popupContent.getHtml({content:<>{closePopup}{html}</>, props:{ref:this.wrapperRef}})
      let backDrop = this.backDrop.getHtml({content:popup})
      html = backDrop
    }
    return html

  }

  setTheme(){
    this.theme = this.props[this.state.themeKey]? this.props[this.state.themeKey]: this.state.defaultTheme;
      }

  setType(){
    this.type = this.props[this.state.typeKey]? this.props[this.state.typeKey]: this.state.defaultType;
  }


  setClassStr(){
    this.defaultcardClass =this.type+this.theme + " scroller";
    this.defaultcardClass = this.props.popup? this.defaultcardClass+ " cardPopup":this.defaultcardClass;
    if(this.props.popup){
      this.defaultbackDropClass= "backDropPopup";
      this.defaultpopupContentClass="popupContent";
      this.defaultclosePopupClass = "closePopup";
    }
  }

  
  getHtml(){
    let content = this.getContent();
    this.html = this.card.getHtml({content: content});
  this.html = this.isPopup(this.html );
  return this.html
  }

  getContent(){
    this.content = this.props.content;
    return this.content;
  }

  preSetup() {
    let arr = ["card"];
    if(this.props.popup){
      arr=[...arr, "backDrop", "popupContent", "closePopup" ]
    }
    this.setComponents(arr);
  }

}

//TODO:
//figure out how to provide the mod file to change the color theme from the root to nodemodules;
//more themes
//incorporate tech like bootstrap to get pro look
//check to make sure things can change upon sending in props.
