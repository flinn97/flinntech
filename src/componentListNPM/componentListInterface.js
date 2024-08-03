import Factory from "./factory";
import OperationsFactory from "./operationsFactory";
import ComponentList from "./componentsList";
import binder from "../serviceTech/Util/binder";
import Auth from "../serviceTech/APITech/auth.service";

export default class ComponentListInterface{
    factory;
    updater;
    operationsFactory;
    dispatch;
    APIService;
    constructor(dispatch, endpoint, db, storage, auth){
        binder.bind(this);
        this.dispatch=dispatch;
        this.getFactory();
        this.getAPIService(endpoint, db, storage, auth, dispatch);
        
    }

    getFactory(){
        
        if(this.factory===undefined){
            this.factory= new Factory(this);
        }
        return this.factory;
    }

    getAPIService(endpoint, db, storage, auth, dispatch){
        if(this.APIService===undefined){
            this.APIService= new Auth(endpoint, db, storage, auth, dispatch);
        }
        return this.APIService

    }
    createComponentList(){
        
        return new ComponentList(this)
    }
    getOperationsFactory(){
        
        if(this.operationsFactory===undefined){
            this.operationsFactory= new OperationsFactory(this);
            
            this.factory.setOperationsFactory(this.operationsFactory);
        }
        return this.operationsFactory;
    }

    getNewOperationsFactory(){
        
            let opps= new OperationsFactory(this);

        return opps;
    }


}