import BaseClass from '../baseClass';
//model
export default class AddComponentButton extends BaseClass {
  constructor(props){
    super(props);


  }
  preSetup() {
    this.setComponents([]);
  }
  async createObjType(){
    
    let opps = this.operationsFactory;
    let type = this.props.addType;
    await opps.prepare({prepare:{type:type, mapId:this.props.mapId, ...this.props.addPinProps}, clean:true, run:true});
    
    this.props.pinAdded();

    
    
  }


  getHtml(){
    let text = this.props.text||"+ Add Item"
  return (
    <div onClick={this.createObjType} style={this.props.style} className={this.props.class||this.theme.MCAddButton}>
      {text}
    </div>
  )}
}
/**
 * set this up to use the power of item.
 */