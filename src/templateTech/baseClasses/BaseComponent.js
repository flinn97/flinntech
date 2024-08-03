
import React, { Component } from 'react';
import BaseObserver from '../observers/baseObserver';
import BuilderObserver from '../observers/builderObserver';
import binder from '../../serviceTech/Util/binder';
import { appInterface } from '../appInterface';

export default class BaseComponent extends Component {
  resize;
  constructor(props) {
    super(props);
    binder.bind(this);
    this.initialBuilderSetupFunctions = [];

    this.setInterface();
    this.setInitialApp();
    this.initialPropsSetupFunctions = [this.setInterface, this.setAppOnInterace, this.setInitialApp, this.setObj, this.setThemeFactory, this.setTheme, this.createReactRefsForComponents];
    this.setupObserver = new BaseObserver();
    this.builderObserver = new BuilderObserver();
    this.ObserverForSetupFunction = new BaseObserver();
    this.builderObserver.setComponent(this);
    this.builderObserver.setObserverFunction(this.setHtmlBuilderSingleton)
    this.initialSetupFunctions = [this.builderObserver.run, this.additionalSetup];
    this.components = [];



  }
  setInitialApp() {

    if (!this.interface) {
      this.app = this.props?.app;

    }
    let app = this.interface.getAppComponent();
    if (app) {
      this.app = app;
    }
    if (this.app) {
      this.propsState = this.app?.state;
      this.dispatch = this.app?.dispatch;
      this.componentList = this.propsState?.componentList;
      this.APIService = this.componentList?.getAPIService();
      this.operationsFactory = this.componentList?.getOperationsFactory()
    }


  }




  setInterface(i) {


    this.interface = i || (this.props?.interface || (this.interface || appInterface));

    if (this.interface.type = "appInterface" && this.subscribeToAppObserverBool === undefined) {
      this.subscribeToAppObserverBool = true;

      this.interface.subscribeToAppObserver(this.setInitialApp);

    }

  }

  setAppOnInterace() {

    if (this.interface) {
      if (this.props.app) {
        this.interface.setAppComponent(this.props.app);
      }
      this.app = this.interface.getAppComponent();
    }



  }

  setComponents(c) {
    this.components = c;
  }

  getComponents() {
    return this.components
  }


  createReactRefsForComponents() {
    for (let str of this.components) {
      if (!this[str + "Ref"]) {
        this[str + "Ref"] = React.createRef();
      }
    }
  }

  createPropObj(type, objType) {


    objType = objType || this.state.propType

    let json;
    let className = this[objType || "props"][type + "Class"]
    if(!className){
      className = this.theme&&typeof this.theme!=="string" ? this.theme[this.state[type + "Class"]] : (this["default"+type+"Class"]||"")

    }
    json = {
      name: type,
      ref: this[type + "Ref"],
      style: this[type + "Click"] ? { ...this[objType || "props"][type + "Style"], cursor: "pointer" } : this[objType || "props"][type + "Style"],
      className: className,
      content: this[objType || "props"][type],
      onClick: this[objType || "props"][type + "Click"] || this[type + "Click"],
      obj: this.obj

    }
    if (json.onClick) {
      json.onClick = json.onClick.bind(this, this.obj);
    }
    return json
  }
  builderPropsSubscribe(str) {
    this[str + "Props"] = this.createPropObj(str);
    this.builderObserver.subscribe(this[str + "Props"]);
  }

  setInitialBuilderPropFunctions() {

    for (let str of this.components) {
      if (!this["set" + str + "props"]) {
        this["set" + str + "props"] = this.builderPropsSubscribe(str);
      }
      this.initialBuilderSetupFunctions.push(this["set" + str + "props"])
    }
    return this.initialBuilderSetupFunctions
  }

  loadObserver() {
    this.setupObserver.setList(this.initialSetupFunctions);
  }

  setInitialSetupFunctions() {

    const combinedFunctions = [
      ...this.initialPropsSetupFunctions,
      ...this.initialBuilderSetupFunctions,
      ...this.initialSetupFunctions,
      this.additionalPostSetup
    ];

    // Use a Set to remove duplicates
    const uniqueFunctions = [...new Set(combinedFunctions)];

    this.initialSetupFunctions = uniqueFunctions;

    return this.initialSetupFunctions;

  }
  runInitialPropsSetup() {
    for (let f of this.initialPropsSetupFunctions) {
      if (f) {
        f();
      }
    }
  }

  /**
     * Allows for updating multiple objects with one form.
     * @param {*} obj 
     * @returns 
     */
  isArray(obj) {
    let arr = Array.isArray(obj) ? obj : [obj];
    return arr
  }

  setObj() {

    this.obj = this.props.obj
  }




  setThemeFactory() {
    if (this.interface !== undefined) {
      this.themeFactory = this.interface.getThemeFactory();

    }
  }
  setTheme() {
    
    if (this.themeFactory) {
      this.theme = this.themeFactory.getComponent(this.props?.theme || (this.state?.defaultTheme || "default"))

    }
  }

  clearLists() {


    this.setupObserver.setList([]);
    this.builderObserver.setList([]);
  }



  /**
   * need to setup an observer function for thi ssetupItem sometime.
   * @param  {...any} args 
   */
  setupItem(...args) {
    this.clearLists();
    this.preSetup();
    this.runInitialPropsSetup();
    this.setInitialBuilderPropFunctions();
    this.setInitialSetupFunctions();
    this.loadObserver();

    this.setupObserver.run(...args);

  }


  preSetup() { };


  setAttribute(type, val) {
    this[type] = val;

  }
  setHtmlBuilderSingleton(type, val) {
    if (!this[type]) {
      this[type] = val;
    }

  }

  getInnerContent() {
    return this.innerContent;
  }

  getAdditionalInnerContent() {
    return this.innerContent;
  }

  mapList(list) {
    return <>{list.filter(el => el !== undefined && el !== false).map((el) => { return el })}</>

  }
  additionalSetup() { }
  additionalPostSetup() { };

  mapInnerContent() {

    this.getInnerContent();
    this.getAdditionalInnerContent();
    this.innerContent = this.mapList(this.innerContent);
    return this.innerContent
  }

  getHtml() {
    return this.html;
  }




  /**
   * useful functions to have
   */
  getFactoryTypeString(str) {
    let list = this.propsState.componentListInterface.getFactory().getRegistry();
    let type = list.find(s => str.toLowerCase() === s);

    type = type || list.find(s => str.toLowerCase().includes(s))
    return type

  }
  getCapitalFirstLetter(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }

  classNameToString(c) {
    let className = c.name;
    let str = className.charAt(0).toLowerCase() + className.slice(1);
    return str
  }


  render() {

    this.setupItem();
    this.html = this.getHtml();

    return this.html
  }

}

