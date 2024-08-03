import binder from "../serviceTech/Util/binder";
import OperationsObserver from "./operationsObserver";

// import authService from "../services/auth.service";
export default class OperationsFactory {
    register;
    factory;
    operationsObserver;
    constructor(componentListInterface) {
        binder.bind(this);
        this.add = [];
        this.lastChange = []
        this.factory = componentListInterface.getFactory();
        this.operationsObserver = new OperationsObserver();

    }
    removeFromList(comp){
        this.add = this.add.filter(obj=> obj!==comp);
    }
    getOperationsObserver(){
        return this.operationsObserver;
    }
    setOperationsObserver(o){
        this.operationsObserver=o;
    }
    subscribeToOperations(f, clean){
        if(clean){
            this.operationsObserver.clear();
        }
        this.operationsObserver.subscribe(f)

    }
    runOperations(...args){
        this.operationsObserver.run(...args);
    }
    /**
 * Prepare one to many objects based upon JSON sent.
 * Params are {json: {your json}, amount:int} or an array of multiple of those
 * @param {*} obj 
 * @returns add list The updated register with the last changes.
 */
     async prepare(obj, callback) {
        
        let { prepare, amount, clean } = obj;
        amount = amount || 1;
        let arr = Array.isArray(prepare) ? prepare : [prepare];
        arr = arr.flatMap(json => Array(amount).fill(json));
    
        // Use Promise.all to wait for all promises to resolve
        let newArr = []
        for(let json of arr){
            let comp = await this.factory.getComponent({...json})
            newArr.push(comp);

        }
        arr =[...newArr];
        // arr = await Promise.all(arr.map(json => this.factory.getComponent({ ...json })));
    
        this.setAddList(clean ? [...arr] : [...this.add, ...arr]);
        if(callback){
            callback(this.add);
        }
        if(obj.run){
            
            await this.addToComponentList();
        }
        return this.add;
    }

    setAddList(addList) {
        this.add = [...addList];
        this.lastChange = [...this.add];
    }

    getAddList(){
        return this.add
    }


    getLastPrepare() {
        return this.lastChange
    }

    clear() {
        this.setAddList([]);
    }

    removeFromRegister(obj) {
        this.setAddList(this.add.filter(component => component !== obj))
    }
    run(skipBackendUpdate){
        this.addToComponentList(skipBackendUpdate)
    }
    addToComponentList(skipBackendUpdate) {
        let comps = [...this.add]; 
        this.clear();
        this.register(comps, {skipBackendUpdate:skipBackendUpdate});
        return comps
    }
    setRegister(r){
        this.register=r;
    }


   

}
/**
 * provide a way to subscribe to prepare
 */