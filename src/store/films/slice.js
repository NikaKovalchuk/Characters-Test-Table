import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  films: {},
  error: "",
  isLoading: false,
};

const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    loadFilms(state) {
      state.isLoading = true;
    },
    loadFilmsSuccess(state, { payload }) {
      state.films = { ...state.films, ...payload };
      state.isLoading = false;
      state.error = "";
    },
    loadFilmsError(state, { payload }) {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});

export const { loadFilms, loadFilmsSuccess, loadFilmsError } =
  filmSlice.actions;
export default filmSlice.reducer;
