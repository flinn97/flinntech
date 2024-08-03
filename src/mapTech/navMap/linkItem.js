import BaseClass from '../baseClass';


//model
export default class LinkItem extends BaseClass {
  constructor(props){
    super(props);
    
    this.initialPropsSetupFunctions=[...this.initialPropsSetupFunctions, this.setUpLinks]
    this.state.classKey = "MCLinkItem";
    this.state.itemType="div"


  }
  setUpLinks(){
    this.cell.to = this.obj.path;
    this.useId = "";
    this.cell.hasLink=true;

  }
  getActiveClass(){
    this.activeClass = this.cell.activeClass || this.theme.MCActiveLink;
    return this.activeClass
  }

  setActiveClass(){
    
    if(this.obj?.active === this.obj?.name){
      let activeClass = this.getActiveClass();
      activeClass = activeClass||"";
      this.item.setClass(this.item.getClass() + " "+ activeClass)
    }
  }
 
    additionalSetup(){
      
      this.setActiveClass();
    }
    getOption(){
      return this.props.obj?.name
    }





}


