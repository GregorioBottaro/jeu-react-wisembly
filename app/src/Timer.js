import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const Timer = (props) => {
  const { seconds, setSeconds, isActive, setIsActive, setScore, score } = props;

  const toggle = () => {
    setIsActive(!isActive);
    setScore(0);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
    setScore(0);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      if (seconds === 60) {
        setSeconds(0);
        setIsActive(false);
        const scoreStorage = localStorage.getItem("bestScore");
        if (!scoreStorage || scoreStorage < score) {
          localStorage.setItem("bestScore", score);
        }
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <div className="time">{seconds}s</div>
      <Button variant="outlined" onClick={toggle} disabled={isActive}>
        Start
      </Button>
      <Button variant="outlined" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default Timer;
