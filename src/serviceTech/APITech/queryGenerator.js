import binder from "../Util/binder";
import { collection, where, query, orderBy, limit, } from "firebase/firestore";

class QuearyGenerator {
    DB;
    url;
    path = [];
    orderStr = "date";
    constructor(db, url) {
        binder.bind(this);
        this.setDB(db);
        this.setUrl(url);
        this.path = [this.DB, this.url + "users", this.url + "APP", "components"]
    }
    setDB(db) {
        this.DB = db;
    }
    setUrl(url) {
        this.url = url
    }
    setPath(p) {
        this.path = p;
    }
    setOrderStr(s) {
        this.orderStr = s
    }
    async generateQueary(queryJson, path, owner) {
        
        let whereMap = queryJson.where.map((obj) => {
            if (obj.attribute !== undefined) {
                return where(obj.attribute, obj.type || "==", obj.val)
            }
        }
        ).filter(obj=> obj!==undefined);
        if(owner){
            whereMap.push(where("owner", "==", owner))

        }
        path = path || this.path;

        // Construct the query parameters array
        let queryParams = [...whereMap];

        // Add orderBy clause if provided
        let order = queryJson.order || this.orderStr;
        if (order !== "noOrder" && order !== undefined) {
            queryParams.push(orderBy(order));
        }


        // Add limit clause if provided
        if (queryJson.limit) {
            queryParams.push(limit(queryJson.limit));
        }

        // Create the query
        let queryRef = query(collection(...path), ...queryParams);
        return queryRef
    }
}
export { QuearyGenerator }