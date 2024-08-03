import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, writeBatch, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser, updatePassword } from "firebase/auth";
import { QuearyGenerator } from "./queryGenerator.js";
import binder from "../Util/binder.js";
import BaseObserver from "../../templateTech/observers/baseObserver.js";

class Auth {
    urlEndpoint = "";
    dispatch;
    componentList;
    userStr = "flinnappsUser";
    QuearyGenerator;
    DB;
    storage;
    auth;
    userEmail;
    path = [];
    postObserver= new BaseObserver();
    dispatchObserver= new BaseObserver();
    readObserver= new BaseObserver();

    constructor(endpoint, db, storage, auth, dispatch) {
        binder.bind(this);
        this.urlEndpoint = endpoint;
        this.DB = db;
        this.storage=storage;
        this.auth=auth;
        this.dispatch=dispatch
        this.path = [this.DB, `${this.urlEndpoint}users`, `${this.urlEndpoint}APP`, "components"]
        this.QuearyGenerator = new QuearyGenerator(this.DB, this.urlEndpoint);

    }
    setAuth(a){
        this.auth=a;

    }
    setStorage(s){
        this.storage=s;
        
    }

    getPostObserver(){
        return this.postObserver;
    }
    setPostObserver(o){
        this.postObserver=o

    }
    subscribeToPostObserver(f){
        this.postObserver.subscribe(f)
    }
    getReadObserver(){
        return this.readObserver;
    }
    setReadObserver(o){
        this.readObserver=o

    }
    subscribeToReadObserver(f){
        this.readObserver.subscribe(f)
    }
    
    getDispatchObserver(){
        return this.dispatchObserver;
    }
    setDispatchObserver(o){
        this.dispatchObserver=o

    }
    subscribeToDispatchObserver(f){
        this.dispatchObserver.subscribe(f)
    }
    
    setPath(p) {
        this.path = p;
    }
    getPath() {
        return this.path;
    }

    setDB(db) {
        this.DB = db;
        this.QuearyGenerator.setDB(db);
    }
    setDispatch(d) {
        this.dispatch = d
    }
    setComponentList(l) {
        this.componentList = l
    }
    setUserStr(s) {
        this.userStr = s;
        this.QuearyGenerator.setUrl(s);
    }
    getQueryGenerator() {
        return this.QuearyGenerator;
    }
    setQueryGenerator(qg) {
        this.QuearyGenerator = qg;
    }

    /**
     * 
     * The following functions are direct firebase auth functions and things needed for that (login, register, changePassword etc.)
     */


