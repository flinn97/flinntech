import BaseButton from "./baseButton";

export default class AddButton extends BaseButton{
   

    buttonClickFunc(){
        let json = this.props.add;
        this.componentList.addComponents(json);

    }

   

}

