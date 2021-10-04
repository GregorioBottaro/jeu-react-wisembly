import React, { useState, useEffect } from "react";
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
      <span style={{ padding: 50 }}>Best score : {bestScore}</span>
      <br />
      <br />
      <span style={{ padding: 50 }}>Score: {score}</span>
      {isActive && <Game score={score} setScore={setScore} setStopGame={setStopGame} />}
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
