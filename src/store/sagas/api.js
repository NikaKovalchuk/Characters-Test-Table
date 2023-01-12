import axios from "axios";

const request = axios.create({
  baseURL: "https://swapi.dev/api",
});

export const fetchPeople = (page) =>
  request.get("/people/", { params: { page } });

//use axios.get because we already have prepared urls as param
export const fetchFilms = (url) => axios.get(url);
