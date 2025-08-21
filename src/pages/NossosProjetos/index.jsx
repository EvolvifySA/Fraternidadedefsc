import React from "react";
import "./style.css";
import projeto from "../../assets/img/projeto1.jpg";

function NossosProjetos() {
  return (
    <div className="nossosprojetos">
      <h1 className="titulo-principal">Nossos Projetos</h1>

      <div className="timeline">
        <div className="projeto esquerda">
          <div className="conteudo">
            <h2 className="projeto-titulo">Mãos que Transformam</h2>
            <p className="projeto-texto">
              Capacitação e geração de renda que devolve dignidade e autonomia a
              pessoas em situação de vulnerabilidade social.
            </p>
            <img src={projeto} alt="projeto" className="projeto-img" />
          </div>
        </div>

        <div className="projeto direita">
          <div className="conteudo">
            <h2 className="projeto-titulo">Missão Anunciar</h2>
            <p className="projeto-texto">
              Integra todas as ações evangelizadoras da Fraternidade, levando a
              Palavra de Deus, a espiritualidadee a alegria do Evangelho às
              periferias existenciais por meio de missões, formações, grupos de
              oração, retiros, espiritualizações, pregações e atendimentos
              espirituais.
            </p>
            <img src={projeto} alt="projeto" className="projeto-img" />
          </div>
        </div>

        <div className="projeto esquerda">
          <div className="conteudo">
            <h2 className="projeto-titulo">Projeto Fortalecer</h2>
            <p className="projeto-texto">
              Acolhimento espiritual, socioemocional e fraterno a famílias e
              pessoas em situação de sofrimento, contribuindo para o
              fortalecimento da fé, da autoestima e dos vínculos familiares e
              comunitários.
            </p>
            <img src={projeto} alt="projeto" className="projeto-img" />
          </div>
        </div>

        <div className="projeto direita">
          <div className="conteudo">
            <h2 className="projeto-titulo">Alimentando Esperança</h2>
            <p className="projeto-texto">
              Promoção da segurança alimentar a famílias em vulnerabilidade e
              pessoas em situação de rua.
            </p>
            <img src={projeto} alt="projeto" className="projeto-img" />
          </div>
        </div>

        <div className="projeto esquerda">
          <div className="conteudo">
            <h2 className="projeto-titulo">Projeto Menino Jesus</h2>
            <p className="projeto-texto">
              Acolhe crianças e adolescentes em situação de vulnerabilidade
              social, oferecendo formação humana e cristã por meio de oficinas
              socioeducativas, atividades evangelizadoras, incentivo à cidadania
              ativa e valorização das artes como instrumento de expressão e
              transformação.
            </p>
            <img src={projeto} alt="projeto" className="projeto-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NossosProjetos;
