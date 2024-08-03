import BaseButton from "./baseButton";

export default class UpdateButton extends BaseButton{
   

    buttonClickFunc(){
        
        for(let obj of this.obj){
            obj.update(this.props.updateParams);
        }
    }

   

}

