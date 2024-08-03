import BaseClass from "../baseClass";
import { MapComponent } from "../mapComponentInterface";

export default class InnerMap extends BaseClass{
    constructor(props){
        super(props);
        this.state.displayState=false;
        this.state.itemType="div";

    }
    displayOption(){
        return <div style={{position:'absolute', left:"0px", top:"0px"}} className={this.state.displayState?"downward-arrow":"right-arrow"} onClick={()=>{
            this.wrapper.setStyle({...this.wrapper.getStyle(), height:"200px"});
                this.setState({displayState:!this.state.displayState})
            
        }}></div>

    }
    mapOption(){
        
        let map = <MapComponent name={this.props.name} 
        filter={{attribute:this.props.filter.attribute, search:this.obj.getJson()._id}} 
        cells={[...this.props.cells]}/>
        return map
    }
    additionalPostSetup(){
        debugger
        this.item.setStyle({...this.item.getStyle(), position:"relative"});
    }
    getOption(){
        
        return <div style={{position:'absolute', width:"100%", height:"100%", display:"flex", flexDirection:'column'}}>
            {this.displayOption()}
            {this.state.displayState&&this.mapOption()}
        </div>
        
    }
}