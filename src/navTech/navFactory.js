
import React from "react";
import NavMapContainer from "./navMapContainer";


/**
 * factory for getting different items for the map component
 */
export default class NavFactory {
    factory = {
        default:NavMapContainer
    }
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

//refactor this into a base factory