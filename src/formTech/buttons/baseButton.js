import InputBaseClass from "../inputBaseClass";

export default class BaseButton extends InputBaseClass{
    constructor(props){
        super(props);
        this.state.formClass="FCDefaultButton";
    }

    buttonClick(){
        if(this.props.buttonClick){
            this.props.buttonClick(this.obj)
        }
        else{
            this.buttonClickFunc();

        }
      if(this.props.callbackFunc){
        this.props.callbackFunc(this.obj);
    }

    }
    buttonClickFunc(){

    }

    additionalSetup(){
        this.form.setOnClick(this.buttonClick)
    }


    getFormHtml() {  
        this.form.setStyle({cursor:"pointer"})
        this.content= this.props.content||(this.content||<>button</>)
        return this.form.getHtml({type:"div", content:this.content})
    }

}

