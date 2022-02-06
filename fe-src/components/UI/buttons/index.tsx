import React from "react";
import css from "./index.css";
import { Link } from "react-router-dom";

function Button(props) {
  return (
    <button onClick={props.onClick} className={css.boton}>
      {props.children}
    </button>
  );
}
function CancelButton(props) {
  return (
    <button className={css.cancel__button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function MenuButton(props) {
  return (
    <button className={css.button__menu} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function CloseButton(props) {
  return (
    <button className={css.close__menu} onClick={props.onClick}>
      X
    </button>
  );
}
function SessionButton(props) {
  return (
    <button className={css.session} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
function UnpublishButton(props) {
  return (
    <button className={css.unpublish} onClick={props.onClick}>
      {" "}
      {props.children}
    </button>
  );
}
function FoundButton(props) {
  return (
    <button className={css.found} onClick={props.onClick}>
      {" "}
      {props.children}
    </button>
  );
}
export {
  Button,
  MenuButton,
  CloseButton,
  SessionButton,
  CancelButton,
  UnpublishButton,
  FoundButton,
};
