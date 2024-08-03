import BaseClass from './baseClass';

export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey= "MCAttributeItem"

  }
  getName(){
    let cell = this.cell;
    this.name = cell.name;
    if(!this.name){
      this.name = cell
    }
  }
  getOption(){
    this.getName();
    return this.obj.getJson()[this.name];


  }


  
}
