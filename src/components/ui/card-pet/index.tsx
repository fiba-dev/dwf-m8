import React, { useState } from "react";
import css from "./index.css";
import { Link } from "react-router-dom";
import { Title, Subtitle } from "../text";
import { ImagePreview } from "../imagePreview";

let lapizURL =
  "https://res.cloudinary.com/fiba06-dev/image/upload/v1644189278/dwf-m8/lapiz_qyyu1q.png";

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
