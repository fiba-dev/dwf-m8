import React, { useState, useRef, useEffect } from "react";
import css from "./index.css";
import { useDropzone } from "react-dropzone";
import { Title2, Subtitle } from "../ui/text";
import { ImagePreview } from "../ui/imagePreview";
import { MyReportedPets, CardReportedPet } from "../ui/card-pet";
import { TextField } from "../ui/text-field";
import { Map } from "../map";
import { DropboxImage } from "../setImage";
import { Button, CancelButton } from "../ui/buttons";
import {
  usePetData,
  getReportedPets,
  useReportedPets,
  petCercanas,
  petInfo,
  useLoc,
} from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    console.log("soy pet", pet);
  }, [pet]);

  function preview(e) {
    e.preventDefault();
    console.log("soy e de re[orted", e.target.src);
    setPicture(e.target.src);

    setStateWindows(!infoWindows);
  }

  function handlerInfo(e) {
    e.preventDefault();
    console.log("soy e", e);
    setPetName(e.target.name);
    setPetId(e.target.id);
    setInfoWindows(!infoWindows);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("soy submit", e);
    const name = e.target.name.value;
    const telefono = e.target.telefono.value;
    const donde = e.target.donde.value;
    petInfo({ name, telefono, id: petId, donde }).then((res) => {
      console.log("Soy res depet info", res);
    });
  };

  const ubicacion = () => {
    navigator.geolocation.getCurrentPosition((res) => {
      const userLat = res.coords.latitude;
      const userLng = res.coords.longitude;
      const location = [userLat, userLng];
      setLoc(location);

      localStorage.setItem("loc", JSON.stringify(location));
      console.log(loc);
      petCercanas(location).then((res) => {
        console.log("soy res de petcercanas", res);
        setResultado(res);
      });
    });
  };
  console.log("soy picture", picture);

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
