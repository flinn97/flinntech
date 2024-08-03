import BaseClass from "../baseClass";
export default class OrderedArrowsBaseClass extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey= "MCOrderedArrows";
    this.state.increment = 1;
    this.state.decrement = -1;

  }
  increasePosition(){
    
    this.obj.updateOrder(this.state.increment);
  }
  decreasePosition(){
    
    this.obj.updateOrder(this.state.decrement);

  }
  increaseArrowUI(){
    this.increaseArrow = <div  className="upward-arrow" onClick={this.decreasePosition}></div>
    return this.increaseArrow
  }
  decreaseArrowUI(){
    this.decreaseArrow  = <div style={{marginTop:"5px"}} className="downward-arrow" onClick={this.increasePosition}></div>
    return this.decreaseArrow 
  }

  getOption(){
    
    this.increaseArrowUI();
    this.decreaseArrowUI();
    let div = <div style={{marginTop:"-4px"}} className='fitCC'>{this.increaseArrow}{this.decreaseArrow}</div>
    return div


  }


  
}
