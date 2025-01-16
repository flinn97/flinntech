import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";

export default class OemPopupContent extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit scroller",
        }
    }
    render(){
      let text = this.props.obj?"Edit":"Add"
      let button = <RunButton   content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />
      if(this.props.obj){
        
        button = <UpdateButton obj={this.props.obj} content="Save" isPopup={true} callbackFunc={this.props.callbackFunc}/>
      }
        return(
        <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
          <h2>{text} OEM</h2>
          Title:
          <div style={{width:"70%", marginLeft:"7px"}}>
          <ParentFormComponent obj={this.props.obj} name="name" inPopup={true}/>
          </div>
          Category
          <div style={{width:"70%", marginLeft:"7px"}}>
          <ParentFormComponent obj={this.props.obj} name="category" inPopup={true}/>
          </div>
          Notes:
          <div style={{width:"90%", backgroundColor:"white", marginLeft:"10px"}}>
          <ParentFormComponent obj={this.props.obj} type="quill" name="notes" inPopup={true}/>
          </div>
          <div className="popupButton" style={{width:"100%", display:"flex", justifyContent:"flex-end", alignContent:"flex-end"}}>
            <div style={{paddingRight:"50px", paddingBottom:"20px"}}>
          {button}</div>
          </div>

          
          

        </div>
        )
    }

    
}