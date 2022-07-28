import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDw7YcEY5nJ_As4L7_k1jXxauKtdSINq6M",
    authDomain: "chat-app-49172.firebaseapp.com",
    projectId: "chat-app-49172",
    storageBucket: "chat-app-49172.appspot.com",
    messagingSenderId: "198920163138",
    appId: "1:198920163138:web:887145e975303dba5542db",
    databaseURL: "https://chat-app-49172-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
export { auth, database };