import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  pageSize: 0,
  pageNumber: 0,
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
      state.characters = state.characters.concat(payload.characters) || [];
      state.pageSize = payload.pageSize;
      state.pageNumber = payload.pageNumber;
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
