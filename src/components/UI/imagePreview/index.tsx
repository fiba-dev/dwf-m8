import React from "react";
import { CloseButton, SessionButton } from "../buttons";
import { IconMobile } from "../icons";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks";

function ImagePreview(props) {
  const navigate = useNavigate();

  console.log("Soy el estadp de imagenesu", props);

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
