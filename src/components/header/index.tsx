import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./index.css";
import { IconStart } from "../ui/icons/index";
import { MenuButton } from "../ui/buttons/index";
import { useReportedPets, petCercanas } from "../../hooks";
import { MobileMenu } from "../ui/menu-mobile";
import { DesktopMenu } from "../ui/menu-desktop";

function setUbicacion(callback) {
  navigator.geolocation.getCurrentPosition((res) => {
    const userLat = res.coords.latitude;
    const userLng = res.coords.longitude;
    const location = [userLat, userLng];

    localStorage.setItem("loc", JSON.stringify(location));

    if (callback) {
      callback(location);
      return location;
    }
  });
}

function Header(props) {
  const navigate = useNavigate();
  let [resultado, setResultado] = useReportedPets();
  const location = JSON.parse(localStorage.getItem("loc"));
  const [stateWindows, setStateWindows] = useState(false);

  const goMenu = () => {
    setUbicacion((res) => {
      petCercanas(res).then((res) => {
        setResultado(res);
        navigate("/");
      });
    });
  };

  return (
    <div>
      <MobileMenu
        estado={stateWindows}
        cambiarEstado={setStateWindows}
      ></MobileMenu>
      <div className={css.header}>
        <IconStart className={css.icon} onClick={goMenu}></IconStart>

        <MenuButton
          onClick={() => {
            setStateWindows(!stateWindows);
          }}
        >
          Menu
        </MenuButton>
        <DesktopMenu></DesktopMenu>
      </div>
    </div>
  );
}
export { Header, setUbicacion };
