import Page1 from './page1';
import Page2 from './page2';
import {db, auth, storage } from './firebase.config.js';
import * as MyComponents from './models/myComponents.js';
import AppBaseClass from './templateTech/baseClasses/AppBaseClass.js';
import Home from './view/home/home.js';
import TopicPopupContent from './view/popups/TopicPopupContent.js';
import TopicManager from './view/TopicManager/topicManager.js';
import MediaMover from './view/popups/mediaMover.js';
import MapMover from './view/popups/mapMover.js';
import TopicMover from './view/popups/topicMover.js';
import PinPopup from './view/popups/pinPopup.js';
import logo from "./logo.svg"
export default class App extends AppBaseClass {
  constructor(props){
    super(props, {db:db, endpoint:"gospelTopics", auth:auth, storage:storage});
    this.popupComponents={topic:TopicPopupContent, subTopic:TopicPopupContent };
    this.state={
      ...this.state,
      navBarProps:{logoURL:logo},
      routes:[
        {comp:Home, name: "home"},
        {comp:Page2, name: "page2"},
        {comp:Page1, compForId: Page1, name: "page1"},
        {path:"/topic", comp: TopicManager},
        {path:"/subTopic", comp: TopicManager}
      ],
      popups:[
      {content:MediaMover, popupSwitch:"imageMover", },
      {content:MapMover},
      {content:TopicMover},
      {content:PinPopup},
      ]
    }
    this.registerListWithFactory([...Object.values(MyComponents)])
  }
}