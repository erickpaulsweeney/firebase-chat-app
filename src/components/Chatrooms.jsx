import Header from "./Header";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, push, set, onValue } from "firebase/database";
import { setRooms } from "../slices/roomsSlice";
import { database } from "../firebase-config";
import { Link } from "react-router-dom";

function Chatrooms() {
    const user = useSelector(state => state.user);
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [name, setName] = useState('');

    useEffect(() => {
        if (user.value === null) {
            navigate("/");
        }
        getRooms();
        // eslint-disable-next-line
    }, [user]);

    function getRooms() {
        const roomsCountRef = ref(database, 'rooms/');
        onValue(roomsCountRef, (snapshot) => {
            const data = snapshot.val();
            let list = data ? Object.values(data).map((el, i) => ({ ...el, id: Object.keys(data)[i] })) : [];
            dispatch(setRooms(list));
        })
    }

    async function createRoom(input) {
        const roomRef = ref(database, 'rooms/');
        const newRoomRef = await push(roomRef);
        set(newRoomRef, {
            name: input,
            admin: user.value.email,
            messages: {}
        })
    }

    async function deleteRoom(input) {
        await set(ref(database, 'rooms/' + input), {
            name: null,
            admin: null
        })
    }

    return (
        <div className="container-rooms">
            <Header />
            <div className="container-chatrooms">
                <div className="chatroom-title">Chatter Rooms</div>
                <div className="container-main">
                    <div className="rooms-main">
                        {rooms.value === null && <div className="loading">Loading...</div>}
                        {rooms.value !== null && rooms.value.map((el) => <Link to={`/chatrooms/${el.id}`} key={el.id}>
                            <div className="room-item" key={el.id} >
                                <div className="delete-room" style={{ display: user.value.email !== el.admin && 'none' }} onClick={async (e) => {
                                    e.preventDefault();
                                    await deleteRoom(el.id);
                                }}>✕</div>
                                <div className="room-name">{el.name}</div>
                                <div className="room-admin">Admin: {el.admin}</div>
                            </div>
                        </Link>)}
                    </div>
                    <div className="input-row">
                        <input type="text" className="input-bar" value={name} onChange={(ev) => setName(ev.target.value)} onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                if (name.length > 0) createRoom(name);
                                setName('');
                            }
                        }} />
                        <button className="add-btn" onClick={() => {
                            if (name.length > 0) {
                                createRoom(name);
                                setName('');
                            }
                        }}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatrooms;