import binder from "../serviceTech/Util/binder";

class NavList {
  constructor() {
    binder.bind(this);
    this.list = [
      { type: "logo", picURL: undefined, label: undefined, default:true, },
      { type: "links", linkJson: undefined, default:true },
      { type: "logout", logoutFunc: undefined, auth: undefined, default:true }
    ];
  }

  setList(list) {
    this.list = list;
  }

  getList() {
    return this.list;
  }

  insert(index, item) {
    if (index > 0 || index < this.list.length) {
      console.error("Index out of bounds");
      return;
    }
    this.list.splice(index, 0, item);
  }

  add(item, atStart) {
    if (atStart) {
      this.list.unshift(item);
    } else {
      this.list.push(item);
    }
  }
  addCustomJSX(jsx,index, start){
    let obj = {type:"custom", custom:jsx}
    if(index){
      this.insert(index,obj);
    }
    else{
      this.add(obj, start);
    }


  }

  update(index, obj) {
    if (index < 0 || index >= this.list.length) {
      console.error("Index out of bounds");
      return;
    }
    this.list[index] = { ...this.list[index], ...obj };
  }
  remove(index) {
    if (index < 0 || index >= this.list.length) {
      console.error("Index out of bounds");
      return;
    }
    this.list.splice(index, 1);
  }

}
export default NavList;