import React from "react";
const BreakComponent = props => {
  return (
    <div className="break">
      <h2 id="break-label">Break Length</h2>
      <button
        className="button btn-brk"
        onClick={props.incLength}
        id="break-increment"
      >
        BI
      </button>
      <h4 className="brk-display" id="break-length">
        {" "}
        {props.breaklength}
      </h4>
      <button className="button" onClick={props.decLength} id="break-decrement">
        BD
      </button>
    </div>
  );
};

export default BreakComponent;
