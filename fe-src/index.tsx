import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { AppRoutes } from "./router/index";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./pages/HomePage";
import { LoadingWindows } from "./components/ui/loading-windows";
import { RecoilRoot } from "recoil";
import "mapbox-gl/dist/mapbox-gl.css";
console.log("soy el boton");

class index extends React.Component<any, any> {
  constructor(props) {
    super(props);
    console.log("Soy el index.ts");
  }

  render() {
    return <Home />;
  }
}

ReactDOM.render(
  <Suspense fallback={<LoadingWindows></LoadingWindows>}>
    <RecoilRoot>
      <BrowserRouter>
        {" "}
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>,
  document.querySelector(".app")
);
