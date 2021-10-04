import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {
  getRamdomActor,
  getRandomMovieDetails,
} from "./helpers/ApiMoovieDBHelper";

const useStyles = makeStyles({
  main_container: {
    display: "flex", 
    alignItems: "center"
  },
  img_height:{
    height: 200
  },
  padding_affiche:{
    padding: 20
  },
});

const Game = (props) => {
  const { score, setScore } = props;

  const classes = useStyles();

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
      <div className={classes.main_container}>
        {actor && actor.photo && (
          <div className={classes.padding_affiche}>
            <img
              src={actor.photo}
              alt="actor_img"
              className={classes.img_height}
            />
            <br />
            <span>{actor.name}</span>
          </div>
        )}
        <span>joue dans </span>
        {movie && movie.couv && (
          <div className={classes.padding_affiche}>
            <img
              src={movie.couv}
              alt="movie_couv"
              className={classes.img_height}
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
