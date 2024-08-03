import GetComponentTemplate from "./getComponentTemplate";

export default class GetComponentsFromUrl extends GetComponentTemplate{
   

    async getComponentsFromBackend(){
        
        await this.getFromURL();
        await this.getFirstComponent();
       

        if(this.comp){
            await this.getAssociatedItems();
           
           
        }
        this.setGotComponents();

        
        
    }

    async getFirstComponent(urlType, urlId){
        let type = urlType||this.urlType;
        let id = urlId||this.urlId;
        this.comp = this.componentList.getComponent(type, id);
        if(!this.comp){
            
            this.comp = await this.componentList.getComponentsFromBackend({type:type, ids:id, filterKeys:"_id", owner:this.state.owner});
                this.comp=this.comp.length>0?this.comp[0]:undefined
        }
    }

    async getAssociatedItems(){
        this.compList= await this.comp.getAssociatedItems(this.state.itemTypes);
        if(this.compList.lenth>0){
            this.setState({
                gotComponents:true,

            })
        }
        this.compList =await this.comp.getAssociatedItemsFromBackend(this.state.itemTypes);
        await this.setCurrentItems();
    }

    setCurrentItems(){
        this.dispatch({
            currentComponent:this.comp,
            ["current"+this.getCapitalFirstLetter(this.comp.getJson().type)]: this.comp,
            ...this.dispatchItems
        })
    }

    setGotComponents(){
        {
            this.setState({
                gotComponents:true,
                gotComponentsFromBackend:true,
                components:this.compList,
                urlId:this.urlId
            });
        }
    }
    
   

   
}



/**this needs to be faster.
 * Make sure that someone can pass down props for a component and use the props comp instead. Also be able to do it in a list.
 */