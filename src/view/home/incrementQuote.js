import { MapComponent } from "../../mapTech/mapComponentInterface";
import {  PopupButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";

export default class IncrementQuote extends BaseComponent{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fitCC",
            type:"topic",

        }
    }
  

    getInnerContent(){
      
      return(<>
      <div className="layoutRow text fitCC">
        <div style={{marginRight:"3px"}}>{this.props.obj.getJson().quotes}</div>
        <div> | </div>
        <div style={{marginLeft:"3px", cursor:"pointer"}} onClick={()=>{this.props.obj.setCompState({quotes: (parseInt(this.props.obj.getJson().quotes)+1).toString()}, {run:true}, this.dispatch)}}>+</div>
        <div> | </div>
        <div style={{marginLeft:"3px", cursor:"pointer"}} onClick={()=>{this.props.obj.setCompState({quotes: (parseInt(this.props.obj.getJson().quotes)-1).toString()}, {run:true}, this.dispatch)}}>-</div>

      </div>
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