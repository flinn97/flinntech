import binder from "../../serviceTech/Util/binder";

/**
 * factory for getting different themes for the map component
 */
export default class BaseClassFactory {
    factory = {
    }
    constructor(registry){
        binder.bind(this);
        if(registry){
            this.registry=registry;
            this.registerListWithFactory();
        }
    }

    

    registerListWithFactory() {
        for (const key in this.registry) {
            if (this.registry.hasOwnProperty(key)) {
                const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
                this.factory[lowerCaseKey] = this.registry[key];
            }
        }
      }



    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getComponent(type) {
        
        let comp = undefined
        if (this.factory[type]) {
            comp = new this.factory[type]()

        }
        return comp;

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerComponent(type, comp){
        this.factory[type] = comp
    }


}

