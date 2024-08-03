import BaseButton from "./baseButton";



export default class UploadButtonBaseClass extends BaseButton {
    constructor(props) {
        super(props);

    }
    createFileInfo(event) {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        let newDay = `${Math.floor(Math.random() * 9999)}-${month + day}`;
        let path = "images/" + newDay + event.target.files[0].name;
        this.fileInfo = {
            selectedFile: event.target.files[0],
            path: path,
            pic: URL.createObjectURL(event.target.files[0])
        }
        this.setState({...this.fileInfo})
        return this.fileInfo
    }
    async prepareOnChange() {
        let obj = await this.operationsFactory.prepare({
            prepare: { ...this.props.prepareOnChange },
            clean: true
        })
        obj = obj[0];
        this.obj = obj
    }


    async changeHandler(event) {

        await this.createFileInfo(event);


        if (this.props.prepareOnChange) {
            await this.prepareOnChange();
        }

        if (this.props.callBackFunc) {
            await this.props.callBackFunc(this.obj, this.fileInfo);
        }
        let pic;

        await this.APIService.uploadPics(this.fileInfo.selectedFile, this.fileInfo.path);
        if(!this.obj.getPicSrc){
        
            pic = await this.APIService.downloadPics(this.fileInfo.path);
            if(!this.props.skipUpdate && !this.state.skipUpdate){
                debugger
                if(this.obj?.length){
                    for(let comp of this.obj){
                        await comp.setCompState({[this.props.uploadAttribute||"picURL"]: pic});
    
                    }
                }
                else{
                    await this.obj.setCompState({[this.props.uploadAttribute||"picURL"]: pic});

                }
                
            }
            if(this.props.downloadPicsCallBackFunc){
                this.props.downloadPicsCallBackFunc(this.obj, this.fileInfo)
            }
        }
        if (this.props.runOnChange) {
            this.onSubmit();
        }
        return pic
    };


    async onSubmit() {
        if (this.props.prepareOnChange) {
            await this.operationsFactory.addToComponentList();
        }
        await this.obj.update();
        if (this.props.finishCallBackFunc) {
            this.props.finishCallBackFunc(this.obj);
        }
        this.dispatch({ imgUploaded: this.obj });
    }

    additionalSetup() {
        this.wrapper.setStyle({ maxWidth: "300px", maxHeight: "30px", width: "fit-content" })
        this.label.setStyle({ display: "inline-block", height: "35px", maxWidth: "fit-content", cursor: "pointer", position: "relative", })
        
        this.form.updateProps({accept: "image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml",
            style: {position: 'absolute', // Set position to absolute to make it fill the entire label
                top: 0,
                left: 0, cursor: "pointer",
                width: '100%',
                height: '100%',
                opacity: 0,
            },
            size: "6",
            type: "file",
            name: "file",
            onChange: this.changeHandler
        })
    }

    getInnerContent() {
        let formContent = this.getFormHtml()
        this.innerContent = [this.label.getHtml({ content: formContent, type: "label" }), this.props.errorText && this.error.getHtml()]
        return this.innerContent
    }



    getFormHtml() {
        
        this.content = this.props.content || <>Upload</>
        return (
            <div className={this.props.containerStyle||"defaultButton"}>{this.content}
               {this.form.getHtml({type:"input"})}
            </div>

        )
    }

}
/**
 * should compress photos as well.
 * and use themes. fix the div that hard codes the class.
 */