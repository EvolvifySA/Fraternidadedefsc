import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCounter } from "../../hooks/useCounter";
import "./Style.css";

/* ── Imagens ── */
import HeroBg    from "../../assets/img/Carrossel1.jpg";
import HeroBg2   from "../../assets/img/Irmas4.jpg";
import HeroBg3   from "../../assets/img/Irmas3.jpg";
import Proj1     from "../../assets/img/projeto1.jpg";
import Proj3     from "../../assets/img/projeto3.jpg";
import Proj4     from "../../assets/img/Projeto4.jpg";
import Proj5     from "../../assets/img/projeto5.jpg";
import Proj6     from "../../assets/img/Projeto6.jpg";
import VocacaoBg from "../../assets/img/Irmas5.jpg";
import Pix       from "../../assets/img/pix.svg";
import SantaClara from "../../assets/img/SantaClaraeJesus.png";

/* ══════════════════════════════════════
   DADOS
══════════════════════════════════════ */
const HERO_SLIDES = [
  { bg: HeroBg,  titulo: "Amar, Servir", sub: "e Transformar Vidas" },
  { bg: HeroBg2, titulo: "Uma Missão de Fé", sub: "no Coração do Nordeste" },
  { bg: HeroBg3, titulo: "Com Prontidão", sub: "e Solicitude" },
];

const PILARES = [
  {
    icon: "✝",
    titulo: "Nossa Identidade",
    texto:
      "Somos uma fraternidade religiosa feminina fundada em 2022, vivendo o carisma franciscano-clariano com alegria e fidelidade.",
  },
  {
    icon: "🤲",
    titulo: "Nossa Missão",
    texto:
      "Evangelizar e servir os pobres em João Pessoa – PB, levando esperança, dignidade e o amor concreto de Deus a quem mais precisa.",
  },
  {
    icon: "🌹",
    titulo: "Nossa Vida",
    texto:
      "Mulheres que escolheram entregar a vida a Deus, vivendo em comunidade e missão para transformar realidades ao redor.",
  },
];

const PROJETOS = [
  { img: Proj1, titulo: "Mãos que Transformam",  cat: "Geração de Renda",   desc: "Capacitação profissional para mulheres em situação de vulnerabilidade, gerando renda e dignidade para famílias inteiras." },
  { img: Proj3, titulo: "Missão Anunciar",        cat: "Evangelização",      desc: "Levamos o Evangelho vivo às periferias, paróquias e comunidades através de missões, catequese e encontros de fé." },
  { img: Proj4, titulo: "Projeto Fortalecer",     cat: "Acolhimento",        desc: "Atendimento integral a pessoas em situação de vulnerabilidade social, com escuta, apoio e encaminhamento." },
  { img: Proj5, titulo: "Alimentando Esperança",  cat: "Segurança Alimentar", desc: "Distribuição de cestas básicas e refeições a famílias em insegurança alimentar na periferia de João Pessoa." },
  { img: Proj6, titulo: "Projeto Menino Jesus",   cat: "Crianças",           desc: "Espaço de proteção, educação e amor para crianças e adolescentes em situação de risco social." },
];

const NUMEROS = [
  { valor: 500, sufixo: "+", rotulo: "Famílias Atendidas",  icone: "👨‍👩‍👧‍👦" },
  { valor: 5,   sufixo: "",  rotulo: "Projetos Ativos",     icone: "🌱" },
  { valor: 3,   sufixo: "",  rotulo: "Anos de Missão",      icone: "⭐" },
  { valor: 80,  sufixo: "+", rotulo: "Voluntários",         icone: "🤝" },
];

const DEPOIMENTOS = [
  {
    texto: "A Fraternidade mudou minha vida. Quando eu não tinha mais onde recorrer, encontrei aqui acolhimento verdadeiro e uma nova chance de recomeçar com dignidade.",
    nome: "Maria Aparecida S.",
    cargo: "Beneficiária do Projeto Fortalecer",
    inicial: "M",
  },
  {
    texto: "Ver as irmãs em ação é testemunhar o Evangelho vivo. Cada visita, cada abraço, cada refeição servida é Jesus presente no rosto dos pobres.",
    nome: "Pe. Marcos Vieira",
    cargo: "Pároco parceiro da missão",
    inicial: "P",
  },
  {
    texto: "Doe com confiança. Cada contribuição chega às mãos de quem mais precisa. O trabalho do Instituto é sério, transparente e cheio de amor.",
    nome: "Fernanda Lima",
    cargo: "Benfeitora mensal há 2 anos",
    inicial: "F",
  },
];

