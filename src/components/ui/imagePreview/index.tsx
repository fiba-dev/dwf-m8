import React from "react";
import { CloseButton } from "../buttons";
import css from "./index.css";
import { useNavigate } from "react-router-dom";

function ImagePreview(props) {
  return (
    <>
      {" "}
      {props.estado && (
        <div className={css.ventana}>
          <CloseButton
            onClick={() => {
              props.cambiarEstado(!props.estado);
            }}
          ></CloseButton>
          <img src={props.src} className={css.imagen}></img>
        </div>
      )}
    </>
  );
}
export { ImagePreview };
