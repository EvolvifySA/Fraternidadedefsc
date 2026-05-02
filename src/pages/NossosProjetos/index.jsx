import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./style.css";

import Proj1 from "../../assets/img/projeto1.jpg";
import Proj3 from "../../assets/img/projeto3.jpg";
import Proj4 from "../../assets/img/Projeto4.jpg";
import Proj5 from "../../assets/img/projeto5.jpg";
import Proj6 from "../../assets/img/Projeto6.jpg";
import Proj7 from "../../assets/img/Projeto7.jpg";

const PROJETOS = [
  {
    id: 1,
    img: Proj1,
    cat: "Geração de Renda",
    titulo: "Mãos que Transformam",
    desc: "Capacitação profissional para mulheres em situação de vulnerabilidade social. Oferecemos cursos de costura, artesanato, culinária e empreendedorismo para devolver dignidade e autonomia financeira a famílias inteiras.",
    acoes: ["Cursos de capacitação", "Oficinas de artesanato", "Apoio ao empreendedorismo", "Geração de renda familiar"],
    cor: "#C9A84C",
  },
  {
    id: 2,
    img: Proj3,
    cat: "Evangelização",
    titulo: "Missão Anunciar",
    desc: "Integra todas as ações evangelizadoras do Instituto, levando a Palavra de Deus e a alegria do Evangelho às periferias existenciais por meio de missões, grupos de oração, retiros, formações e atendimentos espirituais.",
    acoes: ["Missões populares", "Grupos de oração", "Retiros espirituais", "Pregações e formações"],
    cor: "#774922",
  },
  {
    id: 3,
    img: Proj4,
    cat: "Acolhimento Social",
    titulo: "Projeto Fortalecer",
    desc: "Acolhimento espiritual, socioemocional e fraterno a famílias e pessoas em situação de sofrimento, contribuindo para o fortalecimento da fé, da autoestima e dos vínculos familiares e comunitários.",
    acoes: ["Escuta ativa e acolhimento", "Apoio emocional", "Fortalecimento familiar", "Encaminhamentos sociais"],
    cor: "#5D3A1A",
  },
  {
    id: 4,
    img: Proj5,
    cat: "Segurança Alimentar",
    titulo: "Alimentando Esperança",
    desc: "Promoção da segurança alimentar a famílias em vulnerabilidade e pessoas em situação de rua. Distribuição regular de refeições, cestas básicas e alimentos essenciais para combater a fome no cotidiano.",
    acoes: ["Distribuição de refeições", "Cestas básicas mensais", "Atendimento a pessoas em situação de rua", "Parceria com doadores"],
    cor: "#C9A84C",
  },
  {
    id: 5,
    img: Proj6,
    cat: "Infância e Juventude",
    titulo: "Projeto Menino Jesus",
    desc: "Acolhe crianças e adolescentes em situação de vulnerabilidade social, oferecendo formação humana e cristã por meio de oficinas socioeducativas, atividades evangelizadoras e incentivo à cidadania ativa.",
    acoes: ["Oficinas socioeducativas", "Formação humana e cristã", "Atividades culturais", "Cidadania e liderança"],
    cor: "#774922",
  },
  {
    id: 6,
    img: Proj7,
    cat: "Missão",
    titulo: "Visitas Missionárias",
    desc: "Ação missionária direta nas periferias, comunidades carentes e hospitais de João Pessoa. Nossas irmãs levam consolo, oração e presença fraterna a quem mais precisa de um olhar de amor.",
    acoes: ["Visitas hospitalares", "Missão nas periferias", "Oração e consolo", "Presença fraterna"],
    cor: "#5D3A1A",
  },
];

export default function NossosProjetos() {
  useScrollReveal();

  return (
    <div className="np-page">

      {/* Hero */}
      <section className="np-hero">
        <div className="np-hero-overlay" />
        <div className="np-hero-content reveal">
          <p className="section-tag" style={{ color: "var(--dourado-claro)" }}>O que fazemos</p>
          <h1>Nossos Projetos</h1>
          <div className="gold-line center" />
          <p>Cada projeto é uma resposta concreta ao chamado do Evangelho — amor que age, fé que transforma.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="np-intro reveal">
        <div className="np-intro-inner">
          <p>
            O Instituto Filhas de Santa Clara atua em João Pessoa com <strong>5 projetos sociais e missionários</strong>,
            tocando vidas de famílias em situação de vulnerabilidade, crianças, jovens e pessoas em sofrimento.
            Cada iniciativa nasce da escuta atenta da realidade e do desejo genuíno de ser instrumento de Deus
            no serviço ao próximo.
          </p>
        </div>
      </section>

      {/* Projetos */}
      <section className="np-projetos">
        <div className="np-projetos-inner">
          {PROJETOS.map((p, i) => (
            <div key={p.id} className={`np-card reveal${i % 2 !== 0 ? "-right" : "-left"}`}>
              <div className="np-card-img">
                <img src={p.img} alt={p.titulo} />
                <span className="np-cat" style={{ background: p.cor }}>{p.cat}</span>
              </div>
              <div className="np-card-body">
                <span className="np-num">0{p.id}</span>
                <h2>{p.titulo}</h2>
                <div className="gold-line" />
                <p className="np-desc">{p.desc}</p>
                <ul className="np-acoes">
                  {p.acoes.map((a, j) => (
                    <li key={j}>
                      <span className="np-check">✦</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="np-cta reveal">
        <div className="np-cta-inner">
          <p className="section-tag">Faça parte</p>
          <h2>Esses projetos existem<br /><em>graças a você</em></h2>
          <p>Sua doação ou voluntariado mantém cada uma dessas missões viva. Junte-se a nós.</p>
          <div className="np-cta-btns">
            <a href="/Doador" className="btn-dourado">❤ Quero Ajudar</a>
            <a href="https://api.whatsapp.com/send/?phone=5583991853511" target="_blank" rel="noreferrer" className="btn-outline-marrom">
              Ser Voluntário
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
