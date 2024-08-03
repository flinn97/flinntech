class BaseFactory{
    factory={};
    getComponent(type){
        return this.factory[type];

    }
    registerComponent(type, str){
        this.factory[type]=str
    }
}
export default BaseFactory