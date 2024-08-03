
import { Component } from 'react';
class Page1 extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
  return (
    <div style={{paddingLeft:"500px"}}>
    page1
    <div onClick={()=>{this.props.app.dispatch({popupSwitch:"page1"})}}>click me</div>
    </div>
  );
  }
}

export default Page1;
