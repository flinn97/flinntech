import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import Card from "../cardTech/Card";

export default class PopupMachine extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    checkPopupSwitch(bool) {
        this.popupSwitch = this.props.popupSwitch || this.props.app?.state?.popupSwitch
        if (this.popupSwitch !== "" && this.popupSwitch !== undefined) {
            bool = true;
        }
        return bool
    }

    checkType(bool) {
        let component = this.props.currentPopupComponent || this.props.app?.state?.currentPopupComponent;
        let type = this.popupFactory.getComponent(this.popupSwitch)?.componentType;

        if (type) {
            
            
            component = this.isArray(component);
                bool=component[0]?.getJson()?.type === type && component.length>0;
            
        }
        return bool
    }
    render() {
        

        let displayPopup = this.checkPopupSwitch(false);
        if(displayPopup){
            displayPopup = this.checkType(displayPopup);
        }
        
        this.popupFactory = this.props.factory||this.props.app.state.popupFactory;

        let component = this.popupFactory?.getComponent(this.popupSwitch)


        return (
            <>{displayPopup && component?.content &&<Card  content={<component.content />} popup={true} type={component.popupType||'biggerCard'} theme={component.popupTheme||'Default'} handleClose={()=>{
                if(component.handleClose){
                    component.handleClose()
                }
                else{
                    
                    let currentComponent=this.props.app.state.currentPopupComponent;
                    if(currentComponent){
                        this.props.app.state.operationsFactory.removeFromList(currentComponent)

                    }
                    this.props.app.dispatch({currentPopupComponent:undefined, popupSwitch:undefined});

                }
            }}/>}</>
                )
    }
}