/* ══════════════════════════════════════
   SEÇÕES
══════════════════════════════════════ */
function HeroSection() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const atual = HERO_SLIDES[slide];

  return (
    <section className="hero">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-bg${i === slide ? " hero-bg--ativo" : ""}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-tag section-tag">Instituto Filhas de Santa Clara</p>
        <h1 className="hero-titulo">
          {atual.titulo}
          <br />
          <em>{atual.sub}</em>
        </h1>
        <p className="hero-subtexto">
          Uma missão de fé e amor no coração do Nordeste.<br />
          Juntos, alcançamos quem mais precisa.
        </p>
        <div className="hero-btns">
          <Link to="/Doador" className="btn-dourado">❤ Quero Ajudar</Link>
          <Link to="/NossaMissao" className="btn-outline-branco">Quero Ser Irmã</Link>
        </div>
      </div>

      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === slide ? " hero-dot--ativo" : ""}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-icon" />
        <span className="hero-scroll-label">Rolar</span>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        <div className="stat">
          <strong>500+</strong>
          <span>Famílias Atendidas</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <strong>5</strong>
          <span>Projetos Ativos</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <strong>2022</strong>
          <span>Ano de Fundação</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <strong>JP – PB</strong>
          <span>João Pessoa, Paraíba</span>
        </div>
      </div>
    </div>
  );
}

function SobreSection() {
  return (
    <section className="sobre">
      <div className="sobre-inner">
        <div className="sobre-header reveal">
          <p className="section-tag">Quem Somos</p>
          <h2>Uma missão nascida<br />do amor de Deus</h2>
          <div className="gold-line" />
          <p className="sobre-intro">
            O Instituto Filhas de Santa Clara é uma fraternidade religiosa feminina dedicada
            à evangelização e ao serviço aos mais pobres, inspirada no carisma de Santa Clara
            e São Francisco de Assis.
          </p>
        </div>

        <div className="sobre-grid">
          {PILARES.map((p, i) => (
            <div key={i} className={`sobre-card reveal delay-${i + 1}`}>
              <div className="sobre-icon">{p.icon}</div>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </div>
          ))}
        </div>

        <div className="sobre-cta reveal delay-4">
          <Link to="/Institucional/QuemSomos" className="btn-outline-marrom">
            Conheça nossa história
          </Link>
        </div>
      </div>
    </section>
  );
}

function MissaoSection() {
  return (
    <section className="missao">
      <div className="missao-overlay" />
      <div className="missao-inner reveal">
        <p className="section-tag">Nossa Missão</p>
        <blockquote className="missao-quote">
          "Com prontidão e solicitude, amar e servir."
        </blockquote>
        <div className="gold-line center" />
        <p className="missao-texto">
          Vivemos a espiritualidade franciscana-clariana, anunciando o Evangelho
          com obras concretas de misericórdia — alimentando, acolhendo, capacitando
          e evangelizando os irmãos mais pobres.
        </p>
        <img src={SantaClara} alt="Santa Clara e Jesus" className="missao-img" />
      </div>
    </section>
  );
}

