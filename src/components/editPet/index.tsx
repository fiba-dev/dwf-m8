import React from "react";
import css from "./index.css";

import { Subtitle, Title2 } from "../ui/text";
import { TextField } from "../ui/text-field";
import { Map } from "../map";
import { DropboxImage } from "../setImage";
import { Button, UnpublishButton } from "../ui/buttons";
import {
  usePetData,
  reportPet,
  editPet,
  useReportedPets,
  getReportedPets,
  deletePet,
} from "../../hooks";
import { useNavigate } from "react-router-dom";

function EditPet(props) {
  const Navigator = useNavigate();
  let [resultado, setResultado] = useReportedPets();

  const [petData, setPetData] = usePetData();
  let petInfo = JSON.parse(localStorage.getItem("petData"));
  const handlerSubmit = (e) => {
    e.preventDefault();

    setPetData({
      id: petData.id,
      petName: e.target.value,
      loc: petData.loc,
      search: petData.search,
      imagen: petData.imagen,
      estado: petData.estado,
    });
  };

  const despublicar = (res) => {
    let result = window.confirm("Seguro que quiere borrar la publicacion?");
    if (result == true) {
      deletePet(petData).then((ress) => {
        if (ress == true) {
          window.alert("Borrado Con Exito");
          getReportedPets("asd").then((res) => {
            setResultado(res);
            Navigator("/");
          });
        }
      });
    } else {
      window.alert("No se borro");
    }
  };
  const handlerReport = (e) => {
    e.preventDefault();

    const resultado = editPet(petData);
    resultado.then((res) => {
      if (res != undefined) {
        window.alert("Editado con exito");
        getReportedPets("asd").then((response) => {
          setResultado(response);
          Navigator("/");
        });
      }
    });
  };

  return (
    <div className={css.container}>
      <Title2>Reportar Mascota Perdida</Title2>

      <Subtitle>Nombre de su Mascota</Subtitle>

      <TextField
        onChange={handlerSubmit}
        name={"petName"}
        placeholder={petInfo.petName}
        type={"text"}
      ></TextField>
      <br></br>
      <Subtitle>Click en la imagen para agregar foto</Subtitle>
      <DropboxImage>{petInfo.imagen}</DropboxImage>
      <br></br>
      <Subtitle>
        Buscá un punto de referencia para reportar a tu mascota. Puede ser una
        dirección, un barrio o una ciudad
      </Subtitle>
      <Map placeholder={petInfo.search}>{petInfo.loc}</Map>
      <br></br>
      <br></br>
      <Button onClick={handlerReport}>Guardar</Button>
      <br></br>

      <UnpublishButton onClick={despublicar}> Despublicar</UnpublishButton>
    </div>
  );
}
export { EditPet };
