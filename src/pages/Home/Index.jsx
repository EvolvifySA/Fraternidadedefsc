import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style.css";

function Home() {
  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const smallSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
  };

  return (
    <div>

      {/* === Primeira Seção - Slider Grande === */}
      <div className="home-container">
        <div className="home-left">
          <h1>Com <br /> prontidão e<br /> solicitude, amar e servir.</h1>
          <Link to="/NossaMissao">
            <button className="btn-missao">Conheça nossa história</button>
          </Link>
        </div>

        <div className="home-right">
          <Slider {...mainSliderSettings}>
            <div><img src="/src/img/Carrossel1.jpg" alt="Carrossel 1" /></div>
            <div><img src="/src/img/Carrossel2.jpg" alt="Carrossel 2" /></div>
            <div><img src="/src/img/Carrossel3.jpg" alt="Carrossel 3" /></div>
            <div><img src="/src/img/Carrossel4.jpg" alt="Carrossel 4" /></div>
          </Slider>
        </div>
      </div>

      {/* Linha pontilhada separadora */}
      <div className="section-divider"></div>

      {/* === Segunda Seção - 3 Carrosséis Pequenos === */}
      <div className="three-carousel-section">
        <div className="small-carousel">
          <Slider {...smallSliderSettings}>
            <div><img src="/src/img/Carrossel1.jpg" alt="Carrossel 1A" /></div>
            <div><img src="/src/img/Carrossel2.jpg" alt="Carrossel 1B" /></div>
          </Slider>
        </div>

        <div className="small-carousel">
          <Slider {...smallSliderSettings}>
            <div><img src="/src/img/Carrossel3.jpg" alt="Carrossel 2A" /></div>
            <div><img src="/src/img/Carrossel4.jpg" alt="Carrossel 2B" /></div>
          </Slider>
        </div>

        <div className="small-carousel">
          <Slider {...smallSliderSettings}>
            <div><img src="/src/img/Carrossel3.jpg" alt="Carrossel 3A" /></div>
            <div><img src="/src/img/Carrossel2.jpg" alt="Carrossel 3B" /></div>
          </Slider>
        </div>
      </div>

      {/* === Conteúdo abaixo dos 3 Carrosséis === */}
      <div className="three-carousel-texts">
        <p className="carousel-caption">
          Abrace o Cristo pobre <br /> como uma virgem pobre.
        </p>
        <Link to="/NossosProjetos">
          <button className="btn-missao large-btn">Nossos Projetos</button>
        </Link>
      </div>

      {/* Linha pontilhada separadora */}
      <div className="section-divider"></div>

      {/* === Última Seção - COMO APOIAR === */}
      <div className="support-section">
        <div className="support-text">
          <h2>COMO APOIAR</h2>
          <p>
            Para que a missão da Fraternidade continue a crescer e alcançar mais vidas,
            contamos com a generosidade de benfeitores, voluntários e instituições parceiras.
            Toda ajuda é bem-vinda, seja por meio de doações, projetos em parceria,
            divulgação de nossas ações ou colaboração com recursos materiais e humanos.
          </p>
          <img
            src="/src/img/SantaClaraeJesus.png"
            alt="Santa Clara e Jesus"
            className="support-bottom-img"
          />
        </div>
        <div className="support-image">
          <img src="/src/img/pix.svg" alt="Como Apoiar" />
        </div>
      </div>


    </div>
  );
}

export default Home;
