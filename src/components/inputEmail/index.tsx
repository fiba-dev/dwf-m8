import React, { useEffect, useState } from "react";
import { TextField } from "../ui/text-field";
import { Button } from "../ui/buttons";
import { useVerifyEmail } from "../../hooks";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { Title } from "../ui/text";

function InputEmail(props) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const resultados = useVerifyEmail(email);
  useEffect(() => {
    if (resultados == true) {
      navigate("/login/password");
    }
    if (resultados == false) {
      navigate("/mis-datos");
    }
  }, [resultados]);

  const handlerEmail = async (e) => {
    e.preventDefault();
    const emailQuery = e.target.email.value;
    setEmail(emailQuery);
  };

  return (
    <div className={css.container}>
      {" "}
      <Title>Login</Title>{" "}
      <form className={css.form} onSubmit={handlerEmail}>
        {" "}
        <TextField
          placeholder={"EMAIL"}
          name={"email"}
          type={"email"}
        ></TextField>
        <Button>Ingresar</Button>
      </form>
    </div>
  );
}

export { InputEmail };
