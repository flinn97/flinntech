import BaseClass from '../baseClass';
import { MapComponent } from '../mapComponentInterface';


//model
export default class LinkContainer extends BaseClass {
  constructor(props){
    super(props);
    this.state.itemType="div"


  }
  getList(){
    this.list = this.props.cell.links.filter(obj=>obj.name!==undefined);
    return this.list;

  }
  getHome(){
    if(!this.state.active){
      this.home = this.list.find(obj => obj.path==="/")
      for(let l of this.list){
        l.active = this.home.name
      }
    }
    
  }
  getOption(){
    
    let list = this.props.cell.links.filter(obj=>obj.name!==undefined && obj.display!==false)
    return <MapComponent list={list} theme={this.cell.linksTheme||"links"} cells={[{type:"linkItem", linkClick:(obj)=>{
      
      for(let l of this.props.cell.links){
        l.active = obj.name
      }
      this.setState({active:obj.name})
    }
  }]}/>
  }
  additionalSetup(){
    this.getList();
    this.getHome();
  }

  
}


