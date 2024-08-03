import BaseButton from "./baseButton";

export default class RunButton extends BaseButton{
   

    buttonClickFunc(){
        
        let arr = this.operationsFactory.addToComponentList(this.props.skipBackendUpdate);
        let currentItem = this.props.setCurrnetItem&&{["current"+this.getCapitalFirstLetter(arr[0].getJson().type)]: arr[0]};
        let dispatchObj ={};
        if(this.props.isPopup){
           dispatchObj = {popupSwitch:"", currentPopupComponent:undefined}
        }
        this.dispatch({...dispatchObj, ...currentItem});


       
    }

   

}

