// name
// initial state
// reducers - მეთოდები, ანუ actions, რომლებიც initial state-ს ცვლიან
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  surname: null,
  age: null,
  subscribed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.username;
      state.surname = action.payload.name.lastname;
      state.age = action.payload.id;
      state.subscribed = true;
    },
    deleteUser: (state, action) => {},
  },
});

export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;