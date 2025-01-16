import Card from "../../cardTech/Card";
import TodoListContent from "./todoListContent";
import OEMview from "./oem";
import GetAllComponents from "../../serviceTech/APITech/APITemplates/getAllComponentsByUserTemplate";

export default class Home extends GetAllComponents{
    constructor(props, ){
        super(props);

        this.state={
          ...this.state,
            defaultClass:"fit",
            type:"topic",
            owner: this.app.state.currentUser.getJson()._id
        // ids:,
        // filterKeys: obj.filterKeys,

        }
    }
    async componentDidMount(){
      await this.dispatch({currentTopic: undefined, currentSubTopic:undefined, currentComponent:undefined})
      this.getComponentsFromBackend();
      
  }

    render(){
        return(
        <div  className={this.props.pageClass||this.state.defaultClass} style={{marginLeft:window.innerWidth<1000?"5px":"50px"}}>
          <div style={{width:"100%", backgroundColor:"gray", height:"1px", marginLeft:window.innerWidth>850&&"-50px"}}></div>
          {this.state.gotComponents&&<div className="fit">
            <div className="fit" style={{maxHeight:"280px"}}>
          <Card theme="NoBorder"  content={<OEMview name="oem"/>}/>
          </div>

          <div className= {window.innerWidth<1000? "layoutColumn":"layoutRow"} style={{marginTop:"20px"}}>
            <div style={{width:window.innerWidth<1000?"90%":"45%", marginRight:"30px", height:"400px"}}>
          <Card theme="NoBorder"  content={<TodoListContent name="isr" popupSwitch ="addIsr" title="ISR Activities" forUpdate="Isr"/>}/>
          </div>
          <div style={{width:window.innerWidth<1000?"90%":"45%" , height:"400px"}}>

          <Card theme="NoBorder" content={<TodoListContent name="campaign" popupSwitch ="addCampaign" title="Campaigns" forUpdate="Campaign" completionText="Launch" />}/>
          </div>          </div>

          </div>
          }

        </div>
        )
    }

    
}