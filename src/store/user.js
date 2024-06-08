import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isCompleted: false,
        lastName: undefined,
        firstName: undefined,
        areYouHappy: undefined,
    },
    reducers: {
        setUser(state, action) {
            state.isCompleted = true;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.areYouHappy = action.payload.areYouHappy;
        },
        logout(state) {
            state.isCompleted = false;
            state.lastName = undefined;
            state.firstName = undefined;
            state.areYouHappy = undefined;
        }
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;