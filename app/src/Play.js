import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Game from "./Game";
import Timer from "./Timer";

const Play = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div>
      <span style={{ padding: 50 }}>Score: {score}</span>
      <Game score={score} setScore={setScore} />
      <br />
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Play;
