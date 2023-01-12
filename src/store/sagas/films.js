import { call, put, takeEvery } from "redux-saga/effects";

import {
  loadFilms as loadFilmsAction,
  loadFilmsSuccess,
  loadFilmsError,
} from "../films";
import { fetchFilms } from "./api";

function* loadFilms({ payload }) {
  try {
    let results = {};
    for (let url of payload) {
      const response = yield call(fetchFilms, url);
      results[url] = response.data;
    }

    yield put(loadFilmsSuccess(results));
  } catch (e) {
    yield put(loadFilmsError(e));
  }
}

export function* watchFilms() {
  yield takeEvery(loadFilmsAction, loadFilms);
}
