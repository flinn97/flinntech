import binder from "../serviceTech/Util/binder";
import BaseObserver from "../templateTech/observers/baseObserver";


export default class ComponentList {
    /**
     * Set components 
     * Add an easy way to access lists of components
     */
    components = [];
    dispatch;
    backArray = {};
    operationsFactory;
    componentListInterface;
    componentsList = {};
    completionObserver = new BaseObserver()
    factory;
    APIService;
    constructor(componentListInterface) {
        binder.bind(this);
        this.operationsFactory = componentListInterface.getOperationsFactory();
        this.operationsFactory.setRegister(this.add);
        this.componentListInterface = componentListInterface;
        this.factory = componentListInterface.getFactory();
        this.dispatch = componentListInterface.dispatch;
        this.APIService = componentListInterface.getAPIService();
        this.APIService.setComponentList(this);
        this.completionObserver.subscribe(this.setComponentsList);
        this.completionObserver.subscribe(this.setOrderAfterAddorDel);




    }
    getFactory(){
        return this.factory
    }

    getDispatch(){
        return this.dispatch;
    }

    setDispatch(d){
        this.dispatch=d;
    }

    getCompletionObserver() {
        return this.completionObserver;
    }
    setCompoletionObserver(o) {
        this.completionObserver = o
    }
    subscribeToOperationCompletion(f) {
        this.completionObserver.subscribe(f);
    }
    getAPIService() {
        return this.APIService;
    }
    setAPIService(service) {
        this.APIService = service;
    }

    /**
 * 
 * @returns all the components inside the tech
 */
    getComponents() {
        return this.components
    }
    filterOutErrors(arr) {

        let ids = this.components.map(obj => obj.getJson()._id);

        // Iterate over the array and update the JSON of matching components
        arr = arr.map(obj => {
            if (ids.includes(obj.getJson()._id)) {
                let savedComponent = this.components.find(comp => comp.getJson()._id === obj.getJson()._id);
                obj.setJson({
                    ...savedComponent.getJson(),
                    ...obj.getJson()
                });
            }
            return obj;
        });
        arr = arr.filter(obj => !ids.includes(obj.getJson()._id));

        let registry = this.factory.getRegistry();
        arr = arr.filter(obj => registry.includes(obj.getJson().type))
        return arr;
    }



    /**
     * 
     * @param arr of components to add
     * add one to many components into the list
     * 
     */
    add(arr, obj,) {
        
        arr = Array.isArray(arr) ? arr : [arr];
        arr = this.filterOutErrors(arr);
        arr.forEach(comp => { 
            comp.setComponentList(this)
        });

        this.components = [...this.components, ...arr];

        return this.operationComplete(arr, "add", obj);


    }
    /**
         * if this is a new type of component that has never been added before add a new array.
         * Otherwise add it to the current array
         */
    setComponentsList() {
        let tempcomps = {};
        let registry = this.componentListInterface.getFactory().getRegistry();
        registry.forEach(str => { tempcomps[str] = [] });
        for (let obj of this.components) {
            let type = obj.getJson().type;
            tempcomps[type].push(obj);
        }
        this.componentsList = tempcomps;
    }

    /**
     * the way this works from the backend we may have a problem with the async stuff on this side.
     * @param {*} obj 
     */
    async addComponents(obj, skipBackendUpdate) {
        if (!obj.prepare) {
            let arr = Array.isArray(obj) ? obj : [obj];
            obj = { prepare: arr }
        }
        


        await this.operationsFactory.prepare({ ...obj });
        this.operationsFactory.addToComponentList(skipBackendUpdate);


        let checkIds = obj?.prepare.map(o => o._id);
        let comps = await this.components.filter((comp) => checkIds.includes(comp.getJson()._id));
        return comps
    }

