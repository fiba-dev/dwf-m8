import React from "react";
import css from "./index.css";
function Title(props) {
  return <h1 className={css.title}>{props.children}</h1>;
}
function Subtitle(props) {
  return <h1 className={css.subTitle}>{props.children}</h1>;
}
function Title2(props) {
  return <h1 className={css.title2}>{props.children}</h1>;
}

export { Title, Subtitle, Title2 };
