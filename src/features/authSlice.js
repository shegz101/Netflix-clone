import { createSlice } from '@reduxjs/toolkit';

//define the initIal state
const initialState = {
  user: null,
  trailer_Id: "",
  user_name: "",
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    trail: (state, action) => {
      state.trailer_Id = action.payload;
    },
    populateUser: (state, action) => {
      state.user_name = action.payload;
    } 
  },
});

export const { login, logout, trail, populateUser } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectId = (state) => state.user.trailer_Id;
export const selectName = (state) => state.user.user_name;



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
