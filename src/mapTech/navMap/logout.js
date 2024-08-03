import BaseClass from '../baseClass';


//model
export default class Logout extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCTextItem"


  }
  additionalPostSetup(){
    this.item.setOnClick(this.cell.logoutFunc||this.APIService.logout)
  }
  
  getOption(){
    return "logout"
  }



  
  
}
