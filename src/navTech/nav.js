import Card from '../cardTech/Card';
import Menu from './menu';
import { MapComponent } from '../mapTech/mapComponentInterface';
class Nav extends Card{
  constructor(props){
    super(props);
    this.state={...this.state, defaultType:this.props.type?this.props.type:"sideBar", typeKey:"layout", defaultNavType:"default", phoneSize:850, left:-400}

    
  }
  getProps(){
    
    return { mapTheme:this.props.mapTheme||this.state.defaultType, links:this.props.links||this.props.app?.state?.routes, ...this.props}
  }

  getFactoryComponent(props){
    
    let type =this.props.mapType?this.props.mapType:this.state.defaultNavType;
    let factory = this.props.factory;
    let navComponent = factory.getComponent(type, props)
    return navComponent
  }

  componentDidMount(){
    if(this.resize!==undefined){
    window.addEventListener("resize", this.resize)
    this.resize();
    }
  }
  componentWillUnmount(){
    if(this.resize!==undefined){
    window.removeEventListener("resize", this.resize)
    }
  }
  resize(){

    if(window.innerWidth<850){
      
      this.setState({phone:true,tablet:false, defaultType:this.props.phoneLayout?this.props.phoneLayout:this.state.ogType?this.state.ogType:this.state.defaultType, ogType:this.state.ogType?this.state.ogType:this.state.defaultType });
      return
    }
    if(window.innerWidth<1224){
      
      this.setState({phone:false, tablet:true, defaultType:this.props.tabletLayout?this.props.tabletLayout:this.state.ogType?this.state.ogType:this.state.defaultType, ogType:this.state.ogType?this.state.ogType:this.state.defaultType});
      return
    }
    if(window.innerWidth>1224){
      
      if(this.state.phone){
        this.setState({phone:false, defaultType:this.state.ogType})
      }
      if(this.state.tablet){
        this.setState({tablet:false, defaultType:this.state.ogType})
      }
    }

    
  }
  async setStyleOnMenuClick(i){
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    this.card.setStyle({...this.card.getStyle(), left:i.toString()+"px"})
    await this.setState({left:i});
    await delay(10);
  }
  async setNavOpenClose(){

    if(this.state.left===-400){
    for(let i =-400; i<600; i=i+15){
      if(i>0){
        this.setState({left:0})
        break;
      }
      await this.setStyleOnMenuClick(i);

    }}
    else{
      for(let i =0; i>-450; i=i-15){
        if(i<-400){
          this.setState({left:-400});
          break;
        }
        await this.setStyleOnMenuClick(i);

      }
    }
  }

  async openCloseLinks(){

    let linkContainer = <MapComponent list={this.props.links||this.props.app?.state?.routes} cells={[{type:"link", }]}/>
    let card = <Card content={linkContainer} />
    return card
  }

  async openCloseNavFun(){
    
    let funcs ={
      topBar:this.openCloseLinks,
      sideBar:this.setNavOpenClose
    }
    let openOrClose = await funcs[this.state.defaultType]();
    return openOrClose;
  }


  getMenu(){
    let menu = this.props.menuComponent?<this.props.menuComponent {...this.props.menuComponentProps} open={this.openCloseNavFun}  type={this.state.defaultType}/>: <Menu open={this.openCloseNavFun}  type={this.state.defaultType} {...this.props.menuComponentProps}/>
    return menu
  }



  getContent(){
    
    let props = this.getProps();
    let navComponent=this.getFactoryComponent(props)
    
    
    this.content = <>{navComponent}<>{(this.state.phone ||window.innerWidth<this.state.phoneSize)&& <>{this.getMenu()}</>}</></>
    return this.content
  }
  


}
  


export default Nav;
