import { loadCharactersSuccess, loadCharactersError } from "../character";
import { loadFilms } from "../films";
import { fetchPeople } from "./api";
import { call, put, fork } from "redux-saga/effects";

const getUniqFilmsFromCharacters = (characters) => {
  //store movies in an object to ensure unique entities
  const films = {};

  //go throw movies of each user to create a complete list of films to fetch
  characters.forEach((character) => {
    character.films.forEach((film) => {
      films[film] = film;
    });
  });

  return Object.keys(films);
};

function* loadCharactersForPage(page) {
  try {
    const response = yield call(fetchPeople, page);
    const characters = response.data.results;

    const filmUrls = getUniqFilmsFromCharacters(characters);

    //fetch films
    yield put(loadFilms(filmUrls));

    yield put(loadCharactersSuccess({ characters }));
  } catch (e) {
    yield put(loadCharactersError(e));
  }
}

export function* loadCharacters() {
  try {
    const response = yield call(fetchPeople, 1);
    const characters = response.data.results;

    const filmUrls = getUniqFilmsFromCharacters(characters);

    //fetch films for first page
    yield put(loadFilms(filmUrls));

    const pageSize = characters.length;
    const pageNumber = Math.ceil(response.data.count / pageSize);

    //load other characters
    //skip first page because it's already loaded, start from page 2
    for (let page = 2; page <= pageNumber; page++) {
      yield fork(loadCharactersForPage, page);
    }

    yield put(loadCharactersSuccess({ characters }));
  } catch (e) {
    yield put(loadCharactersError(e));
  }
}
