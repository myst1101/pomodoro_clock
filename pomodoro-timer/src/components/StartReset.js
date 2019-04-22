import React from "react";

const StartReset = props => {
  return (
    <div>
      <button
        className="button btn-start"
        onClick={props.control}
        id="start_stop"
      >
        {props.render}
      </button>
      <button className="button btn-reset" onClick={props.reset} id="reset">
        Reset
      </button>
    </div>
  );
};
export default StartReset;
