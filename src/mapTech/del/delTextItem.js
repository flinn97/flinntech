import DelItem from './deleteItem';


export default class DelTextItem extends DelItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCDelItem"

  }

  getOption(){
    let option = this.props.delText||"delete";
    return option;
  }
}
