import React from "react";
import css from "./index.css";
import { Link } from "react-router-dom";

function Button(props) {
	return (
		<button
			onClick={props.onClick}
			aria-label="Boton general"
			className={css.boton}
		>
			{props.children}
		</button>
	);
}
function CancelButton(props) {
	return (
		<button
			className={css.cancel__button}
			aria-label="Cancelar"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

function MenuButton(props) {
	return (
		<button
			className={css.button__menu}
			aria-label="Menu"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

function CloseButton(props) {
	return (
		<button
			className={css.close__menu}
			aria-label="Cerrar Ventana"
			onClick={props.onClick}
		>
			X
		</button>
	);
}
function SessionButton(props) {
	return (
		<button
			className={css.session}
			aria-label="Boton de sesion"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
function UnpublishButton(props) {
	return (
		<button
			className={css.unpublish}
			aria-label="eliminar publicacion"
			onClick={props.onClick}
		>
			{" "}
			{props.children}
		</button>
	);
}
function FoundButton(props) {
	return (
		<button className={css.found} aria-label="Buscar" onClick={props.onClick}>
			{" "}
			{props.children}
		</button>
	);
}
export {
	Button,
	MenuButton,
	CloseButton,
	SessionButton,
	CancelButton,
	UnpublishButton,
	FoundButton,
};
