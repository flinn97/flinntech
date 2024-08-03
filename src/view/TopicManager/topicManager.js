import Card from "../../cardTech/Card";
import GetComponentsFromUrl from "../../serviceTech/APITech/APITemplates/getComponentsFromUrlTemplate";
import urlService from "../../serviceTech/Util/urlService";
import SubTopicHierarchy from "./subTopicHierarchy";
import TopicContent from "./topicContent";

export default class TopicManager extends GetComponentsFromUrl{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"sideBarPageFit",
            type:"topic",
            reRender:true,
            showHierarchy:false,
            app:this.app
        }
    }

    async setCurrentItems(){
      if(urlService.getTypeFromURL()==="subTopic"){
        this.dispatchItems.currentTopic = this.componentList.getComponent("topic", this.comp.getJson().topicId);
        await this.dispatchItems.currentTopic.getAssociatedItemsFromBackend();
      }
      this.dispatch({
          currentComponent:this.comp,
          ["current"+this.getCapitalFirstLetter(this.comp.getJson().type)]: this.comp,
          ...this.dispatchItems
      })
  }

  onBackClick(){
    let type = urlService.getTypeFromURL();
    this.getComponentsFromBackend();
    if(type==="topic"){
      this.dispatch({currentSubTopic:undefined});
    }
  }

    render(){
      this.setInitialApp();
      let app = this.app;
      let state = app.state;
        return(
        <div   className={this.props.pageClass||this.state.defaultClass}>
          {this.state.gotComponents&&
          <Card content={<TopicContent obj={state.currentTopic?{type:"subTopic", topicId:state.currentTopic.getJson()._id, parentId:state.currentSubTopic?state.currentSubTopic.getJson()._id:state.currentTopic.getJson()._id,}:undefined}/>}/>
          }
          <h3 style={{position:'absolute', right:"20px", top:"10px", background:"#DB2955"}} className="defaultButton" onClick={()=>{this.setState({showHierarchy:!this.state.showHierarchy})}}>Show All Topics {">"}</h3>
          {this.state.showHierarchy&&<Card cardStyle={{position:'absolute', right:0, top:"0px", boxShadow: "-2px 5px 6px rgba(0, 0, 0, 0.1)", borderRadius:"0px" }} type="fullHeightCard" content={<SubTopicHierarchy hideHierarchy={()=>{this.setState({showHierarchy:false})}}/>}/>}
        </div>
        )
    }

    
}