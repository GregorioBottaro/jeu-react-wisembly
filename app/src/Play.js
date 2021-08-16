import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Game from "./Game";
import Timer from "./Timer";

const Play = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("isPlaying", isPlaying);
  return (
    <div>
      {/* {isPlaying ? <Game score={score} setScore={setScore} /> : null} */}
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        isActive={isActive}
        setIsActive={setIsActive}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Play;
