import React from "react";
import { CloseButton, SessionButton } from "../buttons";
import { IconMobile } from "../icons";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks";
import { Title2 } from "../text";

function LoadingWindows(props) {
  return (
    <div className={css.ventana}>
      <Title2> CARGANDO</Title2>
    </div>
  );
}
export { LoadingWindows };
