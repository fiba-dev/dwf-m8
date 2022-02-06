import React, { useState } from "react";
import css from "./index.css";
import { Link } from "react-router-dom";
import { Title, Subtitle } from "../text";
import { ImagePreview } from "../imagePreview";

let pictureURL = "http://127.0.0.1:3003/fe-src/components/img/picture.png";
let lapizURL = "http://127.0.0.1:3003/fe-src/components/img/lapiz.png";
const handlerClick = (e) => {
  e.preventDefault();
  console.log("soy click de imagen");
};
function CardReportedPet(props) {
  return (
    <div className={css.container}>
      <a>
        <img
          onClick={props.handlerImage}
          src={props.pictureURL}
          className={css.imagen}
        ></img>
      </a>
      <div className={css.info_container}>
        <div className={css.info}>
          <Title>{props.petName}</Title>
          <Subtitle>{props.search}</Subtitle>
        </div>
        <button
          onClick={props.handlerInfo}
          name={props.petName}
          id={props.id}
          className={css.informacion}
        >
          Reportar Informacion
        </button>
      </div>
    </div>
  );
}

function MyReportedPets(props) {
  console.log("soy my reportedpets", props.handlerImage);

  return (
    <div className={css.container}>
      <a>
        <img
          onClick={props.handlerImage}
          src={props.pictureURL}
          className={css.imagen}
        ></img>
      </a>
      <div className={css.info_container}>
        <div className={css.info}>
          <Title>{props.petName}</Title>
          <Subtitle>{props.search}</Subtitle>
        </div>
        <button onClick={props.onClick} className={css.button}>
          {" "}
          <img id={props.id} src={lapizURL}></img>
        </button>
      </div>
    </div>
  );
}
export { CardReportedPet, MyReportedPets };
