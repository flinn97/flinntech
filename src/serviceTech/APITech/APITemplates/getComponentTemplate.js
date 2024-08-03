import BaseComponent from "../../../templateTech/baseClasses/BaseComponent";
import urlService from "../../Util/urlService";


export default class GetComponentTemplate extends BaseComponent{
    dispatchItems={}
    constructor(props, obj){
        super(props);
        this.state={...this.state,
        type:obj?.type,
        ids:obj?.ids,
        filterKeys: obj?.filterKeys,
        path:obj?.path,
        snapShot: obj?.snapShot,
        owner:true
        }
        if(obj?.owner===false){
            this.state.owner=false
        }

    }
    async getComponentsFromBackend(){
        let {type,  ids, filterKeys, path, snapShot,owner} = this.state
        this.compList = await this.componentList.getList(type, ids, filterKeys);
        if(this.compList.length>0){
            await this.setState({
                gotComponents:true
            })
        }
        
        this.compList = await this.componentList.getComponentsFromBackend({type,  ids, filterKeys, path, snapShot, owner})

        this.setState({
            gotComponents:true,
            getComponentsFromBackend:true,
            components:this.compList,
            urlId:ids
        })
    }

    async componentDidMount(){
        
        this.getComponentsFromBackend();
        let page = this
        window.addEventListener('popstate', function(event) {
            page.onBackClick(event);
        });

    }
    onBackClick(e){
        this.getComponentsFromBackend();
    }
    componentDidUpdate(){
        this.getComponentsAgain();
    }

    async getComponentsAgain(props,state){
        this.getFromURL();
        if(this.app.state.urlChange||(this.state.reRender&&this.urlId!==this.state.urlId)){
          await this.setState({urlId:this.urlId})
          await this.dispatch({urlChange:undefined});
          this.forceRerender = false;
            this.getComponentsFromBackend();

        }
    }
    async getFromURL(){
        this.urlType = urlService.getTypeFromURL();
        this.urlId = urlService.getIdFromURL();
    }
   
}