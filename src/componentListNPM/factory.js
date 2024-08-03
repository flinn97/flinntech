
/**
 * Create a factory that can add all the components
 */
class Factory {
    operationsFactory;

    factory ={
       

    }
        /**
     * 
     * @param register 
     * register any component to the factory
     */
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    /**
     * 
     * @param {*} operationsFactory 
     * allow the factory to have an operationsFactory
     */
    setOperationsFactory(operationsFactory){
        this.operationsFactory= operationsFactory
    }
    getRegistry(){
        return Object.keys(this.factory)
    }
 /**
     * 
     * @param obj 
     * @returns a new component from the data
     * Used to create raw data into class components to be used.
     */
    async getComponent(obj){
        
        
        if(Object.keys(this.factory).includes(obj.type)){
            let key = obj.type;
            let comp = new this.factory[key](this.operationsFactory);
            let nullValues = [undefined, "", false]
            if(nullValues.includes(obj._id)){
                obj._id=comp.getJson()._id;
            }
            comp.setCompState({...obj});
            return comp;
        }
        
        
        
        
    }
}
export default Factory;