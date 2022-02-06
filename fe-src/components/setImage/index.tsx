import React, { useState, useRef, useEffect } from "react";
import css from "./index.css";
import { useDropzone } from "react-dropzone";
import { usePetData } from "../../hooks";

let pictureURL = "http://127.0.0.1:8080/fe-src/components/img/picture.png";

function DropboxImage(props) {
  const dropzone = useRef(null);
  const image = useRef(null);
  const [petData, setPetData] = usePetData();

  const onDrop = function (acceptedFiles) {
    console.log(acceptedFiles);
    console.log("soy path", acceptedFiles[0].path);

    setFilesPreview(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    const promesa = new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(acceptedFiles[0]);

      reader.onload = () => {
        if (!!reader.result) {
          resolve(reader.result);
        } else {
          reject(Error("Failed converting to base64"));
        }
      };
    });
    promesa.then(
      (result) => {
        console.log("log del resul");
        setPetData({
          id: petData.id,
          petName: petData.petName,
          loc: petData.loc,
          search: petData.search,
          imagen: result.toString(),
          estado: petData.estado,
        });
      },
      (err) => {
        console.log(err);
      }
    );

    console.log("ACCEPTED FILES", acceptedFiles, "y data");

    setFilesPreview(acceptedFiles[0].preview);
  };
  let archivo;
  if (props.children) {
    archivo = props.children;
  } else {
    archivo = "http://127.0.0.1:3003/fe-src/components/img/picture.png";
  }

  const [files, setFilesPreview] = useState(archivo);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={css.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <img src={files || props.children} className={css.picture} />
      </div>
    </div>
  );
}
export { DropboxImage };
