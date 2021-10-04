import React, { useState, useEffect } from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {
  getRamdomActor,
  getRandomMovieDetails,
} from "./helpers/ApiMoovieDBHelper";

const Game = (props) => {
  const { score, setScore } = props;

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
      <div style={{ display: "flex", alignItems: "center" }}>
        {actor && actor.photo && (
          <div className="actor_container" style={{ padding: 20 }}>
            <img
              src={actor.photo}
              alt="actor_img"
              style={{ height: "200px" }}
            />
            <br />
            <span>{actor.name}</span>
          </div>
        )}
        <span>joue dans </span>
        {movie && movie.couv && (
          <div className="movie_container" style={{ padding: 20 }}>
            <img
              src={movie.couv}
              alt="movie_couv"
              style={{ height: "200px" }}
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
