import BaseClass from './baseClass';


export default class AttributePrePostItem extends BaseClass {
  constructor(props){
    super(props);

  }


  render(){
    let cell = this.state.cell
    let name = cell.name;
    if(!name){
      name = cell
    }
    let html = <span style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCAttributeItem}>
      <div style={this.state.cell.preStyle} className={this.state.cell.preClass?this.state.cell.preClass:""}>
        {this.state.cell.preText}
      </div>
      <div>
      {this.state.obj.getJson()[name]}
      </div>
      <div style={this.state.cell.postStyle} className={this.state.cell.preClass?this.state.cell.postClass:""}>
        {this.state.cell.postText}
      </div>
      </span>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}