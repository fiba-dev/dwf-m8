import React, { useState } from "react";
import css from "./index.css";
import { useDropzone } from "react-dropzone";
import { usePetData } from "../../hooks";

function DropboxImage(props) {
  const [petData, setPetData] = usePetData();

  const onDrop = function (acceptedFiles) {
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

    setFilesPreview(acceptedFiles[0].preview);
  };
  let archivo;
  if (props.children) {
    archivo = props.children;
  } else {
    archivo =
      "https://res.cloudinary.com/fiba06-dev/image/upload/v1644189086/dwf-m8/picture_vbjmwt.png";
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
