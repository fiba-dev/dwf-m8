import { Routes, Route } from "react-router-dom";
import React from "react";
import { Layout } from "../components/layout";
import { Home } from "../pages/HomePage";
import { LoginEmail } from "../pages/LoginEmail";
import { MisDatos } from "../pages/MisDatosPage";
import { ReportedPets } from "../components/reportedPets";
import { ReportedPetsPage } from "../pages/ReportedPetsPage";

import { LoginPassword } from "../pages/LoginPassword";
import { UserForm } from "../components/UserForm";
import { EditPet } from "../components/editPet";
import { ReportPetPage } from "../pages/ReportPetPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login/email" element={<LoginEmail />} />
        <Route path="/login/password" element={<LoginPassword />} />
        <Route path="/mis-datos" element={<MisDatos />}></Route>
        <Route path="/reported-pet" element={<ReportedPetsPage />}></Route>
        <Route path="/report-pet" element={<ReportPetPage />}></Route>
        <Route path="/edit-pet" element={<EditPet />}></Route>
      </Route>
    </Routes>
  );
}
export { AppRoutes };
