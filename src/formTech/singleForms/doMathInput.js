import InputBaseClass from "../inputBaseClass";
import mathService from "../../serviceTech/Util/mathService";

export default class DoMathInput extends InputBaseClass{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        document.addEventListener("keyup",this.doMath);
    }
    componentWillUnmount(){
        document.removeEventListener("keyup",this.doMath);
    }
    additionalChanges(event){
        
        let {name, value} = event.target;
        this.setState({val:value})
    }

    async doMath(e){
        if(e.key==="Enter"&&this.state.val!==undefined ){
            
        
            let obj = this.obj[0];
            let math = await mathService.doMath(this.state.val).toString();
            await obj.setCompState({[this.props.name]:math});
            obj.update();
            await this.setState({val:undefined,})
    
          }
    }



    
}