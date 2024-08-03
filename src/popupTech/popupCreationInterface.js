import binder from "../serviceTech/Util/binder"
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import PopupContentFactory from "./popupContentFactory";
import PopupMachine from "./popupMachine";

 class PopupCreater extends BaseInterface{
    factory
    constructor(){
        super();
        binder.bind(this);
        this.getFactory()
    }
    getFactory(){
        if(!this.factory){
            this.factory = new PopupContentFactory();
        }
        return this.factory;
    }
    createPopupMachine(props){
        return <PopupMachine app ={props?.app||this.getAppComponent()} factory = {this.factory} />

    }
}


export default new PopupCreater()