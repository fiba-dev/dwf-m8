import React from "react";
import { IconDesktop } from "../icons";
import css from "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, SessionButton } from "../buttons";
import { useUserData, getReportedPets, useReportedPets } from "../../../hooks";

function DesktopMenu() {
  let [resultado, setResultado] = useReportedPets();
  const [userData, setuserData] = useUserData();
  const navigate = useNavigate();
  let login = "";
  let email = "";
  let handlerLogin = "";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER DEL HEADER", user);

  if (user) {
    if (user.token != null && user.email != "") {
      login = "Cerrar Sesión";
      email = user.email;
    } else {
      login = "Iniciar Sesion";
      email = "";
    }
  } else {
    login = "Iniciar Sesion";
    email = "";
  }
  const handlerSession = () => {
    if (user) {
      if (user.token && user.email) {
        console.log("borrando localstorage");
        localStorage.removeItem("user");
        setuserData({ email: "", token: "", password: "" });

        navigate("/");
      } else {
        console.log("ENTRE EN EL PRIMER ELSE");

        navigate("/login/email");
      }
    } else {
      navigate("/login/email");
      console.log("EN EL SEGUNDO ELSE");
    }
  };
  const reportedPet = () => {
    if (user) {
      if (user.token) {
        getReportedPets("asd").then((res) => {
          setResultado(res);
          navigate("/reported-pet");
        });
      } else {
        window.alert(
          "Para obtener sus mascotas reportadas debe iniciar sesion"
        );
        navigate("/login/email");
      }
    } else {
      window.alert("Para obtener sus mascotas reportadas debe iniciar sesion");
      navigate("/login/email");
    }
  };
  const reportPet = () => {
    if (user) {
      if (user.token) {
        navigate("/report-pet");
      } else {
        window.alert("Debe iniciar Sesion para reportar una mascota perdida");
      }
    } else {
      window.alert("Debe iniciar Sesion para reportar una mascota perdida");
      navigate("/login/email");
    }
  };
  const misDatos = () => {
    if (user) {
      if (user.token) {
        navigate("/mis-datos");
      } else {
        window.alert(
          "Para obtener informacion de sus datos debe Iniciar Sesion"
        );
        navigate("/login/email");
      }
    } else {
      window.alert("Para obtener informacion de sus datos debe Iniciar Sesion");
      navigate("/login/email");
    }
  };

  return (
    <div className={css.menu}>
      <IconDesktop onClick={misDatos}>Mis datos </IconDesktop>
      <IconDesktop onClick={reportedPet}> Mis mascotas reportadas </IconDesktop>
      <IconDesktop onClick={reportPet}> Reportar mascotas </IconDesktop>
      <div className={css.div__email}>
        <h2 className={css.email}>{email}</h2>

        <SessionButton onClick={handlerSession}> {login}</SessionButton>
      </div>
    </div>
  );
}

export { DesktopMenu };
