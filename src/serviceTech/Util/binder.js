// Binder.js
class Binder {
    doNotInclude = ["render", "forceUpdate", "setState", ]
    bind(comp) {
        let proto = Object.getPrototypeOf(comp);
        while (proto && proto !== Object.prototype) {
            const methodNames = Object.getOwnPropertyNames(proto).filter(prop => {
                return typeof proto[prop] === 'function' && prop !== 'constructor';
            });
            for (let methodName of methodNames) {
                if(!this.doNotInclude.includes(methodName)){

                
                comp[methodName] = comp[methodName].bind(comp);
                }
            }
            proto = Object.getPrototypeOf(proto);
        }
    }
    setDoNotIncludeList(list){
        this.doNotInclude=list
    }
    leaveOut(str){
        this.doNotInclude.push(str);

    }
    include(str){
        this.doNotInclude= this.doNotInclude.filter(s=>s!==str);
    }
}

export default new Binder();