import NavFactory from "./navFactory";
import Nav from "./nav";
import NavList from "./navList";
import binder from "../serviceTech/Util/binder";
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import InterfaceComponentBaseClass from "../templateTech/baseClasses/interfaceComponentBaseClass";

class NavInterface extends BaseInterface{
    factory;
    navList;
    constructor(){
        super();
        binder.bind(this);
        this.getFactory();
        this.getNavList();
        this.mainFunc= this.getNav
    }
    getFactory(){
        if(!this.factory){
            this.factory= new NavFactory();
        }
        return this.factory
    }
    getNav(props){
        return <Nav  factory={this.factory} navInterface={this} navList={this.navList} {...props}/>
    }
    getNewNavList(){
        let navList = new NavList();
        return navList
    }
    
    setNavListForce(navList){
        this.navList=navList
    }
    getNavList(){
        if(!this.navList){
            this.navList=this.getNewNavList();
        }
        return this.navList;
    }
    
}
const navInterface = new NavInterface();



class Navbar extends InterfaceComponentBaseClass {
    constructor(props){
        
        super(props);
        
        this.interface= navInterface;
    }

}

export {navInterface, NavInterface, Navbar}