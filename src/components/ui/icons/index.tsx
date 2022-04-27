import React from "react";
import css from "./index.css";
import { Link } from "react-router-dom";

function IconMobile(props) {
	return (
		<button
			aria-label="Boton Nav Mobile"
			className={css.icon__mobile}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
function IconDesktop(props) {
	return (
		<button
			aria-label="Boton Nav Desktop"
			onClick={props.onClick}
			id={props.id}
			className={css.icon__desktop}
		>
			{props.children}
		</button>
	);
}

function IconStart(props) {
	return (
		<button
			className={css.header__logo}
			aria-label="Menu Boton"
			onClick={props.onClick}
		></button>
	);
}

export { IconMobile, IconDesktop, IconStart };
