import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        value: null
    },
    reducers: {
        setRooms: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;