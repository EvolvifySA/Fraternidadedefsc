import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import "./style.css";

import Irmas2  from "../../assets/img/Irmas2.png";
import Irmas5  from "../../assets/img/Irmas5.jpg";
import SantaClara from "../../assets/img/santaclara.png";
import SaoFrancisco from "../../assets/img/saofrancisco.png";

const VALORES = [
  { icon: "🕊", titulo: "Contemplação",  texto: "Vivemos enraizadas na oração, fonte de toda ação. É da intimidade com Deus que brota a força para servir." },
  { icon: "🤲", titulo: "Serviço",        texto: "Servimos a Deus nos pobres, seguindo o exemplo de Santa Clara que via em cada irmão o rosto de Cristo." },
  { icon: "🌿", titulo: "Fraternidade",   texto: "Vivemos a comunhão fraterna como sinal do Reino — onde cada pessoa é acolhida com amor e dignidade." },
  { icon: "✝",  titulo: "Evangelização",  texto: "Somos enviadas a anunciar o Evangelho com a vida, a palavra e as obras de misericórdia." },
  { icon: "🌹", titulo: "Pobreza Evangélica", texto: "Abraçamos a pobreza como liberdade para amar sem medida, à imagem de Francisco e Clara de Assis." },
  { icon: "🔥", titulo: "Missão Profética", texto: "Denunciamos toda forma de injustiça e anunciamos um mundo novo, onde cada vida é sagrada e amada por Deus." },
];

const LINHAS = [
  { ano: "2022", titulo: "Fundação",              desc: "O Instituto Filhas de Santa Clara é fundado em 15 de agosto de 2022, em João Pessoa – PB, com o carisma franciscano-clariano." },
  { ano: "2022", titulo: "Primeiros Projetos",    desc: "Iniciam as primeiras ações sociais: distribuição de alimentos e visitas a famílias em vulnerabilidade." },
  { ano: "2023", titulo: "Missão Anunciar",       desc: "Criação do projeto de evangelização missionária para as periferias e comunidades de João Pessoa." },
  { ano: "2023", titulo: "Mãos que Transformam",  desc: "Lançamento do projeto de capacitação profissional para mulheres chefes de família." },
  { ano: "2024", titulo: "Projeto Menino Jesus",  desc: "Início do atendimento a crianças e adolescentes em situação de vulnerabilidade social." },
  { ano: "2025", titulo: "Crescimento",           desc: "O Instituto consolida sua presença com 5 projetos ativos, mais de 500 famílias atendidas e uma rede crescente de voluntários." },
];

export default function NossaMissao() {
  useScrollReveal();

  return (
    <div className="nm-page">

      {/* Hero */}
      <section className="nm-hero">
        <div className="nm-hero-overlay" />
        <div className="nm-hero-content reveal">
          <p className="section-tag" style={{ color: "var(--dourado-claro)" }}>Nossa Razão de Ser</p>
          <h1>"Com prontidão e solicitude,<br /><em>amar e servir."</em></h1>
          <div className="gold-line center" />
          <p>Nossa missão nasce da fé, cresce na oração e se realiza no serviço concreto aos mais pobres.</p>
        </div>
        <img src={SantaClara} alt="Santa Clara" className="nm-hero-img" />
      </section>

      {/* Missão Texto */}
      <section className="nm-missao reveal">
        <div className="nm-missao-inner">
          <div className="nm-missao-texto reveal-left">
            <p className="section-tag">Missão</p>
            <h2>Missão Profética<br />e Evangelizadora</h2>
            <div className="gold-line" />
            <p>
              O Instituto Filhas de Santa Clara é uma fraternidade religiosa feminina que vive o carisma
              franciscano-clariano — marcado pela pobreza evangélica, a fraternidade e a contemplação — a
              serviço da evangelização e da promoção humana.
            </p>
            <p>
              Nascemos da escuta da realidade das periferias de João Pessoa, onde famílias enfrentam
              cotidianamente a fome, a falta de trabalho e o sofrimento. Foi diante dessa realidade que
              Deus nos chamou a agir — não apenas com palavras, mas com obras concretas de amor.
            </p>
            <p>
              Nossa missão é ser instrumento de Deus para transformar vidas: anunciando o Evangelho,
              acolhendo o sofrimento, capacitando mulheres, alimentando famílias e formando crianças
              na fé e na cidadania.
            </p>
          </div>
          <div className="nm-missao-foto reveal-right">
            <img src={Irmas2} alt="Irmãs em missão" />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="nm-valores">
        <div className="nm-valores-inner">
          <div className="nm-valores-header reveal">
            <p className="section-tag">Espiritualidade</p>
            <h2>Nossos Valores</h2>
            <div className="gold-line center" />
            <p>O que nos move, o que nos une, o que nos envia.</p>
          </div>
          <div className="nm-valores-grid">
            {VALORES.map((v, i) => (
              <div key={i} className={`nm-valor-card reveal delay-${(i % 3) + 1}`}>
                <span className="nm-valor-icon">{v.icon}</span>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citação */}
      <section className="nm-citacao">
        <div className="nm-citacao-inner reveal">
          <img src={SaoFrancisco} alt="São Francisco" className="nm-cit-img" />
          <blockquote>
            "Comece por fazer o que é necessário, depois o que é possível, e de repente estará fazendo o impossível."
          </blockquote>
          <cite>— São Francisco de Assis</cite>
        </div>
      </section>

      {/* Timeline */}
      <section className="nm-timeline">
        <div className="nm-timeline-inner">
          <div className="nm-tl-header reveal">
            <p className="section-tag">Nossa História</p>
            <h2>Uma missão que cresce<br /><em>a cada ano</em></h2>
            <div className="gold-line center" />
          </div>
          <div className="nm-tl-lista">
            {LINHAS.map((l, i) => (
              <div key={i} className={`nm-tl-item reveal delay-${(i % 3) + 1}`}>
                <div className="nm-tl-ano">{l.ano}</div>
                <div className="nm-tl-dot" />
                <div className="nm-tl-body">
                  <h4>{l.titulo}</h4>
                  <p>{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segunda foto */}
      <section className="nm-foto-full">
        <img src={Irmas5} alt="Instituto Filhas de Santa Clara" />
        <div className="nm-foto-overlay">
          <p>"Não me perco de vista no ponto de partida."</p>
          <span>— Santa Clara de Assis</span>
        </div>
      </section>

      {/* Vocação CTA */}
      <section className="nm-vocacao-cta reveal">
        <div className="nm-vocacao-cta-inner">
          <p className="section-tag">Chamado</p>
          <h2>Você sente esse chamado em seu coração?</h2>
          <div className="gold-line center" />
          <p>
            A vida religiosa é um presente de Deus — um caminho de amor, liberdade e missão.
            Se você sente que Deus está chamando, venha conhecer nossa forma de vida.
          </p>
          <div className="nm-cta-btns">
            <a
              href="https://api.whatsapp.com/send/?phone=5583991853511"
              target="_blank"
              rel="noreferrer"
              className="btn-dourado"
            >
              💬 Falar com as irmãs
            </a>
            <Link to="/Doador" className="btn-outline-marrom">Apoiar a missão</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
