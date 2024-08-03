import BaseComponent from '../templateTech/baseClasses/BaseComponent';

export default class InputBaseClass extends BaseComponent {
    constructor(props) {
        super(props);

        //some day this stuff in the constructor should be refactored but its not a big deal right now.
    this.domList = [
            "a",
            "button",
            "div",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "img",
            "input",
            "p",
            "span",
            "table",
            "tr",
            "td",
            "th",
            "ul",
            "li",
            "ol",
            "form",
            "textarea",
            "select",
            "option",
            "label",
            "nav",
            "footer",
            "header",
            "article",
            "section",
            "aside",
            "main",
            "video",
            "audio",
            "iframe",
            "canvas",
        ];


        this.state = {
            ...this.state,
            wrapperClass:"FCWrapper",
            formClass:"FCInputForm",
            labelClass:"defaultLabel",
            errorClass:"defaultErrorMessage",
            interface:"form"


        }



    }

    

    setObj() {
        if(!this.props.prepareOnClick){
            if(this.props.type==="quill"){
                
            }
            let obj = this.props.obj||(this.props.inPopup?this.propsState?.currentPopupComponent:this.propsState?.currentComponent)
            this.obj = this.isArray(obj);
        }
      }



    preSetup() {
        this.setComponents(["wrapper", "form", "label", "error"]);
    }




    getInnerContent() {
       
        
        this.innerContent = [this.props.label && this.label.getHtml(), this.getFormHtml(), this.props.errorText && this.error.getHtml()]
        return this.innerContent
    }

     getHtml() {
        
         this.mapInnerContent();
        let html =  this.wrapper.getHtml({type:"div", content:this.innerContent})
        this.html = <>{html}</>
        return this.html;
    }

    getFormHtml() {
        this.getInputProps(this.props.type || "input");
        this.additionalPropsSetup();
        return this.form.getHtml({type:this.props.type ? this.props.type : "input", content:this.content, props:this.inputProps})
    }

    additionalPropsSetup() { }

    /**
     * Directly updates the object(s)
     * @param {*} event 
     */
    handleChange(event){
        
        const { name, value } = event.target;

        for (let obj of this.obj) {
            if (this.props.isPropArray) {
                let currentVal = obj.getJson()[this.props.name] || [];
                if (!Array.isArray(currentVal)) {
                    currentVal = [currentVal];
                }
                if (!Array.isArray(currentVal[0])) {
                    currentVal[0] = [currentVal[0]];
                }
                currentVal[0] = value;
                value = currentVal;
            }

            obj.setCompState({
                [this.props.name]: value,
            });
        }
        this.afterChange(event);
    };

   
   

    afterChange(event) {
        if (this.props.update) {
            for(let obj of this.obj){
                
                let update = this.props.update===true?undefined:{...this.props.update}
                obj?.update(update);
            }
        }

        if (this.props.sendUpdate && this.props.app) {
            this.app.dispatch({ formUpdate: this.props.type });
        }
        if (this.props.callbackFunc) {
            this.props.callbackFunc(this.obj)
        }
        this.additionalChanges(event)
        this.setState({});
    }

    additionalChanges(event){}


      /**
     * Prepare on click with a json object
     * prepareOnClick={operation:"exe cleanPrepare", operate:"exe addpost", }
     * Will not prepare on click multiple json objs instead you must specify a number and multiple will only work with adding an obj
     */
      async prepareOnClick() {

        if (this.props.prepareOnClick && this.props.app) {
            let obj = this.props.obj;
            if (obj) {
                obj = this.isArray(obj)

            }
            obj = await this.props.app?.state.componentList.getOperationsFactory().prepare({ ...obj });
            //obj should return a class object for 
            if (obj) {
                obj = this.isArray(obj)
            }
            this.obj = obj
        }


    }



    /**
     * update a value all at once. Same as handleHTMLChange but made to me more generic in clase the html change needs to be more complicated.
     * @param {} value 
     */
    objDispatch(value) {
        
        for (let obj of this.obj) {
            obj.setCompState({
                [this.props.name]: value,
            });
           
        }
        this.afterChange();
    }

    /**
    * @param {} value 
    */
    handleChangeWithoutEvent(obj) {
        for (let o in this.obj) {
            o.setCompState({ [obj.name]: obj.value });
        }
        this.afterChange();
    }



    getInputProps(type) {
        
        this.inputProps = {
            onChange: this.props.handleChange ? (e) => { this.props.handleChange(e, this.obj) } : this.handleChange,
            value: this.obj[0]? this.obj[0]?.getJson()[this.props.name]:this.props.value,
            type: this.props.inputType||this.props.type,
            onFocus: this.props.onFocus ||this.onFocus,
            placeholder: this.props.placeholder,
            name: this.props.name,
            min: this.props.min,
            max: this.props.max,
            cols: this.props.cols||"",
            rows :this.props.rows||5,
            resize:this.props.resize||"true",
            autoComplete: this.props.autoComplete ? this.props.autoComplete : "off",
            id: this.props.id,
            checked: this.props.checked,
            spellCheck: (this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck,
            minLength: this.props.minLength,
            maxLength: this.props.maxLength,
            
           
            


        };
        
        if(!this.domList.includes(type)){
            this.inputProps.handleChangeWithoutEvent=!this.props.update ? this.props.handleChangeWithoutEvent ? this.props.handleChangeWithoutEvent : this.handleChangeWithoutEvent : () => { console.log("") }
            this.inputProps.selectOptions=this.props.selectOptions
            this.inputProps.textOptions=this.props.textOptions
            this.inputProps.unit =this.props.unit ? this.props.unit : "$"
            this.inputProps.tickClass=this.props.tickClass
            this.inputProps.handleHTMLChange= this.props.handleHTMLChange || this.objDispatch
            this.inputProps.doesMath=this.props.doesMath
            this.inputProps.objDispatch=this.objDispatch
            this.inputProps.emitClickedOutside=this.props.emitClickedOutside
            this.inputProps.updateOnClickOutside=this.props.updateOnClickOutside
        }

        if (this.props.required) {
            this.inputProps.required = true;
        }

        if (this.props.disabled) {
            this.inputProps.disabled = true;
        }

        return this.inputProps;
    }






}
/**
 * click outsides
 * Change themes for individual pieces.
 */