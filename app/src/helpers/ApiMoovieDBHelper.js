import { API_KEY_MOVIE_DB, URL_POSTER_PATH_MOVIE } from "./constants";

const myInit = {
  method: "GET",
  mode: "cors",
};

const getRamdomActor = async () => {
  // random entre 0 et 20
  const random_0_20 = parseInt(Math.random() * (200 - 1) + 1);
  // fetch un acteur random
  const actor = await fetch(
    `
    https://api.themoviedb.org/3/person/${random_0_20}?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  console.log("actor", {
    name: actor.name,
    photo: URL_POSTER_PATH_MOVIE + actor.profile_path,
  });
  // return son nom et photo
  return {
    name: actor.name,
    photo: URL_POSTER_PATH_MOVIE + actor.profile_path,
  };
};

const getRandomMovieDetails = async () => {
  // random entre 0 et 200 pour id movie
  const random_0_200 = parseInt(Math.random() * (200 - 1) + 1);
  // fetch un film
  const movie = fetch(
    `
    https://api.themoviedb.org/3/movie/${random_0_200}?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  // fetch ses acteurs
  const movieCredit = fetch(
    `
    https://api.themoviedb.org/3/movie/${random_0_200}/credits?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  // lancer les deux fetch en parrallele pour performance
  const results = await Promise.all([movie, movieCredit]);
  // desfois l'api ne retourne rien, dans ce cas je relance la fonction
  if (results[0].success === false) {
    getRandomMovieDetails();
    return null;
  }
  // filtrer pour recup que les acteurs du film
  const movieActors = results[1].cast
    .filter((el) => el.known_for_department === "Acting")
    .map((person) => {
      return {
        name: person.name,
        photo: URL_POSTER_PATH_MOVIE + person.profile_path,
      };
    });
  // retourner un objet avec le film, la couv et les acteurs
  console.log("movie", {
    title: results[0].title,
    couv: URL_POSTER_PATH_MOVIE + results[0].poster_path,
    actors: movieActors,
  });
  return {
    title: results[0].title,
    couv: URL_POSTER_PATH_MOVIE + results[0].poster_path,
    actors: movieActors,
  };
};

export { getRamdomActor, getRandomMovieDetails };
