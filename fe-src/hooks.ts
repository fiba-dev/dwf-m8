import react from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
  useSetRecoilState,
  RecoilState,
} from "recoil";
import { Navigate, useParams } from "react-router-dom";

export const useUserData = () => useRecoilState(userState);

export const useLoc = () => useRecoilState(locState);
export const usePetData = () => useRecoilState(petData);
export const useReportedPets = () => useRecoilState(reportedPets);
const reportedPets = atom({ key: "reportedPets", default: [] });
const userState = atom({
  key: "user",
  default: { email: "", token: "", password: "" },
});

const locState = atom({
  key: "loc",
  default: [0, 0],
});

const petData = atom({
  key: "petData",
  default: { id: "", petName: "", loc: [], search: "", imagen: "", estado: "" },
});

const queryState = atom({
  key: "query",

  default: "",
});
//VERIFICA QUE EL EMAIL EXISTA
const verifyEmail = selector({
  key: "emailCheck",
  get: async ({ get }) => {
    const user = get(userState);

    console.log("SOY VALOR DE QUERY en email", user);

    if (user.email) {
      console.log("ENTRE AL QUERY DEL IF");

      const res = await fetch("/email?email=" + user.email);
      const data = await res.json();
      console.log("soy return data", data);

      return data;
    } else return null;
  },
});
export function useVerifyEmail(params) {
  const setRecoilQuery = useSetRecoilState(userState);

  const results = useRecoilValue(verifyEmail);
  useEffect(() => {
    setRecoilQuery((userState) => {
      return {
        email: params,
        token: userState.token,
        password: userState.password,
      };
    });
  }, [params]);

  return results;
}
//VERIFICA QUE LA CONTRASEÑA SEA CORRECTA
export async function useVerifyPassword(params) {
  const [user, setUser] = useRecoilState(userState);
  if (params) {
    const res = await fetch("/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: params,
      }),
    });

    const data = await res.json();

    console.log("soy data antes de salir", data);
    const usuario = { email: user.email, token: data.token, password: params };
    localStorage.setItem("user", JSON.stringify(usuario));

    return data;
  } else {
    console.log("aun no hay params");
  }
}
//REPORTA MASCOTA PERDIDA
export async function reportPet(params) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = "bearer " + user.token;
  console.log("soy pet y estos son los params", params);
  console.log("y este es user", user);
  console.log("yo soy el token", user.token);
  console.log("soy imgagen", params.imagen);

  console.log("loc", params.loc[0], params.loc[1]);

  const resultado = await fetch("/user/report", {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      name: params.petName,
      loc: params.loc,
      search: params.search,
      imagen: params.imagen,
      email: user.email,
    }),
  });

  const data = await resultado.json();
  console.log("soy data de report pet", data);

  return data;
}
//ENVIA UN EMAIL PARA RESTAURAR TU CONTRASEÑA
export async function getPassword(params) {
  const resultado = await fetch("/user/password" + "?email=" + params.email, {
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await resultado.json();

  return data;
}
//OBTIENE LAS MASCOTAS REPORTADAS POR EL USUARIO
export async function getReportedPets(params) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("soy user");

  const token = "bearer " + user.token;
  const resultado = await fetch("/me/reported?email=" + user.email, {
    headers: {
      authorization: token,
    },
  });
  const data = await resultado.json();
  console.log("soy data de pets", data);

  return data;
}
//ELIMINA LA MASCOTA REPORTADA POR EL USUARIO
export async function deletePet(params) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = "bearer " + user.token;
  const res = await fetch("/user/pet?id=" + params.id, {
    method: "delete",
    headers: {
      authorization: token,
    },
  });

  const data = await res.json();

  return data;
}
//CREA UN USUARIO
export async function createUser(params) {
  const [user, setUser] = useRecoilState(userState);
  if (user.email && params.password) {
    console.log("ENTRE AL QUERY DEL if del create user", params);
    const res = await fetch("/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: params.fullName,
        email: user.email,
        password: params.password,
      }),
    });
    const data = await res.json();

    console.log("DATA ", data);
    setUser({ email: "", token: "", password: "" });
    return data;
  } else {
    console.log("no hay user.email", user);
  }
}
//EDITA NOMBRE Y CONTRASEÑA DEL USUARIO
export async function editUser(params) {
  console.log("soy params de edituser antes de entrar", params);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("soy user del edituser", user);

  if (params.fullName && params.password) {
    console.log("entre al if de edit", user, params);
    const token = "bearer " + user.token;

    const res = await fetch("/user/edit", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        fullName: params.fullName,
        email: user.email,
        password: params.password,
      }),
    });
    const data = await res.json();
    return data;
  } else {
    return console.log("no entre en el fecth del edituser");
  }
}
//EDITA LA MASCOTA REPORTADA POR EL USUARIO
export async function editPet(params) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("soy edit pet", params, user);
  const token = "bearer " + user.token;
  const res = await fetch("/pet/edit", {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      id: params.id,

      name: params.petName,
      loc: params.loc,
      search: params.search,
      imagen: params.imagen,
      email: user.email,
      estado: params.estado,
    }),
  });

  const data = await res.json();

  return data;
}
//ENVIA EMAIL CON LA INFORMACION DE DONDE VIERON LA MASCOTA 
export async function petInfo(params) {
  const res = await fetch("/user/report-info", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
      donde: params.donde,
      name: params.name,

      telefono: params.telefono,
    }),
  });

  const data = await res.json();

  return data;
}
//OBTIENE LAS MASCOTAS REPORTADAS CERCANAS AL USUARIO
export async function petCercanas(params) {
  console.log("YO SOY LOC", params);

  if (params != undefined) {
    const res = await fetch(
      "/pets-cerca-de" + "?lat=" + params[0] + "&lng=" + params[1],
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await res.json();

    console.log("Soy data de pet cercanas", data);

    return data;
  } else {
    throw "No Hay ubicacion";
  }
}
