
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import menuIcon from "../../assets/icon/menu.png";
import logoFraternidade from "../../assets/img/logo.svg";


function Topo() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrollTopo, setScrollTopo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // quando rolar mais de 50px
        setScrollTopo(true);
      } else {
        setScrollTopo(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`topo ${scrollTopo ? "fixo-transparente" : ""}`}>
      <div className="logo">
        <Link to="/">

          <img
            className="logo-img"
            src={logoFraternidade}
            alt="Logo da Fraternidade"
          />

        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>
        <img src="/img/menu.png" alt="Menu" className="icon-menu" />
      </button>

      <nav className={`menu ${menuAberto ? "ativo" : ""}`}>
        <Link to="/">Página Inicial</Link>
        <Link to="/Institucional">Institucional</Link>
        <Link to="/NossosProjetos">Nossos Projetos</Link>
        <Link to="/NossaMissao">Nossa Missão</Link>
        <Link to="/Doador">Seja um Doador</Link>
      </nav>
    </header>
  );
}

export default Topo;
