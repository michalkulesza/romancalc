import React from "react";

function Button(props) {
  return (
    <div className="button smallButton" onClick={props.handleButton}>
      {props.children}
    </div>
  );
}

export default Button;
