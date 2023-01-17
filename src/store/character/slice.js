import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  error: "",
  isLoading: false,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    loadCharacters(state) {
      state.isLoading = true;
    },
    loadCharactersSuccess(state, { payload }) {
      state.characters = [...state.characters, ...payload.characters];
      state.isLoading = false;
      state.error = "";
    },
    loadCharactersError(state, { payload }) {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});

export const { loadCharacters, loadCharactersSuccess, loadCharactersError } =
  characterSlice.actions;
export default characterSlice.reducer;
