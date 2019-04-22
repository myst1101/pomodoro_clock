import React from "react";

const Timer = props => {
  return (
    <div className="timerbox">
      <h4 className="timer-title" id="timer-label">
        {props.timertype}
      </h4>
      <h2 className="timerbox-title" style={props.warncolor} id="time-left">
        {props.clock}
      </h2>
    </div>
  );
};

export default Timer;
