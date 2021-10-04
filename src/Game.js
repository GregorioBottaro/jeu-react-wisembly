import React, { useState, useEffect } from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from '@mui/styles';
import {
  getRamdomActor,
  getRandomMovieDetails,
} from "./helpers/ApiMoovieDBHelper";

const useStyles = makeStyles(() =>
  createStyles({
    rootContainer: {
      display: "flex", 
      alignItems: "center"
    },
    padding_container: {
      padding: 20,
    },
    height_img: {
      height: 200
    }
  }),
);

const Game = (props) => {
  const { score, setScore } = props;
  const classes = useStyles()

  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState({});
  const [activeUseEffect, setActiveUseEffect] = useState(0);

  useEffect(() => {
    getRandomMovieDetails().then((movie) => {
      setMovie(movie);
      getRandomActorApiOrMovieActorApi(movie).then((actor) => setActor(actor));
    });
  }, [activeUseEffect]);

  const getRandomActorApiOrMovieActorApi = async (movie) => {
    const random0or1 = Math.round(Math.random());
    if (random0or1 === 0) {
      return getRamdomActor();
    } else {
      const randomActor = _.sample(movie.actors);
      return randomActor;
    }
  };

  const checkResponse = async (responseBool) => {
    const isActing = movie.actors.includes(actor);
    if (isActing === responseBool) {
      setScore(score + 1);
    }
    setActiveUseEffect(activeUseEffect + 1);
  };

  return (
    <div>
      <div className={classes.rootContainer}>
        {actor && actor.photo && (
          <div className={classes.padding_container}>
            <img
              src={actor.photo}
              alt="actor_img"
              className={classes.height_img}
            />
            <br />
            <span>{actor.name}</span>
          </div>
        )}
        <span>joue dans </span>
        {movie && movie.couv && (
          <div className={classes.padding_container} >
            <img
              src={movie.couv}
              alt="movie_couv"
              className={classes.height_img}
            />
            <br />
            <span>{movie.title}</span>
          </div>
        )}
        <span>? </span>
      </div>
      <Button
        variant="outlined"
        onClick={() => checkResponse(true)}
      >
        Vrai
      </Button>
      <Button
        variant="outlined"
        onClick={() => checkResponse(false)}
      >
        Faux
      </Button>
    </div>
  );
};

export default Game;
