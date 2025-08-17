import { useState } from "react";
import "./Style.css";
import menuIcon from "/public/icon/menu.png"; 

function Topo() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="topo">
      <div className="logo">
        <a href="/">
        </a>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        <img src={menuIcon} alt="Menu" className="icon-menu" />
      </button>

      <nav className={`menu ${menuAberto ? "ativo" : ""}`}>
        <a href="/">Página Inicial</a>
        <a href="/Institucional">Institucional</a>
        <a href="/NossosProjetos">Nossos Projetos</a>
        <a href="/NossaMissao">Nossa Missão</a>
        <a href="/Doador">Seja um Doador</a>
      </nav>
    </header>
  );
}

export default Topo;
