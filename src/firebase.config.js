import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  // apiKey: "AIzaSyAXOGBStBj_dO0k3AK_1S6a_Qo7iMRb8QY",
  // authDomain: "gospel-230ff.firebaseapp.com",
  // projectId: "gospel-230ff",
  // storageBucket: "gospel-230ff.appspot.com",
  // messagingSenderId: "411032894371",
  // appId: "1:411032894371:web:f594f5c0af1930c6ccf816",
  // measurementId: "G-LMY8DG6Z63"
  apiKey: "AIzaSyAxbeARGVFOA6zv-zO-43bpYK_GNF_mOP4",
  authDomain: "eidashboard.firebaseapp.com",
  projectId: "eidashboard",
  storageBucket: "eidashboard.firebasestorage.app",
  messagingSenderId: "155553057806",
  appId: "1:155553057806:web:36f6301832b1a7eb45805f"
  // apiKey: "AIzaSyCVG7lppxce_QCnpYX1-gp3h7ym5mZClxI",
  // authDomain: "avagms-c2fee.firebaseapp.com",
  // projectId: "avagms-c2fee",
  // storageBucket: "avagms-c2fee.appspot.com",
  // messagingSenderId: "858751843821",
  // appId: "1:858751843821:web:58f0464e4285ea53de7be4",
  // measurementId: "G-QNWHBZM0GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};
// REACT_APP_SITE_KEY = ""
//  REACT_APP_FIREBASE_KEY = "AIzaSyBvmnwmc5Ckf2Thz7LHPoxMjKlxiEqTyU0"
//  REACT_APP_FIREBASE_AUTH = "legato-1f46f.firebaseapp.com"
//  REACT_APP_FIREBASE_PROJECT = "legato-1f46f"
//  REACT_APP_FIREBASE_STORAGE = "legato-1f46f.appspot.com"
//  REACT_APP_FIREBASE_MESSAGEID = "161584597472"
//  REACT_APP_FIREBASE_APPID = "1:161584597472:web:26c713eee21328a7874385"