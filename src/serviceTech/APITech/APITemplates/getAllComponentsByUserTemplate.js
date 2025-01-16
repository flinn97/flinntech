import GetComponentTemplate from "./getComponentTemplate";


export default class GetAllComponents extends GetComponentTemplate{
    dispatchItems={}
    constructor(props, obj){
        super(props, obj);
        this.state={...this.state,
        type:obj?.type,
        ids:obj?.ids,
        filterKeys: obj?.filterKeys,
        path:obj?.path,
        snapShot: obj?.snapShot,
        owner:obj?.owner,

        }
        if(obj?.owner===false){
            this.state.owner=false
        }

    }
    async getComponentsFromBackend(){
        let {type,  ids, filterKeys, path, snapShot,owner} = this.state
        this.compList = await this.componentList.getComponents();
        if(this.compList.length>0){
            await this.setState({
                gotComponents:true
            })
        }
        
        this.compList = await this.componentList.getComponentsFromBackend({type:this.state.owner,  ids, filterKeys, path, snapShot, typeAttribute:"owner"})

        this.setState({
            gotComponents:true,
            getComponentsFromBackend:true,
            components:this.compList,
            urlId:ids
        })
    }

   
}