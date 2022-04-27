import React from "react";
import { ReportPet } from "../../components/reportPet";

function ReportPetPage() {
	return (
		<div>
			<meta
				name="reportar mascota perdida"
				content="Reportar una mascota perdida"
			></meta>
			<ReportPet></ReportPet>
		</div>
	);
}

export { ReportPetPage };
