import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../lib/mapobox";
import { usePetData } from "../../hooks";
import React, { useEffect, useState, useRef } from "react";

//inicia el mapa de mapbox

export function initMap(mapa) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: mapa,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-58.381555, -34.605425],
    zoom: 6,
  });
}

//crea un marcador
export async function MarcarMapa(loc, mapa) {
  console.log("soy loc y mapa", loc, mapa);

  if (mapa) {
    console.log("Ente al if");
    console.log("soy mapa markers", mapa._markers);
    if (mapa._markers.length > 0) {
      console.log("entre al if");

      mapa._markers[0].setLngLat(loc).addTo(mapa);
      mapa.setCenter(loc);
      mapa.setZoom(8);
    } else {
      const marker = new mapboxgl.Marker({ draggable: true, color: "black" })
        .setLngLat(loc)

        .addTo(mapa);
      console.log("SOY MARKER", marker);

      mapa.setCenter(loc);
      mapa.setZoom(8);
      let lngLat = [];
      function onDragEnd() {
        lngLat = marker.getLngLat();
        console.log("log soy latlng", lngLat);
      }

      return marker.on("dragend", onDragEnd);
    }
  }
}
