import { Link } from "react-router-dom";
import { MapComponent } from "../../mapTech/mapComponentInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";

export default class SubTopicHierarchy extends BaseComponent {
  constructor(props,) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      type: "topic",

    }
  }

  getInnerContent() {
    let topic = this.propsState.currentTopic;

    return (<>
      <h3 style={{ position: 'absolute', left: "20px", top: "10px", cursor:"pointer" }} className="defaultButton" onClick={() => { this.props.hideHierarchy() }}>{"<"} Hide All Topics </h3>

      <Link style={{ color: 'black', fontSize:"20px" }} to={"../topic/" + topic.getJson()._id}>{topic.getJson().name}</Link>
      <MapComponent name={"subTopic"}
        filter={{ search: this.app.state?.currentTopic?.getJson()._id, attribute: ["parentId", "parentIds"] }}
        cells={[{ type: "attribute", name: "name", hasLink: true, linkClick: () => { this.dispatch({ ulrChange: true }) } }, { type: "innerMap" }]} />
    </>)
  }
  render() {

    return (
      <div style={{ marginTop: "60px", paddingLeft:"1 0px", }} className={this.props.pageClass || this.state.defaultClass}>

        {this.getInnerContent()}

      </div>
    )
  }


}