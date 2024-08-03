import trash from '../pics/trashStill.png';
import DelItem from './deleteItem';


export default class DelIconItem extends DelItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCDelImgItem";
    this.state.itemType = "img"

  }

  additionalPostSetup(){
    this.getImg();
    this.item.setProps({src:this.src});
  }

  getImg(){
    this.src = cell.imgSrc||trash
    return this.src
  }

  

}
