import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style.css";

import Carrossel1 from "../../assets/img/Carrossel1.jpg";
import Carrossel2 from "../../assets/img/Carrossel2.jpg";
import Carrossel3 from "../../assets/img/Carrossel3.jpg";
import Carrossel4 from "../../assets/img/Carrossel4.jpg";
import SantaClaraeJesus from "../../assets/img/SantaClaraeJesus.png";
import Pix from "../../assets/img/pix.svg";

function Home() {
  // Configuração padrão do slider grande
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  // Configuração do carrossel pequeno (3 imagens visíveis)
  const smallSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home-page">
      {/* === Primeira Seção - Slider Grande com background === */}
      <div
        className="home-container"
        
      >
        <div className="home-left">
          <h1>Com <br /> prontidão e<br /> solicitude, amar e servir.</h1>
          <Link to="/Institucional">
            <button className="btn-missao">Conheça nossa história</button>
          </Link>
        </div>

        <div className="home-right">
          <Slider {...sliderSettings}>
            {[Carrossel1, Carrossel2, Carrossel3, Carrossel4].map((img, idx) => (
              <div key={idx}>
                <img src={img} alt={`Carrossel ${idx + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* === Seção de 3 carrosséis pequenos em um único carrossel === */}
      <div className="three-carousel-section">
        <Slider {...smallSliderSettings}>
          {[Carrossel1, Carrossel2, Carrossel3, Carrossel4].map((img, idx) => (
            <div className="small-carousel" key={idx}>
              <img src={img} alt={`Pequeno ${idx + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="three-carousel-texts">
        <p className="carousel-caption">
          “Não perca de vista seu ponto de partida”
        </p>
        <p className="carousel-caption-secondary">
        Santa Clara de Assis
        </p>
        <Link to="/NossosProjetos">
          <button className="btn-missao large-btn">Nossos Projetos</button>
        </Link>
      </div>

      <div className="section-divider"></div>

      {/* === Seção Como Apoiar === */}
      <div className="support-section">
        <div className="support-text">
          <h2>COMO APOIAR</h2>
          <p>
            Para que a missão da Fraternidade continue a crescer e alcançar mais vidas, contamos com a generosidade de benfeitores,
            voluntários e instituições parceiras. Toda ajuda é bem-vinda, seja por meio de doações, projetos em parceria,
            divulgação de nossas ações ou colaboração com recursos materiais e humanos.

          </p>
          <img
            src={SantaClaraeJesus}
            alt="Santa Clara e Jesus"
            className="support-bottom-img"
          />
        </div>
        <div className="support-image">
          <img src={Pix} alt="Como Apoiar" />
        </div>
      </div>
    </div>
  );
}

export default Home;
