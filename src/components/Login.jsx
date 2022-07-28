import { useDispatch } from "react-redux";
import { signin } from "../slices/userSlice";
import { login } from "../asyncFuncs";
import { ref, set } from "firebase/database";
import { database } from "../firebase-config";

function Login() {
    const dispatch = useDispatch();

    async function writeUserData(userId, name, email, imageUrl) {
        await set(ref(database, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        })
    }

    async function handleIn() {
        let data = await login();
        let payload = { name: data.displayName, email: data.email, photo: data.photoURL }
        let userId = data.email.replaceAll('.', '_');
        await writeUserData(userId, data.displayName, data.email, data.photoURL);
        dispatch(signin(payload));
    }

    return (
        <div className="container-login">
            <div className="login-name">Chatterbox</div>
            <button className="google-login" onClick={handleIn}>Login with Google</button>
        </div>
    )
}

export default Login;