import React from "react";
import { LoginEmail } from "../LoginEmail";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../../components/UserForm";
import { InputEmail } from "../../components/inputEmail";

function MisDatos(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.token != null && user.email != "") {
      return <UserForm></UserForm>;
    } else {
      return <InputEmail></InputEmail>;
    }
  } else {
    return <InputEmail></InputEmail>;
  }
}

export { MisDatos };
