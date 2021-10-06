import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Game from "./Game";
import Timer from "./Timer";
import HowPlay from "./HowPlay";
import { initializeGame } from "./helpers/ApiMoovieDBHelper";

const Play = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state);
  const { movies } = useSelector((state) => state);
  const { actors } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: "SET_LOADING_GAME" });
    initializeGame().then((res) => {
      dispatch({
        type: "FILL_MOVIES",
        movies: res.movies,
      });
      dispatch({
        type: "FILL_ACTORS",
        actors: res.actorsWithNoMovie,
      });
      dispatch({ type: "SET_LOADING_GAME" });
    });
    const bestScoreStorage = localStorage.getItem("bestScore");
    setBestScore(bestScoreStorage);
  }, [isActive]);

  return (
    <div>
      {loading.loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Box component="span" p={10}>
            Best score : {bestScore}
          </Box>
          <br />
          <br />
          <Box component="span" p={10}>
            Score: {score}
          </Box>
          {isActive && (
            <Game
              score={score}
              setScore={setScore}
              setStopGame={setStopGame}
              movies={movies}
              actors={actors}
            />
          )}
          <br />
          {!isActive && <HowPlay />}
          <Timer
            isActive={isActive}
            setIsActive={setIsActive}
            setScore={setScore}
            score={score}
            stopGame={stopGame}
            setStopGame={setStopGame}
          />
        </div>
      )}
    </div>
  );
};

export default Play;
