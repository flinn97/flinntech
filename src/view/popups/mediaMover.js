import { MapComponent } from "../../mapTech/mapComponentInterface";
import OemPopupContent from "./OemPopupContent";

export default class MediaMover extends OemPopupContent {
    checkIds(obj){
        let imageTopicId = obj.getJson().topicId;
        let imageSubTopicId = obj.getJson().subTopicId;
        let type = this.propsState.currentComponent.getJson().type;
        let topicId = this.propsState.currentTopic.getJson()._id;
        let subTopic= this.propsState.currentSubTopic
        let subTopicId = subTopic?subTopic.getJson()._id:topicId;
        if(subTopicId!==imageSubTopicId){
            if((type!=="topic")||(topicId!==imageTopicId)){
               this.copy(topicId, subTopicId, obj);
            }

        }
    }
    getType(){
        return "image"
    }
    copy(topicId, subTopicId, obj){
        let newJson = {topicId:topicId, subTopicId:subTopicId, type:this.getType()}
        obj.copy(newJson);
    }
    render() {
        return (
            <div style={{paddingLeft:"25px"}}>
                <h1>Find Media</h1>
                <div style={{marginBottom:"15px"}} className="defaultButton" onClick={()=>{
                    
                    this.componentList.getComponentsFromBackend("image");
                    this.componentList.getComponentsFromBackend("map");
                    
                }}>Show Other Topics</div>
                <MapComponent name={['image','map',]} theme ="defaultWrapRow" cells={[{
                    type: "img", name: "picURL", class:"galleryImage", itemClick: (obj) => {
                     this.checkIds(obj);
                     this.dispatch({popupSwitch:"", currentPopupComponent:undefined})
                    }
                }]} />
            </div>
        )
    }
}
/**
 * consider moving this to technology it could be useful to have a tool that can display stuff and copy.
 */