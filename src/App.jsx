import Header from "./components/Header";
import Login from "./components/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

function App() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.value !== null) {
            navigate("/chatrooms");
        }
    }, [navigate, user])

    return (
        <div className="container-all">
            <Header />
            <Login />
        </div>
    );
}

export default App;