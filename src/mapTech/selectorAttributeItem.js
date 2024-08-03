import AttributeItem from './attributeItem';

export default class SelectorAttributeItem extends AttributeItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCAttributeItem";
    

  }

  getItemClass(){
    let cell = this.cell;
    let bool = cell.activeAttribute? cell.activeAttribute: "_id";
    let id = this.state.obj.getJson()[bool] 

    if(id===cell.activeItem?.getJson()[bool]){
      let style = cell.activeClass? cell.activeClass: this.theme.MCActiveItem;
      this.item.setClass(this.item.getClass() + " " + style)
    }
  }
  additionalPostSetup(){
    this.getItemClass();
  }


}
