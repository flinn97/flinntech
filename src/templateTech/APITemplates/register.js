import Login from "./login";
import { Link } from "react-router-dom";

export default class Register extends Login{
    async onSub(){
        if(this.validate()){
            
            let user = await this.APIService.register(this.state.email,this.state.password);
            if(!user.error){
                let json = {type:"user", email:this.state.email, _id: this.state.email}
                user = await this.componentList.addComponents(json);
                window.history.pushState({}, '', '/');
                this.dispatch({currentUser:user});
                
            }
        }
    }
    getHeaderHtml(){

            let headerHtml = this.header.getHtml({ type: "h1", content: "Register" });
            return headerHtml;
    
        
    }

    
    getSwitchLink(){
        return <div>Have an Account? <Link to="/login">Login</Link></div>
    }
}