
import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

function Institucional() {
  return (
    <div className="institucional-container">
      <h1>Página Institucional</h1>
      <p>Esta é uma página de teste para verificar se os links e botões funcionam.</p>
      
      <div className="buttons-test">
        <Link to="/">
          <button className="btn-missao">Voltar para Home</button>
        </Link>
        <Link to="/NossosProjetos">
          <button className="btn-missao">Ir para Projetos</button>
        </Link>
      </div>
    </div>
  );
}

export default Institucional;
