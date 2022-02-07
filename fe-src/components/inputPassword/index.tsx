import React, { useEffect, useState } from "react";
import { TextField } from "../ui/text-field";
import { Title } from "../ui/text";
import { Button, UnpublishButton } from "../ui/buttons";
import { useVerifyPassword, getPassword, useUserData } from "../../hooks";
import { useNavigate } from "react-router-dom";
import css from "./index.css";

function InputPassword(props) {
  const navigate = useNavigate();
  const [user, setUser] = useUserData();
  const [password, setPassword] = useState("");
  const resultado = useVerifyPassword(password);
  resultado.then((res) => {
    if (res != undefined) {
      if (res == false) {
        window.alert("contraseña incorrecta");
      } else {
        navigate("/");
      }
    }
  });

  const handlerNewPassword = async (res) => {
    res.preventDefault();
    console.log("soy recuperar password", user);
    let result = window.confirm(
      `Desea Recibir una nueva contraseña en su Email:${user.email}?`
    );
    if (result == true) {
      getPassword(user).then((res) => {
        window.alert("Se envio un correo con su contraseña");
        setUser({ email: "", token: "", password: "" });
        navigate("/");
      });
    }
  };

  const handlerPassword = async (e) => {
    e.preventDefault();
    console.log("soy password", e.target.password.value);
    setPassword(e.target.password.value);
  };
  return (
    <div className={css.container}>
      {" "}
      <Title>Login</Title>
      <form className={css.form} onSubmit={handlerPassword}>
        {" "}
        <TextField
          name={"password"}
          placeholder={"CONTRASEÑA"}
          type={"password"}
        ></TextField>
        <UnpublishButton onClick={handlerNewPassword}>
          Olvide la Contraseña
        </UnpublishButton>
        <Button>Ingresar</Button>
      </form>
    </div>
  );
}

export { InputPassword };
