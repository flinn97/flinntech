import { MapComponent } from "../../mapTech/mapComponentInterface";
import { DelButton, ParentFormComponent, PopupButton, UploadButton } from "../../formTech/FormComponentsInterface";
import TodoListContent from "../home/todoListContent.js";
import urlService from "../../serviceTech/Util/urlService.js";
import "./topicManager.scss"
export default class TopicContent extends TodoListContent {
  getInnerContent() {
    let type = urlService.getTypeFromURL();
    let json = {
      "topic": this.componentList.getComponent("topic", this.props.obj.topicId),
      "subTopic": this.componentList.getComponent("subTopic", this.props.obj.parentId)
    }
    let l = this.componentList.getList("subTopic", this.props.obj?.parentId, ["parentId", "parentIds"]).length
    return (<>
      <h1>Topic:</h1>
      <div style={{ width: "70%", }}>
        <ParentFormComponent name="name" update={true} obj={json[type]} />
      </div>
      <div style={{ width: "71.25%", marginLeft: "-7px" }}>
        <ParentFormComponent type="quill" name="description" update={true} obj={json[type]} />
      </div>
      <br></br>
      <DelButton />
      <div className="fullWidthRow" style={{ maxHeight: "700px" }}>
        <div className="scroller" style={{ height: l > 7 && "700px" }}>
          <h2>Add Topic</h2>
          <PopupButton content="Add Sub-Content" popupSwitch={"addSubTopic"} obj={this.props.obj} />
          <PopupButton content="Find Topics" popupSwitch={"topicMover"} />
          <div style={{ width: "500px", }} >
            <MapComponent name={"subTopic"} filter={{ search: this.props.obj?.parentId, attribute: ["parentId", "parentIds"] }} cells={[{ type: "attribute", name: "name", hasLink: true, forceUpdate: true }, { type: "order" }]} />
          </div>
        </div>
        <div style={{ marginLeft: "200px" }}>
          <h2>Add Interactive Image</h2>
          <PopupButton content="Find Images" popupSwitch={"mapMover"} />
          <UploadButton finishCallBackFunc={() => { this.dispatch({}) }} prepareOnChange={{ type: "map", topicId: this.props.obj.topicId, subTopicId: this.props.obj.parentId }} runOnChange={true} />
          <div style={{ width: "300px", height: "300px" }}>
            <MapComponent type="interactiveMap" name="map" filter={{ search: this.props.obj.parentId, attribute: "subTopicId" }} addComponentButton={true} addPinProps={{ topicId: this.props.obj.topicId }} pinCell={{ type: "attribute", name: "name", itemClick: (obj) => { this.dispatch({ popupSwitch: "pinPopup", currentPin: obj }); } }} />
          </div>
        </div>
      </div>
      <br></br>
      <h2>Add Media</h2>
      <PopupButton content="Find Images" popupSwitch={"imageMover"} />
      <UploadButton finishCallBackFunc={() => { this.dispatch({}) }} prepareOnChange={{ type: "image", topicId: this.props.obj.topicId, subTopicId: this.props.obj.parentId }} runOnChange={true} />
      <div style={{ width: "80%" }}>
        <MapComponent name={'image'} theme="defaultWrapRow" filter={{ search: this.props.obj?.parentId, attribute: "subTopicId" }} cells={[{ type: "img", name: "picURL", class: "galleryImage" }]} />
      </div>
    </>)
  }
}