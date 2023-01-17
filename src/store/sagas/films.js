import { loadFilmsSuccess, loadFilmsError } from "../films";
import { fetchFilms } from "./api";
import { call, put, select } from "redux-saga/effects";

export function* loadFilms({ payload: filmUrls }) {
  try {
    const results = {};
    const stateFilms = yield select((state) => state.films.films);

    for (let url of filmUrls) {
      //don't load film if it's already in the system
      if (url in Object.keys(stateFilms)) {
        continue;
      }
      const response = yield call(fetchFilms, url);
      results[url] = response.data;
    }

    yield put(loadFilmsSuccess(results));
  } catch (e) {
    yield put(loadFilmsError(e));
  }
}
