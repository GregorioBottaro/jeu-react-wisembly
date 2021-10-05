import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const Timer = (props) => {
  const {
    seconds,
    setSeconds,
    isActive,
    setIsActive,
    setScore,
    score,
    stopGame,
    setStopGame,
  } = props;

  const toggle = () => {
    setIsActive(!isActive);
    setScore(0);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
    setScore(0);
    const scoreStorage = localStorage.getItem("bestScore");
    if (!scoreStorage || scoreStorage < score) {
      localStorage.setItem("bestScore", score);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      if (seconds === 60) {
        reset();
      }
      if (stopGame) {
        reset();
        setStopGame(false);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, stopGame]);

  return (
    <Box component="div" p={10}>
      <div className="time">{seconds}s</div>
      <Button variant="outlined" onClick={toggle} disabled={isActive}>
        Start
      </Button>
      <Button variant="outlined" onClick={reset}>
        Reset
      </Button>
    </Box>
  );
};

export default Timer;
