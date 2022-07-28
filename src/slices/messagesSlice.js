import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        value: null, 
        room: null
    }, 
    reducers: {
        setMessages: (state, action) => {
            state.value = action.payload;
        }, 
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    }
})

export const { setMessages, setRoom } = messagesSlice.actions;
export default messagesSlice.reducer;