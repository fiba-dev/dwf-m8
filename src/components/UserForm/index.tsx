import React, { useState } from "react";
import { TextField } from "../ui/text-field";
import { Title } from "../ui/text";
import { Button } from "../ui/buttons";
import css from "./index.css";
import { createUser, editUser } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Json } from "sequelize/dist/lib/utils";

function UserForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});

  let titulo = "";
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.token != undefined) {
      titulo = "Editar Usuario";
      const respuesta = editUser(usuario);
      respuesta.then((res) => {
        console.log("soy el res de respuesta de edit", res);

        if (res != undefined) {
          console.log("ENTRE AL IF DEL UYSERFORM de edituser");
          window.alert("EDITADO CON EXITO");
          navigate("/");
        }
      });
    }
  } else {
    titulo = "Crear Usuario";
    const resultado = createUser(usuario);
    resultado.then((res) => {
      if (res != undefined) {
        console.log("ENTRE AL IF DEL UYSERFORM");

        window.alert("CREADO CON EXITO");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  }

  const handlerUserForm = async (e) => {
    e.preventDefault();
    const fullName = e.target.name.value;
    const password = e.target.password.value;
    const password2 = e.target.repeat_password.value;
    if (password == password2 && fullName != "") {
      setUsuario({ fullName: fullName, password: password });
    } else {
      window.alert("LAS PASSWORD NO COINCIDEN O NOMBRE INCOMPLETO");
    }
  };
  return (
    <div className={css.contenedor}>
      {" "}
      <Title>{titulo} </Title>{" "}
      <form onSubmit={handlerUserForm} className={css.form}>
        {" "}
        <TextField
          placeholder={"NOMBRE"}
          name={"name"}
          type={"name"}
        ></TextField>
        <TextField
          placeholder={"NUEVA CONTRASEÑA"}
          name={"password"}
          type={"password"}
        ></TextField>
        <TextField
          placeholder={"REPETIR CONTRASEÑA"}
          name={"repeat_password"}
          type={"password"}
        ></TextField>
        <Button>Registrar</Button>
      </form>{" "}
    </div>
  );
}

export { UserForm };
