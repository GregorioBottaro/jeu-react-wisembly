import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const Timer = (props) => {
  const { seconds, setSeconds, isActive, setIsActive, setIsPlaying } = props;

  const toggle = () => {
    setIsActive(!isActive);
    setIsPlaying(true);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
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
