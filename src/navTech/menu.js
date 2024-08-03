
import BaseComponent from '../templateTech/baseClasses/BaseComponent';
import "./nav.scss"

class Menu extends BaseComponent {
  constructor(props){
    super(props);
    this.state={
     defaultStyle:"navMenu",
     renderComp:undefined
    }
  }

  async open(){
    
    
    let component = await this.props.open();
    if(this.props.type==="topBar"){
      if(!this.state.renderComp){
        this.setState({renderComp:component})

      }
      else{
        this.setState({renderComp:undefined})
      }
    }
  }

  render(){
    let app = this.props.app
  return (<div>
    <div  onClick={this.open} className={this.props.menuClass?this.props.menuClass:this.state.defaultStyle}>
      {this.props.menuContent&&<>{this.props.menuContent}</>}
    </div>

    {this.state.renderComp&& <>{this.state.renderComp}</>}
    </div>
  );
  }
}

export default Menu;
