import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roomsReducer from "./slices/roomsSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomsReducer,
        messages: messagesReducer
    },
})

export default store;