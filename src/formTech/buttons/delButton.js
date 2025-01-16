import BaseButton from "./baseButton";

export default class DelButton extends BaseButton{
    constructor(props){
        super(props);
        this.state.formClass="FCDefaultDelButton";
        this.content="Delete"
    }
   

    buttonClickFunc(){
        this.props.obj.del();

    }

   

}

