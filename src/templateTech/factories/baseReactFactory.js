
/**
 * factory for getting different items for the map component
 */
export default class BaseReactFactory {
    factory = {}



    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getComponent(type, props) {

        let Comp = undefined
        if (this.factory[type]) {
            Comp = this.factory[type]

        }
        
        return <Comp  {...props} />;

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerComponent(type, comp){
        this.factory[type] = comp
    }


}

