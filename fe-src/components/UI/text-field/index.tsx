import React from "react";
import estilo from "./index.css";

function TextField(props) {
  return (
    <input
      onChange={props.onChange}
      className={estilo.contentInput}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
    ></input>
  );
}

export { TextField };
