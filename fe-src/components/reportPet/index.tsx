import React, { useState, useRef, useEffect } from "react";
import css from "./index.css";
import { useDropzone } from "react-dropzone";
import { Title, Subtitle } from "../ui/text";
import { TextField } from "../ui/text-field";
import { Map } from "../map";
import { DropboxImage } from "../setImage";
import { Button, CancelButton } from "../ui/buttons";
import {
  usePetData,
  reportPet,
  petCercanas,
  useReportedPets,
  useLoc,
} from "../../hooks";
import { setUbicacion } from "../header/index";
import { Navigate, useNavigate } from "react-router-dom";

let pictureURL = "http://127.0.0.1:8080/fe-src/components/img/picture.png";

function ReportPet(props) {
  let [resultado, setResultado] = useReportedPets();
  const [petData, setPetData] = usePetData();
  const Navigator = useNavigate();
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("soy E", e);

    console.log("soy name", e.target.value);
    setPetData({
      id: petData.id,
      petName: e.target.value,
      loc: petData.loc,
      search: petData.search,
      imagen: petData.imagen,
      estado: petData.estado,
    });
  };
  const handlerCancel = (e) => {
    e.preventDefault();
    console.log("entre en el cancel");

    setUbicacion((res) => {
      console.log("Soy res antes de ir a pet cercanas", res);

      petCercanas(res).then((res) => {
        console.log("soy resultado antes de ir a menu", res);

        setResultado(res);
        Navigator("/");
      });
    });
  };
  const handlerReport = (e) => {
    e.preventDefault();
    console.log("soy petData y reporto esto", petData);
    const resultado = reportPet(petData);
    resultado.then((res) => {
      if (res == true) {
        window.alert("Reportado con exito");
        Navigator("/");
      }
      console.log("soy resultado de report pet", res);
    });
    console.log("soy resultado");
  };
  useEffect(() => {
    console.log("PETDATA", petData);
  }, [petData]);

  return (
    <div className={css.container}>
      <div className={css.container__title}>
        <Title>Reportar Mascota Perdida</Title>
      </div>
      <div className={css.container__main}>
        <div className={css.container__first}>
          <div className={css.sub__container}>
            <Subtitle>Nombre de la Mascota a reportar</Subtitle>

            <TextField
              onChange={handlerSubmit}
              placeholder={"NOMBRE"}
              name={"petName"}
              type={"text"}
            >
              {" "}
            </TextField>
          </div>
          <br></br>
          <div className={css.sub__container}>
            <Subtitle>Click en la imagen para agregar foto</Subtitle>
            <DropboxImage></DropboxImage>
          </div>
          <br></br>
          <div className={css.sub__container}>
            <Subtitle>
              Buscá un punto de referencia para reportar a tu mascota. Puede ser
              una dirección, un barrio o una ciudad
            </Subtitle>
            <Map placeholder={"Ubicacion"}>{"localizacion vacia"}</Map>
            <br></br>
          </div>
        </div>
        <br></br>
        <div className={css.container__second}>
          <Button onClick={handlerReport}>Reportar</Button>
          <br></br>
          <CancelButton onClick={handlerCancel}>Cancelar</CancelButton>
        </div>
      </div>
    </div>
  );
}
export { ReportPet };
