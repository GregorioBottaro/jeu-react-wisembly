// import sample from "lodash/sample";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import find from "lodash/find";
import {
  API_KEY_MOVIE_DB,
  // URL_POSTER_PATH_MOVIE,
  URL_FETCH_API_MOVIES_V3,
} from "./constants";

const myInit = {
  method: "GET",
  mode: "cors",
};

// const getRamdomActor = async () => {
//   // fetch les acteurs populaire
//   const actors = await fetch(
//     `${URL_FETCH_API_MOVIES_V3}person/popular?api_key=${API_KEY_MOVIE_DB}&language=en-US&page=1`,
//     myInit
//   ).then((res) => res.json());
//   // prendre un acteur random
//   const randomActor = actors.results.map((actor) => {
//     return {
//       name: actor.name,
//       photo: URL_POSTER_PATH_MOVIE + actor.profile_path,
//     };
//   });
//   // random entre 0 et 20
//   const random_0_20 = parseInt(Math.random() * (20 - 1) + 1);
//   return randomActor[random_0_20];
// };

// const getRandomMovieDetails = async () => {
//   //fetch une liste de film
//   const moviesList = await fetch(
//     `
//     ${URL_FETCH_API_MOVIES_V3}list/1?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
//     myInit
//   ).then((res) => res.json());
//   // prendre un film random dans la liste
//   const randomMovie = sample(moviesList.items);
//   // fetch ses acteurs
//   const movieCredit = await fetch(
//     `
//     ${URL_FETCH_API_MOVIES_V3}movie/${randomMovie.id}/credits?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
//     myInit
//   ).then((res) => res.json());
//   // filtrer pour recup que les acteurs du film
//   const movieActors = movieCredit.cast
//     .filter((el) => el.known_for_department === "Acting")
//     .map((person) => {
//       return {
//         name: person.name,
//         photo: URL_POSTER_PATH_MOVIE + person.profile_path,
//       };
//     });
//   // retourner un objet avec le film, la couv et les acteurs
//   return {
//     title: randomMovie.title,
//     couv: URL_POSTER_PATH_MOVIE + randomMovie.poster_path,
//     actors: movieActors,
//   };
// };

const getActorsListWithImg = async () => {
  // fetch les 3 premieres pages d'acteurs
  let actorsArr = [];
  let n = 1;
  while (n < 12) {
    // fetch les acteurs populaire
    const actors = await fetch(
      `${URL_FETCH_API_MOVIES_V3}person/popular?api_key=${API_KEY_MOVIE_DB}&language=en-US&page=${n}`,
      myInit
    ).then((res) => res.json());
    actorsArr.push(actors.results);
    n++;
  }
  // Assembler les listes
  const actorsflatten = uniq(flatten(actorsArr));
  const actorsWithImg = actorsflatten.filter(
    (actor) => actor.profile_path && actor.profile_path.length > 0
  );
  return actorsWithImg;
};

const getMoviesAndCast = async () => {
  // fetch une liste de film
  const moviesListRes = await fetch(
    `
  ${URL_FETCH_API_MOVIES_V3}list/1?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
    myInit
  ).then((res) => res.json());
  // Recup juste la liste
  const moviesList = moviesListRes.items;
  // Fetch les acteurs des films et les intégré dans les objets film
  const promiseMovies = await moviesList.map(async (movie) => {
    // fetch cast
    const movieCredit = await fetch(
      `
    ${URL_FETCH_API_MOVIES_V3}movie/${movie.id}/credits?api_key=${API_KEY_MOVIE_DB}&language=en-US`,
      myInit
    ).then((res) => res.json());
    const actorsWithImg = movieCredit.cast.filter(
      (actor) => actor.profile_path && actor.profile_path.length > 0
    );
    return {
      ...movie,
      cast: actorsWithImg,
    };
  });
  const resMovies = await Promise.all(promiseMovies);
  return resMovies;
};

const filterActorNotInMovie = async (actors, movies) => {
  const moviesCast = movies.map((movie) => movie.cast);
  const moviesCastUnion = flatten(moviesCast);

  // filter actors who are not in movie
  const filterActors = actors.filter((actor) =>
    find(moviesCastUnion, { id: actor.id })
  );
  return filterActors;
};

const initializeGame = async () => {
  // fetch movies and cast
  const movies = await getMoviesAndCast();

  // fetch liste des acteurs
  const actors = await getActorsListWithImg();

  // retirer les acteurs qui se trouvent dans les casts des films
  const actorsWithNoMovie = await filterActorNotInMovie(actors, movies);

  return {
    movies,
    actorsWithNoMovie,
  };
};

export { initializeGame };
