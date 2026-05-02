import { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./style.css";

import Pix    from "../../assets/img/pix.svg";
import Irmas3 from "../../assets/img/Irmas3.jpg";

const IMPACTOS = [
  { valor: "R$ 25",  icon: "🍚", desc: "Alimenta uma família por uma semana" },
  { valor: "R$ 50",  icon: "📚", desc: "Financia materiais para uma criança por um mês" },
  { valor: "R$ 100", icon: "👩‍🎓", desc: "Custeia uma oficina de capacitação profissional" },
  { valor: "R$ 250", icon: "🏠", desc: "Apoia uma família em vulnerabilidade por um mês" },
];

const BENEFICIOS = [
  { icon: "📧", titulo: "Relatórios mensais",    desc: "Receba por e-mail o impacto real da sua doação com histórias e números." },
  { icon: "🙏", titulo: "Oração pelas intenções", desc: "Nossas irmãs oram pelas intenções de todos os nossos benfeitores." },
  { icon: "📜", titulo: "Certificado anual",      desc: "Declaração de doação para fins fiscais e reconhecimento da missão." },
  { icon: "💌", titulo: "Carta das irmãs",        desc: "Uma vez por ano, receba uma carta de agradecimento escrita pelas irmãs." },
];

const FAQ = [
  { p: "Minha doação vai realmente ajudar?",            r: "Sim. 100% das doações são aplicadas diretamente nos projetos sociais. Não temos intermediários e toda a gestão é feita pelas próprias irmãs com total transparência." },
  { p: "Posso cancelar a doação mensal a qualquer momento?", r: "Sim, você pode cancelar a qualquer momento sem nenhuma burocracia. Basta entrar em contato conosco por WhatsApp ou e-mail." },
  { p: "Como sei que minha doação foi recebida?",        r: "Assim que confirmarmos o recebimento, enviaremos uma mensagem de agradecimento com a confirmação da doação." },
  { p: "Posso fazer uma doação em nome de outra pessoa?", r: "Sim! É uma bela forma de presentear alguém ou honrar a memória de um ente querido. Entre em contato para combinarmos os detalhes." },
];

export default function Doador() {
  useScrollReveal();
  const [faqAberto, setFaqAberto] = useState(null);

  return (
    <div className="doador-page">

      {/* Hero */}
      <section className="doador-hero" style={{ backgroundImage: `url(${Irmas3})` }}>
        <div className="doador-hero-overlay" />
        <div className="doador-hero-content reveal">
          <p className="section-tag" style={{ color: "var(--dourado-claro)" }}>Faça Parte</p>
          <h1>Seja um Benfeitor</h1>
          <div className="gold-line center" />
          <p>Sua doação não é só dinheiro.<br />É esperança concreta na vida de quem mais precisa.</p>
          <a href="#doe-agora" className="btn-dourado">❤ Quero Ajudar Agora</a>
        </div>
      </section>

      {/* Por que doar */}
      <section className="doador-porque reveal">
        <div className="doador-porque-inner">
          <p className="section-tag">O Impacto Real</p>
          <h2>Cada real <em>transforma uma vida</em></h2>
          <div className="gold-line" />
          <p className="doador-porque-sub">
            Veja o que sua generosidade concretamente realiza no dia a dia do Instituto Filhas de Santa Clara.
          </p>
          <div className="impacto-cards">
            {IMPACTOS.map((imp, i) => (
              <div key={i} className={`impacto-card-doador reveal delay-${i + 1}`}>
                <span className="impacto-emoji">{imp.icon}</span>
                <strong className="impacto-valor">{imp.valor}</strong>
                <p>{imp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIX */}
      <section className="doador-pix" id="doe-agora">
        <div className="doador-pix-inner">

          <div className="pix-texto reveal-left">
            <p className="section-tag">Doe agora</p>
            <h2>Simples, rápido<br /><em>e seguro</em></h2>
            <div className="gold-line" />
            <p>
              Faça sua doação via PIX em segundos. Escaneie o QR code ou copie a chave PIX abaixo.
              Para doações mensais, entre em contato pelo WhatsApp — teremos prazer em te orientar.
            </p>
            <div className="pix-formas">
              <div className="pix-forma">
                <span>📱</span>
                <div>
                  <strong>PIX Avulso</strong>
                  <p>Doação única, no valor que quiser</p>
                </div>
              </div>
              <div className="pix-forma">
                <span>🔄</span>
                <div>
                  <strong>Benfeitor Mensal</strong>
                  <p>Doação recorrente — impacto contínuo</p>
                </div>
              </div>
              <div className="pix-forma">
                <span>🏦</span>
                <div>
                  <strong>Transferência Bancária</strong>
                  <p>Entre em contato para dados bancários</p>
                </div>
              </div>
            </div>
            <a
              href="https://api.whatsapp.com/send/?phone=5583991853511&text=Olá!%20Gostaria%20de%20ser%20benfeitor%20mensal."
              target="_blank"
              rel="noreferrer"
              className="btn-dourado"
            >
              💬 Quero ser benfeitor mensal
            </a>
          </div>

          <div className="pix-qr-card reveal-right">
            <div className="pix-badge-top">
              <span>PIX</span>
              <strong>Doação Segura</strong>
            </div>
            <img src={Pix} alt="QR Code PIX" />
            <div className="pix-chave-destaque">
              <p className="pix-chave-label-d">Chave PIX (e-mail)</p>
              <p className="pix-chave-valor">FranternidadeFilhasdeSantaClara<br/>@gmail.com</p>
            </div>
            <p className="pix-aviso">🙏 Toda doação, grande ou pequena, é recebida com gratidão e amor.</p>
          </div>

        </div>
      </section>

      {/* Benefícios */}
      <section className="doador-beneficios">
        <div className="doador-beneficios-inner">
          <div className="db-header reveal">
            <p className="section-tag" style={{ color: "var(--dourado-claro)" }}>Reconhecimento</p>
            <h2>O que você recebe<br />sendo benfeitor</h2>
            <div className="gold-line center" style={{ background: "linear-gradient(90deg, transparent, var(--dourado-claro), transparent)" }} />
          </div>
          <div className="db-grid">
            {BENEFICIOS.map((b, i) => (
              <div key={i} className={`db-card reveal delay-${i + 1}`}>
                <span className="db-icon">{b.icon}</span>
                <h3>{b.titulo}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento destaque */}
      <section className="doador-depo reveal">
        <div className="doador-depo-inner">
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
            <path d="M0 32V18.7C0 12.8 1.8 8.2 5.4 5 9 1.8 14 0 20.4 0v5.5c-4 0-7.2 1.2-9.4 3.4-2.2 2.3-3.4 5.3-3.4 9h6.2V32H0ZM20 32V18.7c0-5.9 1.8-10.5 5.4-13.7C28.9 1.8 33.9 0 40.3 0v5.5c-4 0-7.2 1.2-9.4 3.4-2.2 2.3-3.4 5.3-3.4 9h6.2V32H20Z" fill="var(--dourado)"/>
          </svg>
          <p>
            "Ser benfeitora do Instituto Filhas de Santa Clara é uma das coisas mais bonitas que faço no mês.
            Cada real que envio sei que chega onde precisa. Ver o trabalho das irmãs de perto é inspirador —
            elas vivem o Evangelho de verdade."
          </p>
          <div className="depo-destaque-autor">
            <div className="depo-destaque-avatar">C</div>
            <div>
              <strong>Cristiane Mendes</strong>
              <span>Benfeitora mensal há 18 meses · Recife, PE</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="doador-faq">
        <div className="doador-faq-inner">
          <div className="faq-header reveal">
            <p className="section-tag">Dúvidas</p>
            <h2>Perguntas frequentes</h2>
            <div className="gold-line center" />
          </div>
          <div className="faq-lista">
            {FAQ.map((f, i) => (
              <div key={i} className={`faq-item reveal${faqAberto === i ? " faq-aberto" : ""}`}>
                <button
                  className="faq-pergunta"
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                >
                  {f.p}
                  <span className="faq-chevron">{faqAberto === i ? "▲" : "▼"}</span>
                </button>
                {faqAberto === i && (
                  <p className="faq-resposta">{f.r}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="doador-cta-final reveal">
        <div className="doador-cta-final-inner">
          <h2>Pronto para fazer a diferença?</h2>
          <p>Sua generosidade é a mão de Deus chegando até quem precisa. Obrigado por ser parte dessa missão.</p>
          <div className="dcf-btns">
            <a href="#doe-agora" className="btn-dourado">❤ Fazer minha doação</a>
            <a
              href="https://api.whatsapp.com/send/?phone=5583991853511"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-branco"
            >
              💬 Falar com as irmãs
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
