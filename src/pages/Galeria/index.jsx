import { useState, useEffect } from 'react';
import { apiGet } from '../../api';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import logo from '../../assets/img/logooBranca.png';
import './style.css';

const TODAS = 'Todas';

function Lightbox({ foto, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="gl-lightbox" onClick={onClose}>
      <button className="gl-lb-close" onClick={onClose}>✕</button>
      <div className="gl-lb-inner" onClick={e => e.stopPropagation()}>
        <img src={foto.imagemurl} alt={foto.titulo} />
        <div className="gl-lb-info">
          <span className="gl-badge">{foto.categoria}</span>
          <h3>{foto.titulo}</h3>
          {foto.descricao && <p>{foto.descricao}</p>}
        </div>
      </div>
    </div>
  );
}

function formatarData(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Galeria() {
  useScrollReveal();
  const [fotos,      setFotos]      = useState([]);
  const [filtro,     setFiltro]     = useState(TODAS);
  const [carregando, setCarregando] = useState(true);
  const [lightbox,   setLightbox]   = useState(null);

  useEffect(() => {
    apiGet('/api/galeria')
      .then(setFotos)
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  const categorias = [TODAS, ...new Set(fotos.map(f => f.categoria).filter(Boolean))];
  const visiveis   = filtro === TODAS ? fotos : fotos.filter(f => f.categoria === filtro);

  return (
    <div className="gl-page">

      {/* Hero */}
      <section className="gl-hero">
        <div className="gl-hero-content reveal">
          <p className="section-tag" style={{ color: 'var(--dourado-claro)' }}>Nossas memórias</p>
          <h1>Galeria</h1>
          <div className="gold-line center" />
          <p>Momentos de fé, amor e serviço registrados em imagens.</p>
        </div>
      </section>

      {/* Filtros */}
      {!carregando && fotos.length > 0 && (
        <div className="gl-filtros-wrap">
          <div className="gl-filtros">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`gl-filtro-btn${filtro === cat ? ' ativo' : ''}`}
                onClick={() => setFiltro(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feed */}
      <section className="gl-feed-section">
        {carregando && (
          <div className="gl-loading">
            <div className="gl-spinner" />
            <p>Carregando…</p>
          </div>
        )}

        {!carregando && fotos.length === 0 && (
          <div className="gl-vazio">
            <p>A galeria ainda não possui fotos.</p>
            <p className="gl-vazio-sub">Em breve novos momentos serão registrados aqui.</p>
          </div>
        )}

        {!carregando && visiveis.length > 0 && (
          <div className="gl-feed">
            {visiveis.map(foto => (
              <article key={foto.id} className="gl-post reveal">

                {/* Cabeçalho do post */}
                <div className="gl-post-header">
                  <div className="gl-post-avatar">
                    <img src={logo} alt="Fraternidade FSC" />
                  </div>
                  <div className="gl-post-meta">
                    <span className="gl-post-autor">Fraternidade FSC</span>
                    <span className="gl-post-data">{formatarData(foto.created_at)}</span>
                  </div>
                  <span className="gl-badge">{foto.categoria}</span>
                </div>

                {/* Imagem */}
                <div className="gl-post-img" onClick={() => setLightbox(foto)}>
                  <img src={foto.imagemurl} alt={foto.titulo} loading="lazy" />
                </div>

                {/* Rodapé do post */}
                <div className="gl-post-body">
                  <p className="gl-post-titulo">{foto.titulo}</p>
                  {foto.descricao && <p className="gl-post-desc">{foto.descricao}</p>}
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

      {lightbox && <Lightbox foto={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
