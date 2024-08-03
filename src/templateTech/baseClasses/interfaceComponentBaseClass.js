import BaseComponent from "./BaseComponent";

export default class InterfaceComponentBaseClass extends BaseComponent {
    addToProps = {};
    addToInitialSetup=[];
    getterFunc = undefined;
    constructor(){
        super();
        this.state={}
    }

    getProps() {
        let props = { interface: this.interface, app: this.app, theme: this.props.theme, type: this.props.type, ...this.props, ...this.addToProps }
        return props
    }

    setComponentList() {
        
        this.componentList = this.interface?.getComponentList();

    }
    setProps(){

    }
    getHtml() {
        
        this.setProps();
        let props = this.getProps();
        this.setGetterFunc(this.props.getterFunc);
    
        if (this.getterFunc) {
            this.html = this.getterFunc({ ...props }, props.type || this.state.type)
        }
        return <>{this.html}</>
    }

    setGetterFunc(f){
        this.getterFunc= f||(this.interface.getMainFunc()||this.getterFunc )
    }
    addToFactory(){
        if(this.props.addToFactory){
            let factory = this.interface.getFactory();
            for(let obj of this.props.addToFactory){
                factory.registerComponent(obj.type, obj.comp);
            }
        }
    }

    preSetup() {
        this.componentPreSetup();
        this.initialSetupFunctions = [...this.initialSetupFunctions, this.setComponentList, this.addToFactory, ...this.addToInitialSetup]
    }

    componentPreSetup(){


    }
}