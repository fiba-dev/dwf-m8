import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "./header";

function Layout(props) {
  return (
    <div>
      <Header></Header>

      <Outlet></Outlet>
    </div>
  );
}

export { Layout };
