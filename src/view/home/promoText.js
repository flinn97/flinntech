
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";



export default class PromoText extends BaseComponent{
    constructor(props, ){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit",
            type:"topic",

        }
    }
  

    getInnerContent(){
      return(<>
  <div style={{marginTop:"10px"}}>
    <h2 style={{margin:"0px"}}>Sales Operations Master</h2>
    <p style={{margin:"0px"}} className="text">Company Wide View of Sales Engagement</p>
  </div>
      
      </>)
    }
    render(){
      
        return(
        <div className={this.props.pageClass||this.state.defaultClass}>
         
          {this.getInnerContent()}

        </div>
        )
    }

    
}