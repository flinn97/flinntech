import EditItem from "./editItem";
import Edit from '../pics/editPin.png';


export default class EditIconItem extends EditItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCEditImgItem";
    this.state.itemType = "img"
  }



  additionalPostSetup(){
    this.getImg();
    this.item.setProps({src:this.src});
  }

  getImg(){
    this.src = this.cell.imgSrc||Edit
    return this.src
  }

}
