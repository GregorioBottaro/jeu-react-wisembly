import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Game from "./Game";
import Timer from "./Timer";


const Play = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const bestScoreStorage = localStorage.getItem("bestScore");
    setBestScore(bestScoreStorage);
  }, [isActive]);

  return (
    <div>
      <Box component="span" sx={{ p: 10 }}>
        Best score : {bestScore}
      </Box>
      <br />
      <br />
      <Box component="span" sx={{ p: 10 }}>
        Score: {score}
      </Box>
      {isActive && <Game score={score} setScore={setScore} />}
      <br />
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        isActive={isActive}
        setIsActive={setIsActive}
        setScore={setScore}
        score={score}
        stopGame={stopGame}
        setStopGame={setStopGame}
      />
    </div>
  );
};

export default Play;
