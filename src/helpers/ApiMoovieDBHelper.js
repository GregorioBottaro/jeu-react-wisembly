import _ from "lodash";
import { API_KEY_MOVIE_DB, URL_POSTER_PATH_MOVIE, URL_FETCH_API_MOVIES_V3 } from "./constants";

const myInit = {
  method: "GET",
  mode: "cors",
};

const getRamdomActor = async () => {
  // fetch les acteurs populaire
  const actors = await fetch(
    `${URL_FETCH_API_MOVIES_V3}person/popular?api_key=${API_KEY_MOVIE_DB}&language=en-US&page=1`,
    myInit
  ).then((res) => res.json());
  // prendre un acteur random
  const randomActor = actors.results.map((actor) => {
    return {
      name: actor.name,
      photo: URL_POSTER_PATH_MOVIE + actor.profile_path,
    };
  });
  // random entre 0 et 20
  const random_0_20 = parseInt(Math.random() * (20 - 1) + 1);
  return randomActor[random_0_20];
};

const getRandomMovieDetails = async () => {
  //fetch une liste de film
  const moviesList = await fetch(
    `
    ${URL_FETCH_API_MOVIES_V3}list/1?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  // prendre un film random dans la liste
  const randomMovie = _.sample(moviesList.items);
  // fetch ses acteurs
  const movieCredit = await fetch(
    `
    ${URL_FETCH_API_MOVIES_V3}movie/${randomMovie.id}/credits?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  // filtrer pour recup que les acteurs du film
  const movieActors = movieCredit.cast
    .filter((el) => el.known_for_department === "Acting")
    .map((person) => {
      return {
        name: person.name,
        photo: URL_POSTER_PATH_MOVIE + person.profile_path,
      };
    });
  // retourner un objet avec le film, la couv et les acteurs
  return {
    title: randomMovie.title,
    couv: URL_POSTER_PATH_MOVIE + randomMovie.poster_path,
    actors: movieActors,
  };
};

export { getRamdomActor, getRandomMovieDetails };
