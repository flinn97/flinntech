import { ParentFormComponent } from '../formTech/FormComponentsInterface';
import BaseClass from './baseClass';


//model
export default class FormItem extends BaseClass {
  constructor(props){
    super(props);


  }
  getOption(){
    <ParentFormComponent {...this.cell} {...this.props}/>
  }


}
