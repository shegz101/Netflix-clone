import { createSlice } from '@reduxjs/toolkit';

//define the initIal state
const initialState = {
  user: null,
  trailer_Id: "",
  movie_name: "",
  movie_description: "",
  movie_release_date: "",
  movie_language: "",
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
    mname: (state, action) => {
      state.movie_name = action.payload;
    },
    mdescp: (state, action) => {
      state.movie_description = action.payload;
    },
    mdate: (state, action) => {
      state.movie_release_date = action.payload;
    },
    mlang: (state, action) => {
      state.movie_language = action.payload;
    }
  },
});

export const { login, logout, trail, mname, mdescp, mdate, mlang } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectId = (state) => state.user.trailer_Id;
export const selectName = (state) => state.user.movie_name;
export const selectDate = (state) => state.user.movie_release_date;
export const selectDescription = (state) => state.user.movie_description;
export const selectLang = (state) => state.user.movie_language;



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
