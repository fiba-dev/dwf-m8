import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePetData } from "../../hooks";
import css from "./index.css";
import "./index.css";
import { initMap } from "./controller";
import { MAPBOX_TOKEN } from "../../lib/mapobox";
import { MarcarMapa } from "./controller";
import { Search } from "../buscador";
import ReactMapboxGl from "react-mapbox-gl";

const Maps = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

function Map(props) {
  const [petData, setPetData] = usePetData();

  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const initialCoords: any = [-58.381555, -34.605425];
  const [coords, setCoords] = useState(initialCoords);

  useEffect(() => {
    if (map.current) return console.log("aun no empieza");
    map.current = initMap(mapContainer.current);
  });

  async function handlerSearch(e) {
    e.preventDefault();
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${e.target.q.value}&format=json`
    ).then((r) => r.json());

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    const newCoords = [lon, lat];

    const search = e.target.q.value || petData.search;
    setPetData({
      id: petData.id,
      petName: petData.petName,
      loc: [newCoords[1], newCoords[0]],
      search: search,
      imagen: petData.imagen,
      estado: petData.estado,
    });
    let marca = MarcarMapa(newCoords, map.current);

    marca.then((res) => {
      if (res) {
        function onDragEnd() {
          const lngLat = res.getLngLat();

          setPetData({
            id: petData.id,
            petName: petData.petName,
            loc: [lngLat.lat, lngLat.lng],
            search: search,
            imagen: petData.imagen,
            estado: petData.estado,
          });
        }

        res.on("dragend", onDragEnd);
      }
    });

    setCoords(newCoords);
  }
  if (props.children[0] == petData.loc[0]) {
    let marca = MarcarMapa([props.children[1], props.children[0]], map.current);

    marca.then((res) => {
      if (res) {
        function onDragEnd() {
          const lngLat = res.getLngLat();

          setPetData({
            id: petData.id,
            petName: petData.petName,
            loc: [lngLat.lat, lngLat.lng],
            search: petData.search,
            imagen: petData.imagen,
            estado: petData.estado,
          });
        }
        res.on("dragend", onDragEnd);
      }
    });
  }

  return (
    <div className={css.map_container}>
      <div>
        <div ref={mapContainer} className={css.mapa}></div>
        <div className=""></div>
      </div>

      <Search placeholder={props.placeholder} onSubmit={handlerSearch}>
        {" "}
      </Search>
    </div>
  );
}

export { Map };
