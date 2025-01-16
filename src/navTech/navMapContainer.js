import { MapComponent } from '../mapTech/mapComponentInterface';
import BaseComponent from '../templateTech/baseClasses/BaseComponent';
class NavMapContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.initialPropsSetupFunctions=[...this.initialPropsSetupFunctions, this.getNavLists]

    this.state = {
    }
  }
  getLinks() {
    return this.props.links ? this.props.links : this.props.app?.state?.routes
  }
  getDefaultNavItem(type) {
    let typeObs = {
      logo: { imgSrc: this.props.logoURL, label: this.props.logoLabel, ...this.props },
      links: { links: this.getLinks(), ...this.props, class:"fit" },
      logout: { logoutFunc: this.props.logoutFunc, auth: this.props.auth, wrapperClass:"SB-logout", ...this.props }
    }
    return (typeObs[type])
  }

  getList() {
    

    let navList = this.props.navList
    let list = navList.getList();

    for (let i = 0; i < list.length; i++) {
      if (list[i].default) {
        
        let obj = this.getDefaultNavItem(list[i].type)
        obj.type=list[i].type;
        navList.update(i, obj);
      }
    }
    if(this.props.type==="topBar"){
      list= list.filter(obj=>obj.type!=="links");
    }
    return list


  }
  getHtml() {
    
    return <MapComponent  theme={this.props.mapTheme} list={this.mapList} cells={this.list} {...this.props.navMapProps}/>

  }
  getNavLists(){
    this.list = this.props.list ? this.props.list : this.getList();
    this.mapList = this.props.mapList ? this.props.mapList : [{}]
  }
}

export default NavMapContainer;
