import BaseObserver from "../templateTech/observers/baseObserver";

export default class OperationsObserver extends BaseObserver{
    clear(){
        this.list=[];
    }
    cleanSubscibe(observerFunction){
        this.clear();
        this.subscribe(observerFunction)
    }
    run(...args){
        for(let observerFunction of this.list){
            if(observerFunction){
               observerFunction(...args)
            }
          }
          this.clear();
    }

}