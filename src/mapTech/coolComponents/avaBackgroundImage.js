import AttributeItem from "../attributeItem";

export default class AvaBackgroundImage extends AttributeItem{
    constructor(){
        super();
        this.state.classKey= "MCBackgroundItem";
        this.state.wrapperClass = "MCCellBackground";
        this.state.linkClass= "MCBackgroundLink";
    }
    additionalPostSetup(){
        
        let image = this.cell.pirSRC||this.obj.getJson()[this.cell.picAttribute||"picURL"];

        let divStyle = {
            width: '100%', // Adjust as needed
            height: '250px', // Adjust as needed
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            fontSize: '50px',
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) no-repeat center center`,
            backgroundSize: 'cover',
            textDecoration: 'none'
        }
        this.wrapper.setStyle({...this.wrapper.getStyle(), ...divStyle});
        this.link.setStyle({...this.wrapper.getStyle(), ...divStyle});
    }

    
   
}