import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { database } from "../firebase-config";
import { ref, onValue, child, get, set, push } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setMessages } from "../slices/messagesSlice";
import { setRoom } from "../slices/messagesSlice";
import { Link } from "react-router-dom";

function Room(props) {
    let [msg, setMsg] = useState('');
    let { id } = useParams();

    const user = useSelector(state => state.user);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.value === null) {
            navigate("/");
        }
        getRoomName();
        getMessages();
        // eslint-disable-next-line
    }, [navigate, user]);

    async function getRoomName() {
        const dbRef = ref(database);
        const response = await get(child(dbRef, `rooms/${id}`))
        const data = await response.val();
        dispatch(setRoom(data.name));
    }

    function getMessages() {
        const roomsCountRef = ref(database, 'rooms/' + id + '/messages');
        onValue(roomsCountRef, (snapshot) => {
            const data = snapshot.val();
            let list = data ? Object.values(data).map((el, i) => ({ ...el, id: Object.keys(data)[i] })) : [];
            dispatch(setMessages(list));
        })
    }

    async function sendMessage(input) {
        const msgRef = ref(database, 'rooms/' + id + '/messages');
        const newMsgRef = await push(msgRef);
        let today = new Date();
        set(newMsgRef, {
            content: input,
            sender: user.value.email,
            date: `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}, ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`
        })
    }

    async function deleteMessage(input) {
        set(ref(database, 'rooms/' + id + '/messages/' + input), {
            content: null,
            sender: null,
            date: null
        })
    }

    return (
        <div className="container-convo">
            <Header />
            <div className="container-chatrooms">
                <Link to="/chatrooms">
                    <div className="back-btn">🠔</div>
                </Link>

                <div className="chatroom-title">{messages.room}</div>
                <div className="container-main">
                    <div className="chats-main" onLoad={(ev) => {
                        ev.target.scrollTop = ev.target.scrollHeight;
                    }}>
                        {messages.value !== null && messages.value.map((el, idx) => <div key={el.id} className={el.sender === user.value.email ? "chat-item sender" : "chat-item"}>
                            <div className="delete-btn" style={{ display: el.sender !== user.value.email && 'none' }} onClick={() => {
                                deleteMessage(el.id);
                            }}>✕</div>
                            <div className="chat-triangle"></div>
                            <div className="sender-name" style={{ display: el.sender === user.value.email && 'none' }}>{el.sender}</div>
                            <div className="chat-date">{el.date}</div>
                            <div className="content">{el.content}</div>
                        </div>
                        )}
                    </div>
                    <div className="input-row">
                        <input type="text" className="input-bar" value={msg} onChange={(ev) => setMsg(ev.target.value)} onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                if (msg.length > 0) {
                                    sendMessage(msg);
                                    setMsg('');
                                }
                            }
                        }} />
                        <button className="add-btn" onClick={() => {
                            if (msg.length > 0) {
                                sendMessage(msg);
                                setMsg('');
                            }
                        }}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;