import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  getRamdomActor,
  getRandomMovieDetails,
} from "./helpers/ApiMoovieDBHelper";

const Game = (props) => {
  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState({});

  useEffect(() => {
    getRamdomActor().then((actor) => setActor(actor));
    getRandomMovieDetails().then((movie) => setMovie(movie));
  }, []);

  const checkResponse = (responseBool) => {
    console.log("responseBool", responseBool);
  };

  console.log("actor", actor);
  console.log("movie", movie);

  return (
    <div>
      <div>actor</div>
      <div>film</div>
      <Button variant="outlined" onClick={checkResponse(true)}>
        Vrai
      </Button>
      <Button variant="outlined" onClick={checkResponse(false)}>
        Faux
      </Button>
    </div>
  );
};

export default Game;
