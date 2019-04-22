import React from "react";
const SessionComponent = props => {
  return (
    <div className="session">
      <h2 id="session-label">Session Length</h2>
      <button className="button" onClick={props.sessInc} id="session-increment">
        SI
      </button>
      <h4 className="ses-display" id="session-length">
        {" "}
        {props.sessionlength}
      </h4>
      <button className="button" onClick={props.sessDec} id="session-decrement">
        SD
      </button>
    </div>
  );
};

export default SessionComponent;
