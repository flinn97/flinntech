import BaseClass from './baseClass';
//model
export default class CustomBuiltItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCCustom"


  }
  getOption(){
    
    return this.cell.custom
  }


}
