import { MapComponent } from "../../mapTech/mapComponentInterface";
import OemPopupContent from "./OemPopupContent";

export default class TopicMover extends OemPopupContent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            link: false
        }

    }
    moveTopic(obj) {

        let topicId = this.propsState.currentTopic.getJson()._id;
        let subTopic = this.propsState.currentSubTopic
        let subTopicId = subTopic ? subTopic.getJson()._id : topicId;
        obj.setCompState({ topicId: topicId, parentId: subTopicId }, { run: true });

    }
    linkTopic(obj) {
        
        let topicId = this.propsState.currentTopic.getJson()._id;
        let subTopic = this.propsState.currentSubTopic
        let subTopicId = subTopic ? subTopic.getJson()._id : topicId;
        let parentIds = obj.getJson().parentIds;
        obj.setCompState({ parentIds: { ...parentIds, [subTopicId]: subTopicId } }, { run: true });

    }

    render() {
        return (
            <div className="fit">
                <h1 style={{marginLeft:"50px"}}>Find Topics To Move</h1>
                <div style={{borderRadius:"8px", border:"1px solid gray", width:"140px", display:"flex", height:"20px", marginLeft:"60px", justifyContent:"center", alignItems:"center",color:this.state.link&&"white", background:this.state.link&&"#DB2955", cursor:"pointer"}} onClick={() => { this.setState({ link: !this.state.link }) }}>Link to Topic Instead</div>
                {/* <div onClick={()=>{
                    
                    this.componentList.getComponentsFromBackend("image");
                    this.componentList.getComponentsFromBackend("map");
                    
                }}>Show Other Topics</div> */}
                <div style={{marginLeft:"60px", marginTop:"20px"}}>
                <MapComponent name={"subTopic"} theme="defaultWrapRow" cells={[{
                    type: "attribute", name: "name", class:"defaultButton",  itemClick: (obj) => {
                        
                        if (this.state.link) {
                            this.linkTopic(obj);
                        }
                        else {
                            this.moveTopic(obj);

                        }
                        if(this.props.callbackFunc){
                            this.props.callbackFunc(obj);
                        }
                        this.dispatch({ popupSwitch: "", currentPopupComponent: undefined })
                    }
                }]} />
                </div>
            </div>
        )
    }
}
/**
 * consider moving this to technology it could be useful to have a tool that can display stuff and copy.
 */