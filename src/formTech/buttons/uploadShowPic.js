import UploadButtonBaseClass from "./uploadButtonBaseClass";


export default class UploadShowPic extends UploadButtonBaseClass {
    constructor(props) {
        super(props);

    }



    getFormHtml() {
        
        this.content = this.props.content || <>Upload</>
        let objPicUrl =this.obj?.[0]?.getJson()[this.props.uploadImgAttribute||"picURL"]
        return (
            <>
            <div style={this.props.containerStyle} className={this.props.containerClass||"defaultButton"}>{this.content}
               {this.form.getHtml({type:"input"})}
            </div>
            {(this.state.pic ||objPicUrl)&&<img style={this.props.uploadedImgStyle}  className={this.props.uploadedImgClass||"uploadedImg"} src={this.state.pic||objPicUrl}/>}
            </>
        )
    }

}
/**
 * should compress photos as well.
 * and use themes. fix the div that hard codes the class.
 */