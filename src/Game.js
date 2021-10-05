import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@material-ui/core/Box";
import sample from "lodash/sample";
import find from "lodash/find";
import { URL_POSTER_PATH_MOVIE } from "./helpers/constants";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  imgHeight: {
    height: 200,
  },
});

const Game = (props) => {
  const { score, setScore, setStopGame, movies, actors } = props;

  const classes = useStyles();

  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState({});
  const [activeUseEffect, setActiveUseEffect] = useState(0);

  useEffect(() => {
    async function setSampleMovie() {
      const randomMovie = sample(movies);
      setMovie(randomMovie);
      return randomMovie;
    }
    setSampleMovie().then((randomMovie) => {
      getRandomActorOrMovieActor(actors, randomMovie).then((actor) =>
        setActor(actor)
      );
    });
  }, [activeUseEffect]);

  const getRandomActorOrMovieActor = async (actors, randomMovie) => {
    const random0or1 = Math.round(Math.random());
    if (random0or1 === 0) {
      const randomActorMovie = sample(randomMovie.cast);
      return randomActorMovie;
    } else {
      const randomActor = sample(actors);
      return randomActor;
    }
  };

  const checkResponse = async (responseBool) => {
    const isActing = find(movie.cast, { id: actor.id }) ? true : false;
    if (isActing === responseBool) {
      setScore(score + 1);
    } else {
      setStopGame(true);
    }
    setActiveUseEffect(activeUseEffect + 1);
  };

  return (
    <Box component="div" p={10}>
      <div className={classes.mainContainer}>
        {actor && actor.profile_path && (
          <Box component="div" p={5}>
            <img
              src={URL_POSTER_PATH_MOVIE + actor.profile_path}
              alt="actor_img"
              className={classes.imgHeight}
            />
            <br />
            <span>{actor.name}</span>
          </Box>
        )}
        <span>joue dans </span>
        {movie && movie.poster_path && (
          <Box component="div" p={5}>
            <img
              src={URL_POSTER_PATH_MOVIE + movie.poster_path}
              alt="poster_path"
              className={classes.imgHeight}
            />
            <br />
            <span>{movie.title}</span>
          </Box>
        )}
        <span>? </span>
      </div>
      <Button variant="outlined" onClick={() => checkResponse(true)}>
        Vrai
      </Button>
      <Button variant="outlined" onClick={() => checkResponse(false)}>
        Faux
      </Button>
    </Box>
  );
};

export default Game;
