import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import '../../cardTech/layouts.scss'
import '../../cardTech/page.scss'
import '../../cardTech/card.scss'
import '../../cardTech//colors.scss';
import Router from '../../linkTech/router.js';
import { Navbar, navInterface } from '../../navTech/navInterface.js';
import BaseComponent from './BaseComponent.js';
import ComponentListInterface from '../../componentListNPM/componentListInterface.js';
import { mapInterface } from '../../mapTech/mapComponentInterface.js';
import PopupCreater from '../../popupTech/popupCreationInterface.js';
import { formInterface } from '../../formTech/FormComponentsInterface.js';
import { cardInterface } from '../../cardTech/cardInteface.js';
import { appInterface } from '../appInterface.js';
import BaseRegistry from './baseRegistry.js';
class AppBaseClass extends BaseComponent {
  endpoint;
  db;
  storage;
  auth;
  popupComponents;
  popupComponentsProps;
  constructor(props, obj, components) {
    super(props);
    obj = this.props.config||obj
    this.popupComponents=this.props.popupComponents;
    this.componentListInterface = new ComponentListInterface(this.dispatch, obj.endpoint, obj.db, obj.storage, obj.auth);
    this.componentList = this.componentListInterface.createComponentList();
    this.factory = this.componentListInterface.getFactory();
    this.operationsFactory= this.componentList.getOperationsFactory();
    this.interfaceRegistry = new BaseRegistry();
    this.initialPropsSetupFunctions= [this.propogateApp,...this.initialPropsSetupFunctions]

    this.state = {
      componentList: this.componentList,
      componentListInterface: this.componentListInterface,
      operationsFactory:this.operationsFactory,
      factory: this.factory,
      theme:this.props.theme|| "default",
      pageClass:this.props.pageClass||"fullScreen",
      pageStyle:this.props.pageStyle,
      extraRouteKey: this.props.extraRouteKey||"extraRoutes",
      navBarProps: this.props.NavBarProps||{},
      popupFactory:PopupCreater.getFactory(),
      popups:this.props.popups||[],
      global:this.props.global||{},
      routes:this.props.routes||[]

    }
    if(components){
      this.registerListWithFactory(components)
    }
  }


  async checkForUser(){
    
    let user = await this.APIService.getCurrentUser();
    
    if(user){
      let loggedIn = await this.APIService.checkIfLoggedIn();
      
      if(loggedIn){
        this.APIService.getuser(user.email);
      }
    }
  }
  componentDidMount(){
    this.checkForUser();
  }

 


  registerListWithFactory(list) {
    
    for (let c of list) {
      
      let obj = new c();
      let type = obj.getJson().type;
      this.factory.registerComponents({ name: type, component: c });
      this.createPopupDefaultsByType(type);
      
    }
  }

  createPopupDefaultsByType(type){
    
    if(this.popupComponents?.[type] ){
      let str = this.getCapitalFirstLetter(type);
      let add = {content:this.popupComponents[type], popupSwitch:"add"+str, componentType:type};
      let update = {...add, popupSwitch:"update"+str}
      this.state.popups=[...this.state.popups, add, update]
    }

  }

  dispatch(obj) {
    obj = obj || {}
    this.setState({ ...obj })
  }

  setPopups(){
    
    for(let obj of this.state.popups){
      
      let t = obj.componentType;
      if(t){
        
        obj ={...obj, ...this.popupComponentsProps[t]}

      }
      if(!obj.popupSwitch){
        obj.popupSwitch = this.classNameToString(obj.content)
      }
      this.state.popupFactory.registerComponent(obj.popupSwitch, obj)

    }

  }


  propogateApp(){
    
    this.app = { state: this.state, dispatch: this.dispatch.bind(this), ...this.state.global}
    mapInterface.setAppComponent(this.app);
    formInterface.setAppComponent(this.app);
    cardInterface.setAppComponent(this.app);
    navInterface.setAppComponent(this.app);
    appInterface.setAppComponent(this.app);
  }

  getHtml(Content) {
    this.setPopups();
    let routes = [...this.state.routes];
    if(this.state[this.state.extraRouteKey]){
      routes = [...routes, ...this.state[this.state.extraRouteKey]]
    }
    return (
      <div className={this.state.pageClass} style={this.state.pageStyle} >
        <BrowserRouter>
          {PopupCreater.createPopupMachine({ app: this.app })}
          {/* {this.state.currentUser&& */}
          <Navbar  {...this.state.navBarProps} />
          {/* } */}
          {Content?<Content.content props={{...Content.props}} />:<></>}
          <Router routes={routes}/>
        </BrowserRouter>
      </div>
    );
  }
}

//template tech: global themes that effect everything.
//We should make it so that people can just import a css and it changes all the classes for everything globally.

export default AppBaseClass;
