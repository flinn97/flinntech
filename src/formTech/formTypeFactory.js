import BaseReactFactory from "../templateTech/factories/baseReactFactory";
import AddButton from "./buttons/addButton";
import InputBaseClass from "./inputBaseClass";
import DoMathInput from "./singleForms/doMathInput";
import BaseButton from "./buttons/baseButton";
import PopupButton from "./buttons/popupButton";
import UpdateButton from "./buttons/updateButton";
import RunButton from "./buttons/runButton";
import QuillForm from "./singleForms/quillForm";
import UploadButtonBaseClass from "./buttons/uploadButtonBaseClass";
import UploadShowPic from "./buttons/uploadShowPic";
import DelButton from "./buttons/delButton";
/**
 * factory for getting different items for the map component
 */
export default class FormFactory extends BaseReactFactory {
    factory = {
    input:InputBaseClass,
    textarea:InputBaseClass,
    math: DoMathInput,
    addButton: AddButton,
    baseButton: BaseButton,
    popupButton:PopupButton,
    updateButton:UpdateButton,
    runButton:RunButton,
    quill:QuillForm,
    upload:UploadButtonBaseClass,
    showUpload:UploadShowPic,
    del:DelButton
    



    }


}

