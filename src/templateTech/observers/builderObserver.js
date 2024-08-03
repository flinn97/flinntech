import BaseObserver from "./baseObserver";
import HtmlBuilderBaseClass from "../baseClasses/HtmlBuilderBaseClass";

class BuilderObserver extends BaseObserver {
  component;
  setAttribute;
  setObserverFunction(f){
    this.setAttribute=f

  }
  setComponent(c){
    this.component= c;
  }
  getComponent(){
    return this.component
  }
  // Method to run all subscribed functions
   run() {
    
    for(let obj of this.list){
     
       this.setAttribute(obj.name, new HtmlBuilderBaseClass(obj))
    }
  }
}

export default BuilderObserver;