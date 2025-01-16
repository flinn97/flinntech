import { MapComponent } from "../../mapTech/mapComponentInterface";
import {  PopupButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";
import add from "../../assets/add.png";

export default class TodoListContent extends BaseComponent{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit",
            type:"topic",

        }
    }
  
    getCurrentDate() {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
    
      return `${month}/${day}/${year}`;
    }

    getInnerContent(){
      return(<>
      <h4 style={{marginBottom:"10px"}}>{this.props.title}</h4>
      <PopupButton formClass = "FCImgButton"  content={<img src={add} style={{width:"30px", height:"30px"}}/>}  popupSwitch={this.props.popupSwitch}/>
      <div style={{backgroundColor:"#f8f5f5", padding:"5px"}} className="scroller">
        <div>
        <div className="layoutRowSpace" style={{padding:"10px", width:"95%"}}>
          <div><b>Active</b></div>
          <div style={{marginRight:"20px"}}>{this.props.completionText||"Mark Complete"}</div>
        </div>
      <MapComponent  mapSectionClass="Map-Section-ei" name={this.props.name} 
      cells={[
        {type:"attribute", name:"name", itemClick:(obj)=>{
          console.log("update"+this.props.forUpdate);
          this.dispatch({currentPopupComponent:obj, popupSwitch:"update"+this.props.forUpdate})}}, 
        {type:"text", name:"Complete", class:"text doneEiButton", wrapperClass:"wrapperButtonEi", wrapperStyle:{marginRight:this.props.name==="isr"?"5px":"-19px"}, itemClick:(obj)=>{obj.setCompState({complete:true, date:this.getCurrentDate()}, {run:true}, this.dispatch)}}
      ]} 
        filters={[{type:"bool", attribute:"complete", search:false}]}/>
        </div>
<div className="layoutRowSpace" style={{padding:"10px", width:"95%", paddingBottom:"0px"}}>
<div><b>Completed</b></div>
          <div style={{marginRight:"115px"}}>Date</div>
        </div>
      
      <MapComponent mapSectionClass="Map-Section-ei makeRelative" mapSectionStyle={{marginLeft:"5px"}} name={this.props.name} cells={[{type:"attribute", class:"fit text", name:"name",itemClick:(obj)=>{
                  console.log("update"+this.props.forUpdate);
        this.dispatch({currentPopupComponent:obj, popupSwitch:"update"+this.props.forUpdate})}}, 
        {type:"attribute", name:"date", wrapperStyle:{position:"absolute", right:"100px", width:"70px"}}, 
        {type:"text",class:"text eiButton", wrapperStyle:{position:"absolute", right:"0px", width:"100px"},  name:"Send Back",itemClick:(obj)=>{obj.setCompState({complete:false}, {run:true}, this.dispatch)}}]} filters={[{type:"bool", attribute:"complete", search:true}]}/>

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