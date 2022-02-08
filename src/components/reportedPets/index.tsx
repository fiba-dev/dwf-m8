import React, { useState } from "react";
import css from "./index.css";
import { Title, Subtitle } from "../ui/text";
import { ImagePreview } from "../ui/imagePreview";
import { MyReportedPets } from "../ui/card-pet";
import { usePetData, useReportedPets } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";

function ReportedPets(props) {
  const [stateWindows, setStateWindows] = useState(false);

  const navigate = useNavigate();
  let [resultado, setResultado] = useReportedPets();
  let [pet, setPet] = usePetData();

  const editPet = (e) => {
    resultado.map((r) => {
      if (r.id == e.target.id) {
        setPet(r);
        localStorage.setItem("petData", JSON.stringify(r));
        navigate("/edit-pet");
      }
    });
  };

  const [picture, setPicture] = useState("");
  function preview(e) {
    e.preventDefault();
    setPicture(e.target.src);
    setStateWindows(!stateWindows);
  }

  if (resultado.length == 0) {
    return (
      <div className={css.container}>
        <ImagePreview
          estado={stateWindows}
          cambiarEstado={setStateWindows}
          src={picture}
        ></ImagePreview>
        <Title> Mascotas reportadas por mi</Title>
        <Subtitle> Aun no hay mascotas reportadas</Subtitle>
      </div>
    );
  }

  console.log("soy picture", picture);

  return (
    <div className={css.container}>
      <ImagePreview
        estado={stateWindows}
        cambiarEstado={setStateWindows}
        src={picture}
      ></ImagePreview>

      <Title> Mascotas reportadas por mi</Title>
      <div className={css.cardContainer}>
        {resultado.map((r) => (
          <MyReportedPets
            handlerImage={preview}
            estado={stateWindows}
            cambiarEstado={setStateWindows}
            id={r.id}
            pictureURL={r.imagen}
            onClick={editPet}
            search={r.search}
            petName={r.petName}
          ></MyReportedPets>
        ))}
      </div>
    </div>
  );
}

export { ReportedPets };
