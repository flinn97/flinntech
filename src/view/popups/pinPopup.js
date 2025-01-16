import OemPopupContent from "./OemPopupContent";
import TopicMover from "./topicMover";

export default class PinPopup extends OemPopupContent {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            type: "pin"

        }

    }
    async setTopicObj() {
        let subTopic = this.propsState.currentSubTopic || this.propsState.currentTopic
        let json = {
            type: "subTopic",
            topicId: this.propsState.currentTopic?.getJson()._id,
            parentId: subTopic?.getJson()._id
        }
        let comp = await this.operationsFactory.prepare({ prepare: json });
        await this.dispatch({ currentPopupComponent: comp[0] })
        this.setState({ type: "topicEditor", topic: comp[0] })

    }
    getHtml() {
        this.html = <div>
            <div onClick={() => { this.setState({ type: "topicMover" }) }}>Attatch Topic</div>
            <div onClick={() => { this.setTopicObj() }}>Add Topic</div>
        </div>
        return this.html

    }
    updatePin(obj) {
        
        let pin = this.propsState.currentPin;
        let subTopicJson = obj?.getJson()||(this.state.topic?.getJson()||this.componentList.getComponent("subTopic", this.propsState.currentPin?.getJson().subTopicId,)?.getJson());
        let subTopicId = subTopicJson._id;
        let subTopicName = subTopicJson.name
        
        pin.setCompState({
            topicId: this.propsState.currentTopic.getJson()._id,
            subTopicId: subTopicId,
            name: subTopicName
        });
        
        pin.update();

    }
    getReactCompByType() {
        
        let type = this.state.type;
        let obj = undefined;
        let subTopicId = this.propsState.currentPin?.getJson().subTopicId
        if (subTopicId) {
            let topicType = subTopicId === this.propsState.currentTopic.getJson()._id ? "topic" : "subTopic";
            obj = this.componentList.getComponent(topicType, subTopicId);
            type = "topicEditor";
        }

        let json = {
            "topicMover": <TopicMover callbackFunc={(obj) => {
                
                this.updatePin(obj);
            }}/>,
            "topicEditor": <OemPopupContent obj={obj} callbackFunc={() => {
                this.updatePin();
            }} />,
            "pin": this.getHtml()
        }

        return json[type];
    }

    render() {

        return (
            <div>
                {this.state.type !== "pin" && <div onClick={() => { this.setState({ type: "pin" }) }}>back</div>}
                {this.getReactCompByType()}
            </div>
        )
    }
}
/**
 * consider moving this to technology it could be useful to have a tool that can display stuff and copy.
 */