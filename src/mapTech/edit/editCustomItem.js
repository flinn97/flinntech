import EditItem from "./editItem";


export default class EditCustomItem extends EditItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCCustomEditItem"

    
  }

  getOption(){
    return <this.cell.custom {...this.props} masterCell={this}/>
  }
}
