import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logooBranca.png";
import "./Style.css";

function Topo() {
  const [scrolled, setScrolled]               = useState(false);
  const [menuAberto, setMenuAberto]           = useState(false);
  const [instAberto, setInstAberto]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fechar = () => { setMenuAberto(false); setInstAberto(false); };

  return (
    <>
      {/* Overlay mobile */}
      {menuAberto && (
        <div className="topo-overlay" onClick={fechar} />
      )}

      <header className={`topo${scrolled ? " topo--scrolled" : ""}`}>
        <div className="topo-inner">

          <Link to="/" className="topo-logo" onClick={fechar}>
            <img src={logo} alt="Instituto Filhas de Santa Clara" />
          </Link>

          <nav className={`topo-nav${menuAberto ? " topo-nav--aberto" : ""}`}>
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? " nav-link--ativo" : ""}`} onClick={fechar} end>
              Início
            </NavLink>

            <div className={`nav-drop${instAberto ? " nav-drop--aberto" : ""}`}>
              <button
                className="nav-link nav-drop-btn"
                onClick={() => setInstAberto(!instAberto)}
              >
                Institucional
                <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="nav-drop-menu">
                <Link to="/Institucional/QuemSomos" className="drop-item" onClick={fechar}>Quem Somos</Link>
                <Link to="/Institucional/Fundadora"  className="drop-item" onClick={fechar}>Nossa Fundadora</Link>
                <Link to="/Institucional/Baluarte"   className="drop-item" onClick={fechar}>Baluartes</Link>
              </div>
            </div>

            <NavLink to="/NossosProjetos" className={({ isActive }) => `nav-link${isActive ? " nav-link--ativo" : ""}`} onClick={fechar}>
              Projetos
            </NavLink>
            <NavLink to="/NossaMissao" className={({ isActive }) => `nav-link${isActive ? " nav-link--ativo" : ""}`} onClick={fechar}>
              Nossa Missão
            </NavLink>
            <Link to="/Doador" className="nav-link nav-link--cta" onClick={fechar}>
              Seja Benfeitor
            </Link>
          </nav>

          <button
            className={`topo-burger${menuAberto ? " topo-burger--ativo" : ""}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </header>
    </>
  );
}

export default Topo;
