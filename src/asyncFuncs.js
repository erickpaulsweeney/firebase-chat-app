import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase-config"

const provider = new GoogleAuthProvider();

async function login() {
    let response = await signInWithPopup(auth, provider);
    let data = response.user;
    return data;
}

async function logout() {
    try {
       await signOut(auth); 
       alert('Sign-out successful.');
       return true;
    }
    catch (error) {
        alert('An error happened. ', error);
        return false;
    }
    
}

export { login, logout };