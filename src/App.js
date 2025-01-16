import Page1 from './page1';
import Page2 from './page2';
import {db, auth, storage } from './firebase.config.js';
import * as MyComponents from './models/myComponents.js';
import AppBaseClass from './templateTech/baseClasses/AppBaseClass.js';
import Home from './view/home/home.js';
import OemPopupContent from './view/popups/OemPopupContent.js';
import TopicManager from './view/TopicManager/topicManager.js';
import MediaMover from './view/popups/mediaMover.js';
import MapMover from './view/popups/mapMover.js';
import TopicMover from './view/popups/topicMover.js';
import PinPopup from './view/popups/pinPopup.js';
import logo from "./assets/eilogo.png"
import ISRandCampaignPopup from './view/popups/otherListPopup';
import { navInterface } from './navTech/navInterface';
import SettingsPopup from './view/home/settingsButton';
import EmailPopup from './view/popups/emailPopup';
import "./style.scss"
import PromoText from './view/home/promoText';

export default class App extends AppBaseClass {
  constructor(props){
    super(props, {db:db, endpoint:"EI", auth:auth, storage:storage});
    this.popupComponents={oem:OemPopupContent, isr:ISRandCampaignPopup, campaign: ISRandCampaignPopup, report:EmailPopup};
  this.popupComponentsProps={oem:{popupType:"Ei", popupTheme:"Popup"}, isr:{popupType:"Ei", popupTheme:"Popup"}, campaign:{popupType:"Ei", popupTheme:"Popup"}, report:{popupType:"Ei", popupTheme:"Popup"}}
    this.state={
      ...this.state,
      navBarProps:{logoURL:logo, type:"topBar", navMapProps:{mapSectionClass:"Map-Section-ei makeRelative"}},
      routes:[
        {comp:Home, name: "home"},
        // {comp:Page2, name: "page2"},
        // {comp:Page1, compForId: Page1, name: "page1"},
        // {path:"/topic", comp: TopicManager},
        // {path:"/subTopic", comp: TopicManager}
      ],
      popups:[
      {content:MediaMover, popupSwitch:"imageMover", },
      {content:MapMover},
      {content:TopicMover},
      {content:PinPopup},
      ]
    }
    this.registerListWithFactory([...Object.values(MyComponents)])
    let navList = navInterface.getNavList();
    navList.remove(1);
    navList.remove(1);
    let img = {type:"custom", custom:SettingsPopup, mapTheme:"topBar", wrapperStyle:{position:"absolute", right: "0px", width:"50px", top:"20px"}}
    let promo = {type:"custom", custom:PromoText, mapTheme:"topBar", wrapperStyle:{position:"absolute", left: "100px", width:"500px", top:"0px"}}
    if(window.innerWidth>850){    navList.add(promo);
    }

    navList.add(img);
  }
}