function ProjetosSection() {
  return (
    <section className="projetos">
      <div className="projetos-inner">
        <div className="projetos-header reveal">
          <p className="section-tag">O que fazemos</p>
          <h2>Nossos Projetos</h2>
          <div className="gold-line" />
          <p>Cada projeto é uma resposta concreta ao chamado do Evangelho.</p>
        </div>

        <div className="projetos-grid">
          {PROJETOS.map((proj, i) => (
            <div key={i} className={`proj-card reveal delay-${(i % 3) + 1}`}>
              <div
                className="proj-img"
                style={{ backgroundImage: `url(${proj.img})` }}
              >
                <span className="proj-cat">{proj.cat}</span>
                <div className="proj-overlay">
                  <p>{proj.desc}</p>
                  <Link to="/NossosProjetos" className="proj-ver">
                    Ver projeto →
                  </Link>
                </div>
              </div>
              <div className="proj-info">
                <h3>{proj.titulo}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="projetos-cta reveal">
          <Link to="/NossosProjetos" className="btn-dourado">Ver todos os projetos</Link>
        </div>
      </div>
    </section>
  );
}

function ImpactoCounter({ valor, sufixo, rotulo, icone }) {
  const { count, ref } = useCounter(valor);
  return (
    <div className="impacto-card" ref={ref}>
      <span className="impacto-icon">{icone}</span>
      <strong className="impacto-num">
        {count}
        {sufixo}
      </strong>
      <span className="impacto-label">{rotulo}</span>
    </div>
  );
}

function ImpactoSection() {
  return (
    <section className="impacto">
      <div className="impacto-inner">
        <div className="impacto-header reveal">
          <p className="section-tag" style={{ color: "var(--dourado-claro)" }}>Nosso Impacto</p>
          <h2>Cada número é uma vida transformada</h2>
          <div className="gold-line center" />
        </div>
        <div className="impacto-grid">
          {NUMEROS.map((n, i) => (
            <ImpactoCounter key={i} {...n} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VocacaoSection() {
  return (
    <section className="vocacao" style={{ backgroundImage: `url(${VocacaoBg})` }}>
      <div className="vocacao-overlay" />
      <div className="vocacao-inner reveal">
        <p className="section-tag">Chamado</p>
        <h2>Você sente esse chamado?</h2>
        <div className="gold-line center" />
        <p>
          Talvez Deus esteja falando ao seu coração neste momento. A vida religiosa
          é uma entrega total de amor — uma aventura de fé que transforma não apenas
          você, mas todos ao seu redor.
        </p>
        <div className="vocacao-pilares">
          <div className="vocacao-pilar">
            <span>🙏</span>
            <strong>Oração</strong>
          </div>
          <div className="vocacao-pilar">
            <span>💞</span>
            <strong>Serviço</strong>
          </div>
          <div className="vocacao-pilar">
            <span>✨</span>
            <strong>Missão</strong>
          </div>
        </div>
        <Link to="/NossaMissao" className="btn-dourado">
          Quero conhecer a vocação →
        </Link>
      </div>
    </section>
  );
}

function DoacaoSection() {
  return (
    <section className="doacao">
      <div className="doacao-inner">
        <div className="doacao-texto reveal-left">
          <p className="section-tag">Faça Parte</p>
          <h2>
            Sua ajuda<br />
            <em>transforma vidas reais</em>
          </h2>
          <div className="gold-line" />
          <p>
            Cada contribuição alimenta uma família, capacita uma mulher, acolhe
            uma criança. Sua doação não é só dinheiro — é esperança concreta nas
            mãos de quem mais precisa.
          </p>
          <ul className="doacao-lista">
            <li>✔ 100% aplicado nos projetos</li>
            <li>✔ Transparência total</li>
            <li>✔ Impacto real e mensurável</li>
          </ul>
          <div className="doacao-btns">
            <a href="#pix-section" className="btn-dourado">📱 Doar via PIX</a>
            <Link to="/Doador" className="btn-outline-marrom">Ser benfeitor mensal</Link>
          </div>
        </div>

        <div className="doacao-pix reveal-right" id="pix-section">
          <div className="pix-card">
            <div className="pix-topo">
              <span className="pix-badge">PIX</span>
              <h3>Doe agora</h3>
              <p>Escaneie o QR code ou copie a chave</p>
            </div>
            <img src={Pix} alt="QR Code PIX" className="pix-qr" />
            <div className="pix-chave-box">
              <span className="pix-chave-label">Chave PIX (e-mail)</span>
              <p className="pix-chave">FranternidadeFilhasdeSantaClara@gmail.com</p>
            </div>
            <p className="pix-nota">
              🙏 Toda doação, grande ou pequena, transforma vidas reais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DepoimentosSection() {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAtual((p) => (p + 1) % DEPOIMENTOS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="depos">
      <div className="depos-inner">
        <div className="depos-header reveal">
          <p className="section-tag">Depoimentos</p>
          <h2>O que dizem sobre nossa missão</h2>
          <div className="gold-line center" />
        </div>

        <div className="depos-slider">
          {DEPOIMENTOS.map((d, i) => (
            <div key={i} className={`depo-card${i === atual ? " depo-card--ativo" : ""}`}>
              <svg className="aspas" width="36" height="28" viewBox="0 0 36 28" fill="none">
                <path d="M0 28V16.4C0 11.2 1.6 7.2 4.8 4.4C8 1.6 12.4 0 18 0v4.8C14.4 4.8 11.6 5.8 9.6 7.8C7.6 9.8 6.6 12.4 6.6 15.6H12V28H0ZM18 28V16.4C18 11.2 19.6 7.2 22.8 4.4C26 1.6 30.4 0 36 0v4.8C32.4 4.8 29.6 5.8 27.6 7.8C25.6 9.8 24.6 12.4 24.6 15.6H30V28H18Z" fill="var(--dourado)"/>
              </svg>
              <p className="depo-texto">{d.texto}</p>
              <div className="depo-autor">
                <div className="depo-avatar">{d.inicial}</div>
                <div>
                  <strong>{d.nome}</strong>
                  <span>{d.cargo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="depos-dots">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={i}
              className={`dot${i === atual ? " dot--ativo" : ""}`}
              onClick={() => setAtual(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   HOME PRINCIPAL
══════════════════════════════════════ */
export default function Home() {
  useScrollReveal();

  return (
    <div className="home">
      <HeroSection />
      <StatsBar />
      <SobreSection />
      <MissaoSection />
      <ProjetosSection />
      <ImpactoSection />
      <VocacaoSection />
      <DoacaoSection />
      <DepoimentosSection />
    </div>
  );
}
