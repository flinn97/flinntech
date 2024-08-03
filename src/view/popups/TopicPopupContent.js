import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";

export default class TopicPopupContent extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit scroller",
        }
    }
    render(){
      let text = this.props.obj?"Edit":"Add"
      let button = <RunButton content="Add Topic" isPopup={true} callbackFunc={this.props.callbackFunc} />
      if(this.props.obj){
        
        button = <UpdateButton obj={this.props.obj} content="Save" isPopup={true} callbackFunc={this.props.callbackFunc}/>
      }
        return(
        <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
          <h2>{text} Topic</h2>
          Title:
          <div style={{width:"90%", marginLeft:"7px"}}>
          <ParentFormComponent obj={this.props.obj} name="name" inPopup={true}/>
          </div>
          Content:
          <div style={{width:"92.5%"}}>
          <ParentFormComponent obj={this.props.obj} type="quill" name="description" inPopup={true}/>
          </div>
          <UploadButton uploadType="showUpload" obj = {this.props.obj||this.propsState.currentPopupComponent}/>
          <div className="popupButton">
          {button}
          </div>

          
          

        </div>
        )
    }

    
}