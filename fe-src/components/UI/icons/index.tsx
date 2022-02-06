import React from "react";
import css from "./index.css";
import { Link } from "react-router-dom";

function IconMobile(props) {
  return (
    <button className={css.icon__mobile} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
function IconDesktop(props) {
  return (
    <button onClick={props.onClick} id={props.id} className={css.icon__desktop}>
      {props.children}
    </button>
  );
}

function IconStart(props) {
  return <button className={css.header__logo} onClick={props.onClick}></button>;
}

export { IconMobile, IconDesktop, IconStart };
