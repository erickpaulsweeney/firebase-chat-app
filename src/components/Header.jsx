import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "../slices/userSlice";
import { login, logout } from "../asyncFuncs";
import { setRooms } from "../slices/roomsSlice";
import { ref, set } from "firebase/database";
import { database } from "../firebase-config";

function Header(props) {
    const user = useSelector(state => state.user);
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

    async function handleOut() {
        let data = await logout();
        if (data) {
            dispatch(signout());
            dispatch(setRooms(null));
        }
        else return;
    }

    return (
        <div className="container-header">
            <div className="header-name">Chatterbox</div>
            {user.value === null && <button className="nav-btn" onClick={handleIn}>Login</button>}
            {user.value !== null && <div>
                <div className="nav-info">
                    <div className="username">{user.value.name}</div>
                    <img src={user.value.photo} className="avatar" alt="" />
                    <button className="nav-btn" onClick={handleOut}>Logout</button>
                </div>
            </div>}
        </div>
    )
}

export default Header;