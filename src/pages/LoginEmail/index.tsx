import React from "react";
import { InputEmail } from "../../components/inputEmail";

function LoginEmail() {
	return (
		<div>
			{" "}
			<meta
				name="Login Email"
				content="Ingresar el Email del usuario"
			></meta>{" "}
			<InputEmail></InputEmail>
		</div>
	);
}

export { LoginEmail };
