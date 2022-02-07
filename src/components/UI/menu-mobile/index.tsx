import React from "react";
import { CloseButton, SessionButton } from "../buttons";
import { IconMobile } from "../icons";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useUserData, useReportedPets, getReportedPets } from "../../../hooks";

function MobileMenu(props) {
  let [resultado, setResultado] = useReportedPets();
  const [userData, setuserData] = useUserData();
  let login = "";
  let email = "";
  let handlerLogin = "";
  const navigate = useNavigate();
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
      if (user.token != "" && user.email != "") {
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
    props.cambiarEstado(!props.estado);
  };
  const reportedPet = () => {
    if (user) {
      if (user.token) {
        getReportedPets("asd").then((res) => {
          setResultado(res);
          navigate("/reported-pet");
          props.cambiarEstado(!props.estado);
        });
      } else {
        window.alert(
          "Para obtener sus mascotas reportadas debe iniciar sesion"
        );
        navigate("/login/email");
        props.cambiarEstado(!props.estado);
      }
    } else {
      window.alert("Para obtener sus mascotas reportadas debe iniciar sesion");
      navigate("/login/email");
      props.cambiarEstado(!props.estado);
    }
  };
  const reportPet = () => {
    if (user) {
      if (user.token) {
        navigate("/report-pet");
        props.cambiarEstado(!props.estado);
      } else {
        window.alert("Debe iniciar Sesion para reportar una mascota perdida");
      }
    } else {
      window.alert("Debe iniciar Sesion para reportar una mascota perdida");
      navigate("/login/email");
      props.cambiarEstado(!props.estado);
    }
  };
  const misDatos = () => {
    if (user) {
      if (user.token) {
        navigate("/mis-datos");
        props.cambiarEstado(!props.estado);
      } else {
        window.alert(
          "Para obtener informacion de sus datos debe Iniciar Sesion"
        );
        navigate("/login/email");
        props.cambiarEstado(!props.estado);
      }
    } else {
      window.alert("Para obtener informacion de sus datos debe Iniciar Sesion");
      navigate("/login/email");
      props.cambiarEstado(!props.estado);
    }
  };

  console.log("Soy el estado del mobile menu", props.estado);

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
          <IconMobile onClick={misDatos}>Mis Datos</IconMobile>
          <IconMobile onClick={reportedPet}>Mis Mascotas Reportadas</IconMobile>
          <IconMobile onClick={reportPet}>Reportar Mascotas </IconMobile>

          <h2 className={css.email}>{email}</h2>

          <SessionButton onClick={handlerSession}> {login}</SessionButton>
        </div>
      )}
    </>
  );
}
export { MobileMenu };
