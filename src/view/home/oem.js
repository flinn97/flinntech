import { MapComponent } from "../../mapTech/mapComponentInterface";
import {  PopupButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";
import IncrementQuote from "./incrementQuote";
import add from "../../assets/add.png";

export default class OEMview extends BaseComponent{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit",
            type:"topic",

        }
    }
  

    getInnerContent(){
      return(<>
      <h4 style={{marginBottom:"10px"}}>OEM SCOREBOARD</h4>
      <PopupButton
       formClass = "FCImgButton" 
       content={<img src={add} style={{width:"30px", height:"30px"}}/>} popupSwitch={"addOem"}/>
      <div className="fit " style={{backgroundColor:"#f8f5f5", width:"92%"}}>
        <div className="Map-Section-ei" style={{ padding:"10px", paddingLeft:"15px"}}>
         <div className="Map-Cell textBold">OEM</div>
         <div className="textBold Map-Cell" style={{marginLeft:"-3px"}}>Category</div>
         <div className="textBold Map-Cell fitCC">Quotes Generated</div>
         <div className="textBold Map-Cell fitCC" ></div>
        </div>
        <div className="scroller" style={{height:"130px", marginLeft:"12px"}}>
      <MapComponent name={this.props.name}  mapSectionClass="Map-Section-ei"
      cells={[
        {type:"attribute", name:"name", style:{cursor:"pointer"}, itemClick:(obj)=>{this.dispatch({currentPopupComponent:obj, popupSwitch:"updateOem"})}}, 
        {type:"attribute", name:"category", }, 
        {type:"custom", custom:IncrementQuote, }, 
        {type:"del", class:"text fitCC", style:{cursor:"pointer"}}
    
    ]} />
</div>

      </div>
      </>)
    }
    render(){
      
        return(
        <div className={this.props.pageClass||this.state.defaultClass} >
         
          {this.getInnerContent()}

        </div>
        )
    }

    
}