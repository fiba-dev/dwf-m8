import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../../components/ui/text";
import { ReportedPets } from "../../components/reportedPets";

function ReportedPetsPage() {
  return (
    <div>
      <ReportedPets></ReportedPets>
    </div>
  );
}

export { ReportedPetsPage };
