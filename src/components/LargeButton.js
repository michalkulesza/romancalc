import React from "react";

function LargeButton(props) {
  return (
    <div className="button largeButton" onClick={props.handleButton}>
      {props.children}
    </div>
  );
}

export default LargeButton;