    /**
     * 
     * @param arr of components to add
     * delete one to many components into the list
     * 
     */
    del(arr, obj) {
        arr = Array.isArray(arr) ? arr : [arr];
        this.components = this.components.filter(obj => !arr.includes(obj))
        return this.operationComplete(arr, "del", obj)
    }


    setOrderAfterAddorDel(arr) {
        
        for (let obj of arr) {
            let json = obj.getJson();
            if (json.orderMatters) {
                
                let list = this.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
                let key = json.orderKey ? json[json.orderKey] : "order";
                let val = obj.getJson()[key];
                let oFilter = list.filter(comp => {
                    
                    let val1 = parseInt(comp.getJson()[key]);
                    val = parseInt(val);
                    return val1===val
                });
                let o = oFilter.find(comp => !arr.includes(comp));
                let objIndex = list.indexOf(obj);
                if (o && o !== obj) {
                    obj.setCompState({ [key]: objIndex });
                }
                this.sortSelectedList(json.type, json.orderKey || "order");
                this.resetOrder(obj, key);
            }
        }
    }

    shiftOrderedList(obj, key){
        let json = obj.getJson();
        this.sortSelectedList(json.type, json.orderKey || "order");
        let list = this.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
        key = key ||(json.orderKey ? json[json.orderKey] : "order");
        list = list.filter(o=> o!==obj);
        
        for(let i = 1; i<list.length; i++){
            let o = list[i-1];
            o.setCompState({[key]:i},{run: true, clean: true })
        }
    }

    resetOrder(obj, key){
        let json = obj.getJson();
        key = key||(json.orderKey ? json[json.orderKey] : json.order);
        let list = this.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
        for (let i = 0; i < list.length; i++) {
            if (list[i][key] !== i ) {
                list[i].setCompState({ [key]: i });
                if(list[i]!==obj){
                    list[i].update();
                }
            }
        }
    }

    operationComplete(arr, type, obj) {
        this.completionObserver.run(arr, type, obj);
        this.backArray = { [type]: arr }
        if (!obj.skipBackendUpdate) {
            this.updateBackend(arr, type, obj);
        }
        return arr;
    }

    updateBackend(arr, type, obj) {
        this.dispatch({ backend: true, backendUpdate: { ...this.backArray } });
        let params = [obj.path, obj.dispatchKey,];
        if (type === "add") {
            params.push(obj.timeKey);
        }

        this.APIService[type](arr, ...params);
        this.backArray = {}
    }

    getOperationsFactory() {
        return this.operationsFactory;
    }

    createQueryJson(type, ids, filterKeys, obj) {
        obj = obj || {};
        if(filterKeys===undefined&&ids){
            filterKeys="_id"
        }
        ids = Array.isArray(ids) ? ids : [ids];
        
        filterKeys = Array.isArray(filterKeys) ? filterKeys : [filterKeys];


        let json = {
            where: [
                { attribute: "type", val: type },
            ],
            ...obj
        }
        if (ids) {
            json.where = [...json.where, ...ids?.map((id, index) => { return { attribute: filterKeys[index], val: id } })]
        }
        return json

    }

    /**
     * type, ids = [], filterKeys = [], obj = {}, path = '', snapshot = false, owner
     * @param {*} listReq 
     * @returns 
     */
    async getComponentsFromBackend(listReq, owner) {
        if(typeof listReq ==="string"){
            listReq= {type:listReq, owner:owner===false?owner:true}
        }
        let json = await this.createQueryJson(listReq.type, listReq.ids, listReq.filterKeys, listReq.obj);

        let backendList = await this.APIService[listReq.snapshot ? "firebaseGetterSnapshot" : "firebaseGetter"](json, listReq.path, listReq.owner);

        return backendList;


    }

 /**
  * type, ids = [], filterKeys = [], obj = {}, path = '', snapshot = false, owner
  * @param {*} compReq 
  * @returns 
  */
    async getComponentFromBackend(compReq) {
        let comp = await this.getComponentsFromBackend(compReq);
        return comp[0]


    }


