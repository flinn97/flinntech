import BaseFactory from "./baseFactory";
import { formInterface, FormComponentInterface } from "../../formTech/FormComponentsInterface";
import { mapInterface, MapComponentInterface } from "../../mapTech/mapComponentInterface";
import { navInterface, NavInterface } from "../../navTech/navInterface";
import BaseClassFactory from "./baseClassFactory";
class InterfaceSingletonFactory extends BaseFactory{
    factory={form:formInterface, map:mapInterface, nav:navInterface};
   
}
class InterfaceCreationFactory extends BaseClassFactory{
    factory={form:FormComponentInterface, map:MapComponentInterface, nav:NavInterface}
}
const interfaceSingletonFactory= new InterfaceCreationFactory();
const interfaceCreationFactory = new InterfaceCreationFactory();

export {interfaceCreationFactory, interfaceSingletonFactory, InterfaceCreationFactory, InterfaceSingletonFactory, }