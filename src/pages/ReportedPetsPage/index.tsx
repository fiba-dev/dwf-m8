import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../../components/ui/text";
import { ReportedPets } from "../../components/reportedPets";

function ReportedPetsPage() {
	return (
		<div>
			<meta
				name="Mascotas Reportadas por el usuario"
				content="Ver mascotas reportadas por el usuario"
			></meta>
			<ReportedPets></ReportedPets>
		</div>
	);
}

export { ReportedPetsPage };
