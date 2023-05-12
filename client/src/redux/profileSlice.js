import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInformation: [],
  educationInformation: [],
  experienceInformation: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    addPersonalInfoFunc: (state, action) => {
      return {
        ...state,
        personalInformation: action.payload,
      };
    },
    addEducationInfoFunc: (state, action) => {
      return {
        ...state,
        educationInformation: action.payload,
      };
    },
    experienceInfoFunc: (state, action) => {
      return {
        ...state,
        experienceInformation: action.payload,
      };
    },
  },
});

export default profileSlice.reducer;
export const { addPersonalInfoFunc, addEducationInfoFunc, experienceInfoFunc } =
  profileSlice.actions;
