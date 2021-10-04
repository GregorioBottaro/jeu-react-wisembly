import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Game from "./Game";
import Timer from "./Timer";

const useStyles = makeStyles({
  padding_socre: {
    padding: 50
  },
});

const Play = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const bestScoreStorage = localStorage.getItem("bestScore");
    setBestScore(bestScoreStorage);
  }, [isActive]);

  return (
    <div>
      <span className={classes.padding_socre}>Best score : {bestScore}</span>
      <br />
      <br />
      <span className={classes.padding_socre}>Score: {score}</span>
      {isActive && <Game score={score} setScore={setScore} />}
      <br />
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        isActive={isActive}
        setIsActive={setIsActive}
        setScore={setScore}
        score={score}
      />
    </div>
  );
};

export default Play;
