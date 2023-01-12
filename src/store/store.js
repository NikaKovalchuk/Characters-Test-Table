import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import characterReducer from "./character";
import filmReducer from "./films";
import rootSaga from "./sagas/root";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  characters: characterReducer,
  films: filmReducer,
  reducer: combineReducers({
    characters: characterReducer,
    films: filmReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