    /**
 * Filters a list based on the given ids and filterKeys.
 * 
 * @param {string} type - The name of the list to filter.
 * @param {string|string[]} [ids] - The id or ids to filter by.
 * @param {string|string[]} [filterKeys="owner"] - The key or keys to filter on.
 * @returns {Array} - The filtered list or the full list if no ids are provided.
 */
    getList(type, ids, filterKeys) {
        filterKeys = filterKeys || "owner"
        type = Array.isArray(type)?type:[type];
        let items =  [];
        
        for(let t of type){
            let list = this.componentsList[t]||[]
            items = [...items, ...list]
        }



        // Convert ids and filterKeys to arrays if they are not already
        if (!Array.isArray(ids)) {
            ids = ids ? [ids] : [];
        }
        if (!Array.isArray(filterKeys)) {
            filterKeys = [filterKeys];
        }

        if (ids.length > 0) {
            items = items.filter((item) => {
                return filterKeys.some((filterKey, index) => {
                    const data = item.getJson()?.[filterKey];
                    const id = ids[index] || ids[0]; // Use the corresponding id or fallback to the first id
                    return typeof data === 'object' ? Object.keys(data).includes(id) : data === id;
                });
            });
        }

        return items;
    }

    /**
     * 
     * @param type 
     * @param id 
     * @param filterKey 
     * @returns a component of what was asked for with the default being the the first component in the list.
     */
    //     type   id  filter
    //     User, ownerid 
    getComponent(type, id, filterKey,) {
        let list = this.getList(type, id, filterKey || "_id")
        return list[0];
    }


    clearList() {
        this.components = [];
        this.componentsList = {};
    }
    clearSelectedList(id, filterKey,) {
        let temp = [...this.components];
        let arr = []
        for (const key in temp) {
            if (temp[key].getJson()[filterKey] !== id) {
                arr.push(temp[key]);
            }
        }

        this.components = [...arr];
        this.setComponentsList();
    }
    setComponentList(list) {
        this.componentsList = list
    }

    setSelectedList(type, list) {
        this.componentsList[type] = list;

    }

    sortSelectedList(type, filterKey, reverse) {
        if (!filterKey) {
            return;
        }
        if (this.componentsList[type]) {
            let list = [...this.componentsList[type]];

            list = list.sort(function (a, b) {
                // Attempt to convert string values to numbers for comparison
                const aValueRaw = a.getJson()[filterKey];
                const bValueRaw = b.getJson()[filterKey];
                const aValue = isNaN(Number(aValueRaw)) ? aValueRaw : Number(aValueRaw);
                const bValue = isNaN(Number(bValueRaw)) ? bValueRaw : Number(bValueRaw);

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    // Compare as numbers
                    return reverse ? bValue - aValue : aValue - bValue;
                } else {
                    // Fallback to string comparison
                    if (reverse) {
                        return ('' + bValue).localeCompare('' + aValue);
                    } else {
                        return ('' + aValue).localeCompare('' + bValue);
                    }
                }
            });
            this.setSelectedList(type, list);
        }
    }


    sortSelectedListbyFirebaseDate(type, reverse) {
        if (this.componentsList[type]) {
            let list = [...this.componentsList[type]];

            list = list.sort(function (a, b) {
                //
                //THIS MIGHT MAKE ORDER SWITCHING WEIRD
                let aD = a.getJson().date || a.getJson().date !== "" ? a.getJson().date?.seconds : new Date(0);
                let bD = b.getJson().date || b.getJson().date !== "" ? b.getJson().date?.seconds : new Date(0);
                return reverse ?
                    (bD - aD)
                    :
                    (aD - bD);
            })
            this.setSelectedList(type, list);
        }


    }


}

/**
 * potential Refactors:
 * 1. consider connecting a different listener to the backend strategy.
 * 2. consider not a singleton operations factory.
 */