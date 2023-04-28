import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalInformation: []
}

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        addPersonalInfoFunc : (state, action) => {
            return {
                ...state, personalInformation: action.payload}
        }
    }
})

export default profileSlice.reducer;
export const { addPersonalInfoFunc } = profileSlice.actions;