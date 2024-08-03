
import BaseClass from './baseClass';

//model
export default class ImgItem extends BaseClass {

  constructor(props) {
    super(props);
    this.state.defaultClassName= "MCImgItem";
    this.state.itemType="img";

  }
  getPicSrc(){
    
    
    if(this.obj.getJson){
      this.src=this.obj?.getJson()[this.state.cell?.src || "picURL"];

    }
    if(this.cell.imgSrc){
      this.src = this.cell.imgSrc
    }
    return this.src
  }

  additionalPostSetup(){
    this.getPicSrc();
    if(this.src){
      this.item.addProps({src:this.src, alt:'picture goes here'});

    }
  }





}
