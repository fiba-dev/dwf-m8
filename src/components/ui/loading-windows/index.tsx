import React from "react";
import css from "./index.css";
import { Title2 } from "../text";

function LoadingWindows(props) {
  return (
    <div className={css.ventana}>
      <Title2> CARGANDO</Title2>
    </div>
  );
}
export { LoadingWindows };
