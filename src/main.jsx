import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import Topo from "./components/Topo/Index.jsx";
import Rodape from "./components/Rodape/Index.jsx";

import Home from "./pages/Home/Index.jsx";
import QuemSomos from "./pages/Institucional/Quemsomos/Index.jsx";
import Fundadora from "./pages/Institucional/Fundadora/Index.jsx";
import Baluarte from "./pages/Institucional/Baluarte/Index.jsx";
import NossosProjetos from "./pages/NossosProjetos/Index.jsx";
import NossaMissao from "./pages/NossaMissao/Index.jsx";
import Doador from "./pages/Doador/Index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Topo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Institucional" element={<Navigate to="/Institucional/QuemSomos" replace />} />
        <Route path="/Institucional/QuemSomos" element={<QuemSomos />} />
        <Route path="/Institucional/Fundadora" element={<Fundadora />} />
        <Route path="/Institucional/Baluarte" element={<Baluarte />} />
        <Route path="/NossosProjetos" element={<NossosProjetos />} />
        <Route path="/NossaMissao" element={<NossaMissao />} />
        <Route path="/Doador" element={<Doador />} />
      </Routes>
      <Rodape />
    </BrowserRouter>
  </React.StrictMode>
);

