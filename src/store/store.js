import characterReducer from "./character";
import filmReducer from "./films";
import rootSaga from "./sagas/root";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: combineReducers({
    characters: characterReducer,
    films: filmReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
