import BaseClass from "../componentListNPM/baseClass";

class ComponentBase extends BaseClass{
    constructor(opps){
        super(opps)
        
    }
    json={...this.json,
        type:"",
        name:"",
        owner:"",
        picURL:"",

        }
}
class User extends ComponentBase{
    json ={
        ...this.json,
        type:'user',
    }
}
/**
 * user could be something that is in every app. Shouldn't have to put it in,
 */

class Topic extends ComponentBase{
    json ={
        ...this.json,
        type:'topic',
        backendKeys:["subTopic", "image", "map", "pin", ]




    }
}
class Task extends ComponentBase{
    json ={
        ...this.json,
        complete:false,
        notes:"",
        date: ""


    }
}
class ISR extends Task{
    json ={
        ...this.json,
        type:'isr',
        text: "ISR",


    }
}
class Campaign extends Task{
    json ={
        ...this.json,
        type:'campaign',
        text: "Campaign",


    }
}
class OEM extends ComponentBase{
    json ={
        ...this.json,
        type:'oem',
        text: "OEM",
        category: "",
        quotes: "0",
        notes:"",
       


    }
}
class Report extends ComponentBase{
    json ={
        ...this.json,
        type:'report',
        emails:"",
        time: "",
       


    }
}
class Pin extends ComponentBase{
    json={
        ...this.json,
        type:"pin",
        mapId:"",
        x:0,
        y:0,
        mapId:"",
        name:"New Topic"
    }
}
class SubTopic extends Topic{
    json={
        ...this.json,
        type:"subTopic",
        orderMatters:true,
        orderFilterKey:"parentId",
        parentId:"",
        order:0,
        backendKeys:["topic"],
        backendAttributes:["topicId"],
        backendFilterKeys:["_id"],
        parentIds:{}
        
    }
}

class Image extends ComponentBase{
    json={
        ...this.json,
        type:"image", 
    }
}

export{Topic, SubTopic, Image, ISR,Campaign, Pin, User, OEM, Report}