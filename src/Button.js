import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className="button"
        value={props.title}
        onClick={props.handle}
        key={props.title}
        data-type={props.type}
      >
        {props.title}{" "}
      </button>{" "}
    </>
  );
};

export default Button;
