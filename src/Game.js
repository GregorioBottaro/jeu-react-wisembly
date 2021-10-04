import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Box from '@material-ui/core/Box';
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {
  getRamdomActor,
  getRandomMovieDetails,
} from "./helpers/ApiMoovieDBHelper";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex", 
    alignItems: "center"
  },
  imgHeight:{
    height: 200
  },
  paddingAffiche:{
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
      <div className={classes.mainContainer}>
        {actor && actor.photo && (
          <Box component="div" sx={{ p: 5 }}>
            <img
              src={actor.photo}
              alt="actor_img"
              className={classes.imgHeight}
              />
            <br />
            <span>{actor.name}</span>
          </Box>
        )}
        <span>joue dans </span>
        {movie && movie.couv && (
          <Box component="div" sx={{ p: 5 }}>
            <img
              src={movie.couv}
              alt="movie_couv"
              className={classes.imgHeight}
            />
            <br />
            <span>{movie.title}</span>
          </Box>
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
