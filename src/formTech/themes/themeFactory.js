import * as Registry from "./classRegistry";
import BaseClassFactory from "../../templateTech/factories/baseClassFactory"
/**
 * factory for getting different themes for the map component
 */
export default class ThemeFactory extends BaseClassFactory {

    constructor(){
        super(Registry);
        this.factory.default = Registry.DefaultRegistry
    }


}

