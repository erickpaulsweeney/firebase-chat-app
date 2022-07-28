import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user-info',
    initialState: {
        value: null
    },
    reducers: {
        signin: (state, action) => {
            state.value = action.payload;
        },
        signout: (state) => {
            state.value = null;
        }
    }
})

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;