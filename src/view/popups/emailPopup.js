import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "../../formTech/FormComponentsInterface";
import BaseComponent from "../../templateTech/baseClasses/BaseComponent";
import "react-datepicker/dist/react-datepicker.css";
import add from "../../assets/add.png";

export default class EmailPopup extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
          ...this.state,
            defaultClass:"fit scroller",
            selectedDate: null,
        }
    }
    handleDayChange = (date) => {
      console.log(date)
      this.setState({ selectedDate: date });
      this.app.state.currentPopupComponent.setCompState({ sendDay: date }, { run: true });
    };
    render(){
      let emails1 = this.app.state.currentPopupComponent.getJson().emails;
      emails1 = emails1.includes(",")? emails1.split(","): [emails1];
      console.log(this.app.state.currentPopupComponent)
      console.log(emails1)
      let button = <RunButton content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />
      if(this.props.obj){
        
        button = <UpdateButton obj={this.props.obj} content="Save" isPopup={true} callbackFunc={this.props.callbackFunc}/>
      }
        return(
        <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
          <div style={{ width: "80%", padding: "10px",  borderRadius: "6px",}}>
  <div style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>Send To:</div>
  <div style={{ display: "flex", alignItems: "center" }}>
    <input
      onChange={(e) => {
        let val = e.target.value;
        this.setState({ val: val });
      }}
      value={this.state.val}
      placeholder="Enter email"
      style={{
        flex: 1,
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        marginRight: "10px",
        outline: "none",
        transition: "border-color 0.3s",
      }}
    />
    <img
      onClick={() => {
        if (this.state.val === undefined || this.state.val === "") {
          return;
        }
        let emails = this.app.state.currentPopupComponent.getJson().emails;
        let addition = emails === "" ? this.state.val : "," + this.state.val;
        emails = emails + addition;
        this.app.state.currentPopupComponent.setCompState({ emails: emails }, { run: true });
        this.setState({ val: "" });
      }}
      src={add}
      style={{width:"35px"}}

      
      
    />
  </div>
</div>
<div style={{ width: "80%",  padding: "10px",  }}>
  {emails1.filter(email => email!=="").map((email, index) => (
    <div
      key={index}
      className="layoutRow"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        borderBottom: "1px solid #eee",
        fontSize: "14px",
        color: "#333",
      }}
    >
      <span>{email}</span>
      <div
        onClick={() => {
          let emails = this.app.state.currentPopupComponent.getJson().emails || "";
          emails = emails.split(",").filter((e) => e !== email).join(","); // Remove the selected email
          this.app.state.currentPopupComponent.setCompState({ emails: emails }, { run: true }); // Update state
          this.setState({});
        }}
        style={{
          marginLeft: "20px",
          padding: "5px 8px",
          // backgroundColor: "#ff4d4d",
          color: "black",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
        // onMouseEnter={(e) => (e.target.style.backgroundColor = "#e60000")}
        // onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
      >
        X
      </div>
    </div>
  ))}
</div>
          <div style={{ marginTop: "20px", position: "relative", width: "200px", padding:"10px", marginLeft:"5px" }}>
  <div>Select Day (Mon-Sun):</div>
  <div
    onClick={() => {
      this.setState({ showDays: !this.state.showDays });
    }}
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
      position: "relative",
    }}
  >
    {this.app.state.currentPopupComponent.getJson().sendDay || "Select a day"}
  </div>
  {this.state.showDays && (
    <div className="scroller"
      style={{
        position: "absolute",
        top: "100%",
        left: "0",
        width: "100%",
        height:"200px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        zIndex: "1000",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
      }}
    >
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"," ", " ", " "].map((day) => (
        <div
          key={day}
          onClick={this.handleDayChange.bind(this, day)}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #f0f0f0",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
        >
          {day}
        </div>
      ))}
    </div>
  )}
</div>

          <div className="popupButton">
          {button}
          </div>

          
          

        </div>
        )
    }

    
}