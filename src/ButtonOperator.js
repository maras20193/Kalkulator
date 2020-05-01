import React from "react";

const ButtonOperator = (props) => {
  return (
    <>
      <button
        className="button"
        value={props.title}
        onClick={props.handle}
        key={props.title}
      >
        {props.title}{" "}
      </button>{" "}
    </>
  );
};

export default ButtonOperator;
