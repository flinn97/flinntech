import BaseClass from './baseClass';


//model
export default class PlainDisplay extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey = "MCAttributeItem"

  }
  getOption(){
    return this.state.obj
  }


  
}
