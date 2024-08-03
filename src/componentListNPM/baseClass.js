import binder from "../serviceTech/Util/binder";
/**
 * Create a base class the defines some basic functions and data
 */
export default class BaseClass {
    operationsFactory;
    dispatch;
    json = {
        _id: "",
        backendKeys: [],
        backendAttributes:[],
        backendFilterKeys:[],
        orderMatters: false,
        orderFilterKey: "",
        filterKey: "",
        removeOwnerQuery:[]


    };
    componentList;
    APIService;
    constructor(oppsFactory) {
        binder.bind(this);
        this.operationsFactory = oppsFactory;
        this.json._id = this.createId();
    }
    getAssociatedItemsHelper(index){
        
        let attribute = this.json._id;
        let filterKey = this.json.type + "Id"
        if(this.json.backendAttributes.length>0){
            attribute=this.json[this.json.backendAttributes[index]]
        }
        if(this.json.backendFilterKeys.length>0){
            filterKey=this.json.backendFilterKeys[index];
        }
        return {attribute, filterKey}
    }

    //do this not from the backend as well. 
    async getAssociatedItems(itemTypes) {
        
        itemTypes = itemTypes || this.json.backendKeys;
        
        const promises = itemTypes?.map((item, index) =>{
            let {attribute, filterKey} = this.getAssociatedItemsHelper(index);
            return this.componentList.getList(item, attribute, filterKey)

        }
        );
        return await Promise.all(promises);
    }

    //do this not from the backend as well. 
    async getAssociatedItemsFromBackend(itemTypes, listReq) {
        itemTypes = itemTypes || this.json.backendKeys;
        let owner = true;

        const promises = itemTypes?.map((item, index) =>{
            if(this.json.removeOwnerQuery.includes(item)){
                owner=false;
            }
            let {attribute, filterKey} = this.getAssociatedItemsHelper(index);
            return this.componentList.getComponentsFromBackend({type:item, ids:attribute, filterKeys:filterKey, owner:owner, ...listReq})
        }
           
        );
        return await Promise.all(promises);
    }


    setComponentList(l) {
        
        this.componentList = l;
        if (this.componentList.getAPIService) {
            
            this.setAPIService(this.componentList.getAPIService());
        }
        if (this.componentList.getDispatch) {
            this.setDispatch(this.componentList.getDispatch())
        }

    }
    setDispatch(d) {
        this.dispatch = d;

    }

    getDispatch() {
        return this.dispatch
    }
    getComponentList() {
        return this.componentList
    }
    setAPIService(service) {
        this.APIService = service

    }
    getAPIService() {
        return this.APIService
    }

    update(...args) {
        
        if(this.APIService){
            this.APIService.update([this], ...args);
        }
    }

    del(...args) {
        this.componentList.del(this, { ...args });
    }

    updateOrder(increment, key) {
        increment = increment || -1;
        if (increment === true) {
            increment = 1;
        }
        let list = this.componentList.getList(this.json.type, this.json[this.json.orderFilterKey], this.json.orderFilterKey);
        key = key || (this.json.orderKey ? this.json[this.json.orderKey] : "order");
        let thisCompIndex = list.indexOf(this);
        let nextComp;
        // Handle negative increment when at position 0 (move to the end of the list)
        if (increment < 0 && thisCompIndex === 0) {
            this.json[key] = list.length;

        }
        // Handle positive increment when at the end of the list (move to the beginning)
        else if (increment > 0 && thisCompIndex === list.length - 1) {
            this.json[key] = 0;
            this.componentList.shiftOrderedList(this, key);

        }
        else {
            nextComp = list[thisCompIndex + increment];
            nextComp.setCompState({ [key]: thisCompIndex }, { run: true, clean: true });
            this.json[key] = thisCompIndex + increment;


        }
        this.componentList.sortSelectedList(this.json.type, this.json.orderKey || "order");
        this.componentList.resetOrder(this, key);
        this.update();
    }

    prepare() {
        this.operationsFactory.prepare({ prepare: this })
    }

    setAttribute(key, val) {
        this[key] = val;
    }
    setAttributes(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }
    getAttribute(type) {
        return this[type]
    }

    getJsonAttribute(key) {
        return this.json[key]
    }

    /**
       * 
       * @param obj 
       * @param callBack 
       * Works exactly like setState in react only I include a function for a callback if needed
       */
    setCompState(obj, subscribe, dispatch, callBack) {
        this.subscribeToOperations(subscribe);
        this.json = { ...this.json, ...obj };
        if (dispatch) {
            this.dispatch({ updated: this });
        }

        if (callBack) {
            callBack(obj);
        }
        if (subscribe?.run) {
            this.operationsFactory.runOperations();
        }
    }

    /**
     * 
     * @returns operations factory for the class
     */
    getOperationsFactory() {
        return this.operationsFactory;
    }

    /**
    * 
    * @param json 
    * set the data
    */
    setJson(json, subscribe, dispatch, callBack) {
        this.subscribeToOperations(subscribe);
        this.json = json;
        if (dispatch) {
            this.dispatch({ updated: this });
        }
        if (callBack) {
            callBack(this);
        }
        if (subscribe?.run) {
            this.operationsFactory.runOperations();
        }
    }

    /**
    * get the data if to preserve private json var
    */
    getJson() {
        return this.json;
    }
    subscribeToOperations(subscribe) {
        if (subscribe) {
            this.operationsFactory.subscribeToOperations(subscribe.operation || this.update, subscribe.clean)
        }
    }

    copyJson(obj) {
        let newJson = {...this.json, _id: "", ...obj};
        return newJson;
    }
    copy(obj){
       let newJson = this.copyJson(obj);
       this.componentList.addComponents(newJson);
        
    }

    updateObjInsideJson(key, obj) {
        this.json[key] = { ...this.json[key], ...obj }
    }

    removeObjInsideJson(key, keys) {
        let ob = {};
        for (const k in this.json[key]) {
            if (!keys.includes(k)) {
                ob[k] = this.json[key][k]
            }
        }

        this.json[key] = ob;
    }
    randomFiveDigitNumber() {
        let num = Math.floor(Math.random() * 90000) + 10000;
        num = num.toString();
        let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        let randomPosition = Math.floor(Math.random() * 5);

        num = num.substring(0, randomPosition) + randomLetter + num.substring(randomPosition + 1);

        let randomagain = Math.floor(Math.random() * 2);
        if (randomagain === 1) {
            let randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Added let
            let randomPosition2;
            do {
                randomPosition2 = Math.floor(Math.random() * 5);
            } while (randomPosition2 === randomPosition); // Ensure different position for the second letter
            num = num.substring(0, randomPosition2) + randomLetter2 + num.substring(randomPosition2 + 1);
        }

        return num;
    }

    createId() {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);

        let num = this.randomFiveDigitNumber().toString() + month + day + year;
        return num;
    };
    createUUID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}