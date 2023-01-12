import { call, put, takeEvery } from "redux-saga/effects";

import {
  loadCharacters as loadCharactersAction,
  loadCharactersSuccess,
  loadCharactersError,
} from "../character";
import { loadFilms } from "../films";
import { fetchPeople } from "./api";

function* loadCharacters() {
  try {
    let pageSize, pageNumber;
    let currentPage = 1;
    let characters = [];
    //store movies in an object to ensure unique entities
    let filmList = {};

    do {
      const response = yield call(fetchPeople, currentPage);
      let newCharacters = response.data.results;

      //go throw movies of each user to create a complete list of films to fetch
      newCharacters.forEach((user) => {
        user.films.forEach((film) => {
          filmList[film] = film;
        });
      });

      characters = characters.concat(newCharacters);

      if (!pageNumber)
        pageNumber = Math.ceil(response.data.count / newCharacters.length);
      if (!pageSize) pageSize = newCharacters.length;

      currentPage++;
    } while (currentPage <= pageNumber);

    //fetch films
    yield put(loadFilms(Object.keys(filmList)));

    yield put(
      loadCharactersSuccess({
        characters: characters,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  } catch (e) {
    yield put(loadCharactersError(e));
  }
}

export function* watchCharacters() {
  yield takeEvery(loadCharactersAction, loadCharacters);
}
