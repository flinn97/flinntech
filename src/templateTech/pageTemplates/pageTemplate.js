import BaseComponent from "../baseClasses/BaseComponent";

export default class PageTemplate extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
            defaultClass:"fit"
        }
    }
    render(){
        return(<div style={this.props.pageStyle} className={this.props.pageClass||this.state.defaultClass}>

        </div>)
    }

    
}