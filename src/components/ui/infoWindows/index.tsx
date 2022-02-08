import React from "react";
import { CloseButton } from "../buttons";
import { Button } from "../buttons";
import { TextField } from "../text-field";
import { Title2 } from "../text";
import css from "./index.css";
import { useNavigate } from "react-router-dom";

function InfoWindows(props) {
  return (
    <>
      {" "}
      {props.estadoWindows && (
        <div className={css.ventana}>
          <CloseButton
            onClick={() => {
              props.cambiarEstadoWindows(!props.estadoWindows);
            }}
          ></CloseButton>
          <form onSubmit={props.onSubmit} className={css.ventanaInfo}>
            <Title2>Reportar Informacion de {props.petName}</Title2>
            <TextField name="name" placeholder={"Nombre"}></TextField>
            <TextField name="telefono" placeholder={"Telefono"}></TextField>
            <TextField name="donde" placeholder={"Donde lo Viste"}></TextField>
            <Button>Enviar</Button>
          </form>
        </div>
      )}
    </>
  );
}
export { InfoWindows };
