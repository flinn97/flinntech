import ThemeFactory from "./themes/themeFactory";
import FormFactory from "./formTypeFactory";
import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import InterfaceComponentBaseClass from "../templateTech/baseClasses/interfaceComponentBaseClass";

class FormComponentInterface extends BaseInterface {
    mainFunc=this.getFormComponent;
    
   
   
    /**
     
     * @returns factory for map items
     */
    getFactory() {
        if (this.factory === undefined) {
            this.factory = new FormFactory();
        }
        return this.factory;

    }

    /**
     * 
     * @returns theme factory for map items
     */
    getThemeFactory() {
        if (this.themeFactory === undefined) {
            this.themeFactory = new ThemeFactory();
        }
        return this.themeFactory;
    }
    getFormComponent(props, type) {

        type = type || "input";
        let form = this.factory.getComponent(type, props);
        return form;

    }



}


const formInterface = new FormComponentInterface()

//model
class ParentFormComponent extends InterfaceComponentBaseClass {
    constructor(props) {
        super(props);
        this.state = {
            type: "input"
        }
        this.interface= formInterface;
        
    }
  

}

class AddButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: "addButton"
        }
        
    }
}

class Button extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: props.buttonType||"baseButton"
        }
        
    }
}

class PopupButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: "popupButton"
        }
        
    }
}
class UpdateButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: "updateButton"
        }
        
    }
}
class RunButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: "runButton"
        }
        
    }
}

class UploadButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: props.uploadType||"upload"
        }
        
    }
} 
class DelButton extends ParentFormComponent{
    constructor(props) {
        super(props);
        this.state = {
            type: props.uploadType||"del"
        }
        
    }
} 

export { ParentFormComponent ,UploadButton, PopupButton, UpdateButton, RunButton, formInterface, FormComponentInterface, AddButton, Button, DelButton }

