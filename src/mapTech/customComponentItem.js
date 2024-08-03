import BaseClass from './baseClass';
//model
export default class CustomComponentItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCCustom"


  }
  getItemHtml(){
    return <this.state.cell.custom {...this.props} masterCell={this}/>
  }


}
