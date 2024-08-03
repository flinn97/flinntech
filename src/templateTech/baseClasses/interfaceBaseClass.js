import binder from "../../serviceTech/Util/binder";
import BaseObserver from "../observers/baseObserver";


class BaseInterface {
    factory;
    componentList;
    themeFactory;
    appComponent;
    mainFunc;
    appObserver=new BaseObserver();
    constructor() {
        binder.bind(this);
        this.getFactory();
        this.getThemeFactory();

    }
    subscribeToAppObserver(func){
        this.appObserver.subscribe(func);
    }
    getMainFunc(){
        return this.mainFunc
    }
    getFactory(){}
    getThemeFactory(){}
   

    
    getAppComponent() {
        return this.appComponent

    }
    setAppComponent(APP) {
        this.appComponent = APP;
        this.appObserver.run(APP);
    }


    getComponentList() {
        if (!this.componentList) {
            this.componentList = this.appComponent?.state?.componentList;

        }
        return this.componentList
    }


}





export default BaseInterface 

