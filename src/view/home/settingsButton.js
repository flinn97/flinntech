import { MapComponent } from "../../mapTech/mapComponentInterface";
import {  PopupButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";
import IncrementQuote from "./incrementQuote";
import settings from "../../assets/Settings.png"


export default class SettingsPopup extends BaseComponent{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit",
            type:"topic",

        }
    }
  

    getInnerContent(){
      let report = this.componentList.getComponent("report")
      return(<>
  {report? (<img src={settings}  style={{width:"35px", height:"35px"}} onClick={()=>{this.dispatch({currentPopupComponent:report, popupSwitch:"updateReport"})}}/>):(      <PopupButton formClass = "FCImgButton" content={<img src={settings} style={{width:"35px", height:"35px"}}/>} popupSwitch={"addReport"}/>
)}
      
      </>)
    }
    render(){
      
        return(
        <div className={this.props.pageClass||this.state.defaultClass}>
         
          {this.getInnerContent()}

        </div>
        )
    }

    
}