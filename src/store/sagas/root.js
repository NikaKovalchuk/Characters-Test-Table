import { loadCharacters as loadCharactersAction } from "../character";
import { loadFilms as loadFilmsAction } from "../films";
import { loadCharacters } from "./characters";
import { loadFilms } from "./films";
import { all } from "redux-saga/effects";
import { takeEvery } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    yield takeEvery(loadFilmsAction, loadFilms),
    yield takeEvery(loadCharactersAction, loadCharacters),
  ]);
}
