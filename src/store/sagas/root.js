import { watchFilms } from "./films";
import { watchCharacters } from "./characters";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([watchCharacters(), watchFilms()]);
}