    async login(email, password) {
        let user;
        
        let e;
        await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                let eL = errorMessage.length - 1;
                let newString = errorMessage.slice(9, eL);
                e = { error: newString };
                console.log(e);
            });
        if (user) {
            let saveUser = user;
            this.dispatch({ login: true });
            await localStorage.setItem(this.userStr, JSON.stringify(saveUser));
            if (this.componentList !== undefined && this.dispatch !== undefined) {
                user = await this.getuser(email);
            }
        } else {
            user = e;
        }
        return user;
    }

    async register(email, password, addToCache) {
        let user;
        await createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            let eL = errorMessage.length - 1;
            let newString = errorMessage.slice(9, eL);

            user = { error: newString };
        })
        if (!user.error) {
            this.userEmail=user.email;
            localStorage.setItem(this.userStr, JSON.stringify(user));

        }
        return user;
    }

    async logout() {
        await localStorage.clear();
        localStorage.setItem(this.userStr, undefined);
        let logouser;
        await onAuthStateChanged(this.auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(this.auth);

        }
        await localStorage.setItem(this.userStr, null);
        window.location.href = "/";
    }

    sendForgotPasswordChange(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

   async checkIfLoggedIn() {
    return new Promise((resolve, reject) => {
         onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                resolve(user)
            }
            else {
                await localStorage.setItem(this.userStr, null);
                await localStorage.clear();
                localStorage.setItem(this.userStr, undefined);
                let logotUser;
                await onAuthStateChanged(this.auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        logotUser = user.uid;
                        // ...
                    }
                })
                if (logotUser) {
                    await signOut(this.auth);

                }
                await window.location.reload();
            }
    });})

    }

    async getCurrentUser() {

        let item = await localStorage.getItem(this.userStr);
        item = await JSON.parse(item);
        return item;
    }

    async setCurrentUser(student) {
        await localStorage.setItem(this.userStr, JSON.stringify(student));
    }


    async loginToDel(email, password,) {

        await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
    async delAccount() {

        const auth = getAuth();
        const user = auth.currentUser;

        await deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }
    async notify(body, url) {

        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(body),
            headers: {
                'Conent-Type': 'application/json'
            }
        });


    }
    async changePassword(password) {
        const auth = getAuth();

        const user = auth.currentUser;
        const newPassword = password;

        await updatePassword(user, newPassword).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
        return true
    }


    //Value = value pair (key value) example: string such as "1231454891"
    //ComponentList = adding to the componentList
    //Attribute = attribute pair always a string "campaignID" or "_id"
    //Type = OPTIONAL this RETURNS the getList, string "monster",
    async firebaseGetterSnapshot(queryJson, path, owner) {
        owner = owner===true?this.userEmail:undefined
            let components = await this.QuearyGenerator.generateQueary(queryJson, path, owner)
        
        let rawData = []
        let comps1 = await onSnapshot(components, async (querySnapshot) => {
            rawData = await this.getRawData(querySnapshot);
        });
        return rawData;
    }



    //Value = value pair (key value) example: string such as "1231454891"
    //ComponentList = adding to the componentList
    //Attribute = attribute pair always a string "campaignID" or "_id"
    //Type = OPTIONAL this RETURNS the getList, string "monster",
    async firebaseGetter(queryJson, path, owner) {
        owner = owner===true?this.userEmail:undefined
        let components = await this.QuearyGenerator.generateQueary(queryJson, path, owner)
        let comps = await getDocs(components);
        return await this.getRawData(comps)

    }

    async getRawData(dataSnapShot) {
        let rawData1 = [];
        for (const key in dataSnapShot.docs) {
            let data = dataSnapShot.docs[key].data()
            rawData1.push(data);
        }
        let componentsAdded = await this.componentList.addComponents(rawData1, true);
        
        if (this.dispatch) {
            await this.dispatch({ snapShot: { dataRetrieved: componentsAdded } });
        }
        this.readObserver.run(componentsAdded);
        return componentsAdded
    }


    async getCount(queryJson, path, owner) {
        owner = owner===true?this.userEmail:undefined
        let countQuery = await this.QuearyGenerator.generateQueary(queryJson, path, owner);
        let count = await getCountFromServer(countQuery)
        return count.data().count
    }

    async getuser(email) {
        
        this.userEmail=email;
        let user = await this.componentList.getComponentFromBackend({type:"user", id:email});
        if (user) {
            this.dispatch({ currentUser: user, email: email, gotUser: true });
        }
        return user
    }



    async GetAllData(queryJson, path) {
        path = path || [this.db, this.urlEndpoint + "users"];
        this.firebaseGetter(queryJson, path)
    }

 /**
  * post stuff.
  */

    async uploadPics(file, name) {


        const storageRef = ref(this.storage, name);
        await uploadBytes(storageRef, file).then((snapshot) => {

            console.log('Uploaded a file!');

        })
    }

    async downloadPics(newName) {
        let src;
        await getDownloadURL(ref(this.storage, newName)).then((url) => {

            src = url;
        })
        return src;
    }

    deletePics(newName) {
        //
        const delRef = ref(this.storage, newName);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }
    prep(arr) {
        arr = Array.isArray(arr) ? arr : [arr];
        arr = arr.map((obj) => {
            let json = obj;
            if (obj.getJson) {
                json = obj.getJson()
            }
            return json
        });
        arr = arr.filter(obj=>obj!==undefined)
        return arr
    }

    async add(arr, path,  dispatchKey, timeKey,) {
        arr = await arr.map((obj)=>{
            if(obj.getJson().owner ==="" ||obj.getJson().owner===undefined){
                obj.setCompState({owner:this.userEmail})
            }
            return obj
        })
        return await this.operate(arr, setDoc, path, dispatchKey || "added", timeKey || "date");
    }

    async update(arr, path, timeKey, dispatchKey) {
        return await this.operate(arr, updateDoc, path, dispatchKey || "updated", timeKey || "lastUpdated")
    }

    async del(arr, path, dispatchKey,) {
        return await this.operate(arr, deleteDoc, path, dispatchKey || "deleted",);
    }

    async operate(arr, operation, path, dispatchKey, timeKey) {
        
        arr = await this.prep(arr);
        path = path || this.path
        for (let component of arr) {
            if (timeKey) {
                component[timeKey] = await serverTimestamp();
            }
            await this.postObserver.run([component]);
            let params = [doc(...path, component._id)];
            if (operation !== deleteDoc) {
                params.push(component);
            }
            await operation(...params);
        }
        if (this.dispatch) {
            this.dispatch({ [dispatchKey]: arr, dispatchComplete: true })
        }
        this.dispatchObserver.run([{[dispatchKey]:arr}])

        return arr
    }
}

export default Auth;
