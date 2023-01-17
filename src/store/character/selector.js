import { createSelector } from "reselect";

const getCharacterList = (state) => state.characters.characters;
const getFilms = (state) => state.films.films;

//populate characters with film info
export const getCharactersWithFilms = createSelector(
  [getCharacterList, getFilms],
  (characters, films) => {
    return characters.map((character) => {
      const filmTitleList = Object.keys(films).length
        ? // replace film title while it's loading
          character.films.map((film) => films[film]?.title || "Loading...")
        : [];
      return {
        ...character,
        films: filmTitleList,
      };
    });
  }
);
