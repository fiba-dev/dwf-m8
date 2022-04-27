import React from "react";
import { NearbyPets } from "../../components/nearbyPets";

function ReNearbyPetsPage() {
	return (
		<div>
			<meta
				name="Mascotas perdidas cercanas"
				content="Ver Mascotar perdidas cerca de tu ubicacion"
			></meta>
			<NearbyPets></NearbyPets>
		</div>
	);
}

export { ReNearbyPetsPage };
