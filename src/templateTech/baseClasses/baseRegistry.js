
class BaseRegistry{

    registry={};
    getRegistry(){
        return this.registry
    }
    addToRegistry(type, item){
        this.registry[type]=item;
    }
    getItemFromRegistry(type){
        return this.registry[type];
    }
}
export default BaseRegistry