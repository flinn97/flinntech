import BaseClass from '../baseClass';


export default class EditItem extends BaseClass {
  constructor(props) {
    super(props);
    this.state.classKey = "MCEditItem"
    this.state.itemClick = this.edit


  }

  /**
   * delete or send a popup dispatch according to user preference.
   */
  edit() {
    let app = this.props.app;
    app.dispatch({ popupSwitch: "edit", currentPopupComponent: this.obj })


  }
  getOption() {
    return "edit"
  }

}
