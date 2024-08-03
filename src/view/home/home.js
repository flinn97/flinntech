import GetComponentTemplate from "../../serviceTech/APITech/APITemplates/getComponentTemplate";
import Card from "../../cardTech/Card";
import HomeContent from "./homeContent";

export default class Home extends GetComponentTemplate{
    constructor(props, ){
        super(props);

        this.state={
          ...this.state,
            defaultClass:"sideBarPageFit",
            type:"topic",
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
        <div  className={this.props.pageClass||this.state.defaultClass}>
          {this.state.gotComponents&&
          <Card  content={<HomeContent name="topic"/>}/>
          }

        </div>
        )
    }

    
}