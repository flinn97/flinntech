import BaseClass from './baseClass';


//this could be updated to use the baseclass getHtml
export default class MapComponentItem extends BaseClass {
  constructor(props) {
    super(props);
    

    this.initialPropsSetupFunctions = [...this.initialPropsSetupFunctions, this.setList, this.setFactory];

    this.state = {
      ...this.state,
      mapContainerClass: "MCMapContainer",
      interface: "map",
      mapSectionClass: "MCMapSection",


    }

    this.defaultTypes = ["del", "edit", "img"];
  }

  setFactory(){
    this.factory=this.interface.getFactory();
  }

  getDefaultTypes() {
    return this.defaultTypes
  }

  checkCellForDefaults(cell) {
    let arr = this.getDefaultTypes();
    return arr[arr.indexOf(cell)]
  }
  textOrAttribute(obj, cell) {
    let type = (obj.getJson && obj?.getJson()[cell]) ? "attribute" : "text";
    return type
  }

  getType(cell, obj) {
    
    let type = cell.type

    //this stuff is all because we want them to be able to send in text sometimes instead of an obj. So its not important code.
    if (!type) {
      
      type = this.checkCellForDefaults(cell);
      if (!type) {
        type = this.textOrAttribute(obj, cell);
      }
    }
    return type

  }
  getProps(cell, obj){
    let p = { obj: obj, ...this.props, interface: this.interface, cell: cell, theme: this.props.theme };
    return p
  }

  getCellList(obj) {
    let cells = this.props.cells;
    
    return (<>{cells.map((cell, i) => {
      
      let type = this.getType(cell,obj);
      let p = this.getProps(cell, obj);
     
      
      return <>{this.factory.getComponent(type, p)}</>
    }
    )}</>)
  }



  getListHtml() {
    return (<>{this.list.map((obj) => <>{
      this.mapSection.getHtml({type:"div", content:this.getCellList(obj)})
      }</>
    )}</>)
  }
 


  setList(){
    this.list=this.props.list
  }

  preSetup() {
    this.setComponents(["mapContainer", "mapSection", "link"]);
  }


  getHtml() {
    
    let html =  this.mapContainer.getHtml({type:"div", content:this.getListHtml()})
    this.html = <>{html}</>
    return this.html;
  }

}


