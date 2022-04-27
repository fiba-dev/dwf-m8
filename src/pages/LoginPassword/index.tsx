import React from "react";
import { InputPassword } from "../../components/inputPassword";

function LoginPassword() {
	return (
		<div>
			{" "}
			<meta
				name="Login password"
				content="Ingresar el Password del usuario"
			></meta>
			<InputPassword></InputPassword>
		</div>
	);
}

export { LoginPassword };
