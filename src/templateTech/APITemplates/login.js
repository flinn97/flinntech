import { Link } from "react-router-dom";
import Card from "../../cardTech/Card";
import BaseComponent from "../baseClasses/BaseComponent";

export default class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            email: "",
            password: "",
        }
    }
    validate() {
        return true
    }
    onChange(e) {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }
    onSub() {
        if (this.validate()) {
            this.APIService.login(this.state.email, this.state.password);
        }
    }
    getSwitchLink() {
        return <div>Dont have an Account? <Link to="/register">Sign Up</Link></div>

    }
    preSetup() {
        this.setComponents(["container", "header", "form", "submitButton"]);
      }

    getHeaderHtml() {

        let headerHtml = this.header.getHtml({ type: "h1", content: "Login" });
        return headerHtml;

    }
    getFormHtml() {
        let content = <><div>email</div>
            <input className="defaultInputFormAuth"  name="email" onChange={this.onChange} value={this.state.value} />
            
            <div style={{marginTop:"10px"}}>password</div>
            <input className="defaultInputFormAuth" name="password" type="password" onChange={this.onChange} value={this.state.value} /></>
            this.form.setClass("defaultLoginForm");
        let formHtml = this.form.getHtml({type:"div", content:content, })
        return formHtml;
    }
    getSubmitHtml(){
        this.submitButton.setClass("defaultLoginButton");
        this.submitButton.setOnClick(this.onSub);
        let submitHtml = this.submitButton.getHtml({type:"div", content:"Submit"})
        return submitHtml
    }
    getContainerHtml(){
        this.container.setClass(this.props.loginContainer || "fitCC")
        let html = <>{this.getHeaderHtml()}{this.getFormHtml()}{this.getSubmitHtml()} {this.getSwitchLink()}</>
        let containerHtml = this.container.getHtml({type:"div", content:html,});
        return containerHtml;
    }



    getHtml() {
        
        let html = this.getContainerHtml();

        let full = <div className="fullCCLayoutRow"><Card type={this.props.loginCardType || "biggerCard"} content={html} /></div>

        return full
    }
}