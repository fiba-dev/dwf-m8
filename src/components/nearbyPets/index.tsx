import React, { useState, useEffect } from "react";
import css from "./index.css";
import { Title2 } from "../ui/text";
import { ImagePreview } from "../ui/imagePreview";
import { CardReportedPet } from "../ui/card-pet";
import { Button } from "../ui/buttons";
import {
  usePetData,
  useReportedPets,
  petCercanas,
  petInfo,
  useLoc,
} from "../../hooks";
import { useNavigate } from "react-router-dom";
import { InfoWindows } from "../ui/infoWindows";

function NearbyPets(props) {
  const [stateWindows, setStateWindows] = useState(false);
  const [infoWindows, setInfoWindows] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [picture, setPicture] = useState("");
  let [loc, setLoc] = useLoc();

  const navigate = useNavigate();
  let [resultado, setResultado] = useReportedPets();
  let [pet, setPet] = usePetData();
  let [petId, setPetId] = useState();
  let [petName, setPetName] = useState();

  function preview(e) {
    e.preventDefault();
    setPicture(e.target.src);
    setStateWindows(!infoWindows);
  }

  function handlerInfo(e) {
    e.preventDefault();
    setPetName(e.target.name);
    setPetId(e.target.id);
    setInfoWindows(!infoWindows);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const telefono = e.target.telefono.value;
    const donde = e.target.donde.value;
    petInfo({ name, telefono, id: petId, donde }).then((res) => {
      setInfoWindows(!infoWindows);
      navigate("/");
    });
  };

  const ubicacion = () => {
    navigator.geolocation.getCurrentPosition((res) => {
      const userLat = res.coords.latitude;
      const userLng = res.coords.longitude;
      const location = [userLat, userLng];
      setLoc(location);
      localStorage.setItem("loc", JSON.stringify(location));
      petCercanas(location).then((res) => {
        setResultado(res);
      });
    });
  };

  return (
    <div className={css.container}>
      <InfoWindows
        onSubmit={handlerSubmit}
        estadoWindows={infoWindows}
        petName={petName}
        cambiarEstadoWindows={setInfoWindows}
      ></InfoWindows>
      <ImagePreview
        estado={stateWindows}
        cambiarEstado={setStateWindows}
        src={picture}
      ></ImagePreview>
      <Title2> Mascotas Perdidas Cerca tuyo</Title2>
      <Button onClick={ubicacion}> Actualizar ubicacion</Button>
      <br />
      <div className={css.cardContainer}>
        {resultado.map((r) => (
          <CardReportedPet
            handlerInfo={handlerInfo}
            handlerImage={preview}
            estado={stateWindows}
            cambiarEstado={setStateWindows}
            id={r.id}
            pictureURL={r.imagen}
            search={r.search}
            petName={r.petName}
          ></CardReportedPet>
        ))}
      </div>
    </div>
  );
}

export { NearbyPets };
