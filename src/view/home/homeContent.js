import { MapComponent } from "../../mapTech/mapComponentInterface";
import {  PopupButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";

export default class HomeContent extends BaseComponent{
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
      <h1 style={{marginBottom:"20px"}}>My Topics</h1>
      <PopupButton content="Add Content" popupSwitch={"addTopic"}/>
      <br></br>
      <div style={{width:"70%"}}>
      <MapComponent name={"topic"} cells={[{type:"backgroundImage",name:"name", hasLink:true}]}/>
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