import React from 'react';
import MapComponentItem from '../mapComponent';


//this could be updated to use the baseclass getHtml
export default class InteractiveMap extends MapComponentItem {
  constructor(props) {
    super(props);

    this.mapContainer = React.createRef();
    this.initialPropsSetupFunctions = [...this.initialPropsSetupFunctions, this.getPicObj, this.getAddComponentButton]


    this.state = {
      ...this.state,
      index:0,
      isDragging: undefined,
      defaultTheme:"interactiveMap"

    }
  }
  _addEventListeners(){
    let props = this.props;
    let saveList = []
    
    for (let obj of this.list) {
      let listItem = document.getElementById(obj.getJson()._id);

      listItem.addEventListener("mousedown", (e) => {
        
        this.setState({ isDragging: listItem });
      });
      listItem.addEventListener("mouseup", (e) => {
        this.setState({ isDragging: undefined });
        // const containerRect = this.mapContainer.current.getBoundingClientRect();
        // Calculate relative x and y
        // const x = e.pageX - containerRect.left - 25;
        // const y = e.pageY - containerRect.top - 25;
        // console.log("x:", x);
        // console.log("y:", y)
      });

      saveList.push(listItem);
      this.setState({ saveList: saveList })
    }
    if (this.mapContainer?.current) {
      this.mapContainer.current.addEventListener("mouseup", (e) => {
        if(this.currentComp!==undefined){
          this.currentComp.update();
        }
        this.setState({ isDragging: undefined });
      });
      this.mapContainer.current.addEventListener("mousemove", (e) => {
        if (this.state.isDragging !== undefined) {
          
          let el = this.state.isDragging;
          let id = el.id;
          let comp = this.list.find(obj => obj.getJson()._id === id);
          if (comp?.getJson().draggable !== false) {
            // Get the position of the container
            const containerRect = this.mapContainer.current.getBoundingClientRect();

            // Calculate relative x and y
            const x = e.pageX - containerRect.left - 25;
            const y = e.pageY - containerRect.top - 25;
            comp.setCompState({x:x, y:y});
            this.currentComp = comp;

            

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
          }


        }

      })

    }
  }


  componentDidMount() {
    this._addEventListeners();
  }

  zoom(num) {
    
    let containerRect = this.mapContainer.current.getBoundingClientRect();
    let width = containerRect.width * num;
    let height = containerRect.height * num;
    this.mapContainer.current.style.width = width + "px";
    this.mapContainer.current.style.height = height + "px";

    let list = this.state.saveList;
    for (let el of list) {
      // Get the current style values
      const currentLeft = el.style.left || '0';
      const currentTop = el.style.top || '0';

      // Extract the numeric values using regex
      const leftMatch = currentLeft.match(/(-?\d*\.?\d+)/);
      const topMatch = currentTop.match(/(-?\d*\.?\d+)/);

      // Parse the values or use 0 if not found
      const leftValue = leftMatch ? parseFloat(leftMatch[0]) : 0;
      const topValue = topMatch ? parseFloat(topMatch[0]) : 0;

      // Multiply the values
      const newLeft = leftValue * num;
      const newTop = topValue * num;

      // Update the style attributes
      el.style.left = newLeft + "px";
      el.style.top = newTop + "px";
    }


  }

  componentDidUpdate(props, state) {
    if (this.props.list.length !== props.list.length) {
      this._addEventListeners();
    }
  }

  getAddComponentButton(){
    
    this.addComponentButton = this.props.addComponentButton;
    if (this.addComponentButton !== undefined) {
      let type = typeof this.addComponentButton === "string"?this.addComponentButton: (this.addComponentButton.type||"addComponentButton");
      let addType = this.props.pinKey||(this.mapObj?.getJson().pinType||"pin");
      this.addComponentButton = this.factory.getComponent(type, {
         ...this.props,
         theme:this.props.theme||this.state.defaultTheme, 
         mapId: this.mapObj ? this.mapObj?.getJson()._id : undefined, 
         addType: addType, 
         addPinProps:this.props.addPinProps, 
         pinAdded:this._addEventListeners 
        })
    }
  }

  getPicObj(){
      let attribute= this.props.imgAttribute||"picURL"
      if (this.mapObj) {
        this.picSrc = this.mapObj?.getJson()[attribute]
      }
  }

  preSetup() {
    this.setComponents([]);
  }

  async changePic(index){

    let mapList = this.props.list;
    index= index<0?index=mapList.length-1:index;
    index=index>=mapList.length? 0:index;
    this.mapObj= mapList[index];
    await this.setState({index:index});
    this._addEventListeners();
  }

  setList(){
    if(!this.listSet){
      
      let mapList = this.props.list;
      let map = mapList[this.state.index];
      this.mapObj=map;
      let type = this.props.pinKey||(map?.getJson().pinType||"pin");
      let attribute = this.props.pinAttribute||(map?.getJson().type+"Id"||"mapId");
      let id = this.props.mapId||map?.getJson()._id;
      this.list=this.componentList.getList(type, id, attribute);
    }
  }

  preSetup() {
    this.setComponents(["mapContainer", "right", "left", "image", "zoomIn", "zoomOut", ]);
  }
  getIndexAndChangeMap(i){
    
    let num = this.props.list.indexOf(this.mapObj)+i;
    this.changePic(num);
  }

  getListHtml() {
    let props = this.props;
    let theme = this.theme;
    let factory = this.factory;
    return (<>{this.list.map((obj, index) => {
      let p = { 
        obj: obj, 
        props: props, 
        interface: this.interface, 
        cell: props.pinCell, 
        theme: this.props.them||this.state.defaultTheme, 
        pinProps:this.props.pinProps 
      }
      
      return (<div id={obj.getJson()._id} className={props.mapSectionClass ? props.mapSectionClass : theme.MCMapSection} style={{ ...props.mapSectionStyle, left: obj.getJson().x + "px", top: obj.getJson().y + "px" }} key={index}>
        <>{factory.getComponent(props.pinType ? props.pinType : "attribute", p)}</>
      </div>)
    }

    )}</>)
  }




  getHtml() {
    if(this.props.list.length>0){

    
    let props = this.props;
    let theme = this.theme;

    return (
      <div ref={this.mapContainer} className={props.mapContainerClass ? props.mapContainerClass : theme.MCMapContainer} style={{ ...props.mapContainerStyle }}>
        <img src={this.picSrc} className={props.mapClass ? props.mapClass : theme.MCMap} style={{ ...props.mapStyle }} />
        {this.getListHtml()}
        {props.addComponentButton && <>{this.addComponentButton}</>}
        <div style={{ position: 'absolute', top: "0px", right: "0px" }} onClick={() => { this.zoom(.5) }}>zoom out</div>
        <div style={{ position: 'absolute', top: "20px", right: "0px" }} onClick={() => { this.zoom(2) }}>zoom in</div>
        <div style={{ position: 'absolute', top: "0px", left: "-20px" }} onClick={() => { this.getIndexAndChangeMap(-1)}}>prev</div>
        <div style={{ position: 'absolute', top: "20px", right: "-20px" }} onClick={() => { this.getIndexAndChangeMap(1) }}>next</div>
      </div>

    )
  }
  else{
    this.list = [];
  }
}
}


