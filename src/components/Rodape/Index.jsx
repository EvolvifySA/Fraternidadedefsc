import { Link } from 'react-router-dom';
import './Style.css';
import logo from '../../assets/img/logooBranca.png';

const REDES = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Fraternidade-filhas-de-Santa-Clara/61561085580958/',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fraternidadefsc/',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=5583991853511',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@fraternidadefsc',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V9l5.74 3-5.74 3.02z"/>
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'Início',            to: '/' },
  { label: 'Quem Somos',        to: '/Institucional/QuemSomos' },
  { label: 'Nossa Fundadora',   to: '/Institucional/Fundadora' },
  { label: 'Baluartes',         to: '/Institucional/Baluarte' },
  { label: 'Nossos Projetos',   to: '/NossosProjetos' },
  { label: 'Nossa Missão',      to: '/NossaMissao' },
  { label: 'Seja Benfeitor',    to: '/Doador' },
];

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="rodape-inner">

        {/* Col 1 – Marca */}
        <div className="rodape-col rodape-marca">
          <img src={logo} alt="Instituto Filhas de Santa Clara" className="rodape-logo" />
          <p className="rodape-tagline">
            Com prontidão e solicitude,<br />
            <em>amar e servir.</em>
          </p>
          <div className="rodape-redes">
            {REDES.map((r) => (
              <a key={r.label} href={r.href} target="_blank" rel="noreferrer" aria-label={r.label} className="rede-btn">
                {r.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 – Navegação */}
        <div className="rodape-col">
          <h4 className="rodape-titulo">Navegação</h4>
          <ul className="rodape-lista">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rodape-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 – Contato */}
        <div className="rodape-col">
          <h4 className="rodape-titulo">Contato</h4>
          <ul className="rodape-contato-lista">
            <li>
              <span className="contato-icon">📍</span>
              <span>R. Antônio Pádua Vasconcelos, 53<br />Cristo Redentor – João Pessoa, PB</span>
            </li>
            <li>
              <span className="contato-icon">📧</span>
              <a href="mailto:FranternidadeFilhasdeSantaClara@gmail.com" className="rodape-link">
                FranternidadeFilhasdeSantaClara<br />@gmail.com
              </a>
            </li>
            <li>
              <span className="contato-icon">📞</span>
              <a href="tel:+5583991853511" className="rodape-link">(83) 9918-5311</a>
            </li>
          </ul>

          <Link to="/Doador" className="rodape-cta">
            ❤ Seja um Benfeitor
          </Link>
        </div>

      </div>

      <div className="rodape-bottom">
        <div>
          <p>© {ano} Instituto Filhas de Santa Clara. Todos os direitos reservados.</p>
          <p className="rodape-bottom-sub">Feito com ❤ para a glória de Deus e serviço ao próximo.</p>
        </div>
        <p className="rodape-dev">
          Desenvolvido por <a href="https://evolvify.com.br" target="_blank" rel="noreferrer">Leonardo Feitosa · Evolvify</a>
        </p>
      </div>
    </footer>
  );
}
