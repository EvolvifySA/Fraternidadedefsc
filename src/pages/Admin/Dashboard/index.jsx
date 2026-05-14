import { useState, useEffect, useRef } from 'react';
import { apiGet, apiPost, apiDelete } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logooBranca.png';
import './style.css';

const CATEGORIAS_GALERIA = ['Geral', 'Projetos', 'Missões', 'Eventos', 'Membros'];
const CORES_PROJETO = [
  { label: 'Dourado',       value: '#C9A84C' },
  { label: 'Marrom',        value: '#774922' },
  { label: 'Marrom Escuro', value: '#5D3A1A' },
];

function ProgressBar({ value }) {
  return (
    <div className="ad-progress-wrap">
      <div className="ad-progress-bar" style={{ width: `${value}%` }} />
      <span>{value}%</span>
    </div>
  );
}

function useColecao(colecao) {
  const [itens, setItens] = useState([]);

  async function carregar() {
    const data = await apiGet(`/api/${colecao}`);
    setItens(data);
  }

  useEffect(() => { carregar(); }, [colecao]);

  return { itens, recarregar: carregar };
}

// ────────────────────────────────────────────────────────
// ABA GALERIA
// ────────────────────────────────────────────────────────
function TabGaleria() {
  const { itens, recarregar } = useColecao('galeria');
  const [form, setForm]       = useState({ titulo: '', descricao: '', categoria: 'Geral' });
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [enviando, setEnviando]   = useState(false);
  const [erro, setErro]           = useState('');
  const fileRef = useRef();

  function onArquivo(e) {
    const f = e.target.files[0];
    if (!f) return;
    setArquivo(f);
    setPreview(URL.createObjectURL(f));
  }

  async function enviar(e) {
    e.preventDefault();
    if (!arquivo) { setErro('Selecione uma imagem.'); return; }
    setErro('');
    setEnviando(true);
    setProgresso(0);
    try {
      const fd = new FormData();
      fd.append('imagem', arquivo);
      fd.append('titulo', form.titulo);
      fd.append('descricao', form.descricao);
      fd.append('categoria', form.categoria);
      await apiPost('/api/galeria', fd, setProgresso);
      setForm({ titulo: '', descricao: '', categoria: 'Geral' });
      setArquivo(null);
      setPreview(null);
      fileRef.current.value = '';
      await recarregar();
    } catch { setErro('Erro ao enviar. Tente novamente.'); }
    finally { setEnviando(false); }
  }

  async function remover(item) {
    if (!confirm(`Remover "${item.titulo || 'esta foto'}"?`)) return;
    await apiDelete(`/api/galeria/${item.id}`);
    await recarregar();
  }

  return (
    <div className="ad-tab-content">
      <h2 className="ad-section-title">Galeria de Fotos</h2>

      <form className="ad-form" onSubmit={enviar}>
        <div className="ad-form-row">
          <div className="ad-field">
            <label>Título</label>
            <input
              value={form.titulo}
              onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
              placeholder="Ex: Festa de São Francisco 2025"
              required
            />
          </div>
          <div className="ad-field">
            <label>Categoria</label>
            <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
              {CATEGORIAS_GALERIA.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="ad-field">
          <label>Descrição (opcional)</label>
          <input
            value={form.descricao}
            onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            placeholder="Breve descrição da foto"
          />
        </div>
        <div className="ad-field">
          <label>Imagem</label>
          <div className="ad-upload-area" onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className="ad-preview-img" />
              : <span>Clique para selecionar uma imagem</span>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onArquivo} />
        </div>
        {enviando && <ProgressBar value={progresso} />}
        {erro && <p className="ad-erro">{erro}</p>}
        <button className="ad-btn-primary" type="submit" disabled={enviando}>
          {enviando ? `Enviando… ${progresso}%` : '+ Adicionar Foto'}
        </button>
      </form>

      <div className="ad-grid">
        {itens.length === 0 && <p className="ad-empty">Nenhuma foto ainda.</p>}
        {itens.map(item => (
          <div key={item.id} className="ad-media-card">
            <div className="ad-media-img">
              <img src={item.imagemurl} alt={item.titulo} />
              <span className="ad-badge">{item.categoria}</span>
            </div>
            <div className="ad-media-info">
              <strong>{item.titulo}</strong>
              {item.descricao && <p>{item.descricao}</p>}
            </div>
            <button className="ad-btn-delete" onClick={() => remover(item)} title="Remover">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// ABA MEMBROS
// ────────────────────────────────────────────────────────
function TabMembros() {
  const { itens, recarregar } = useColecao('membros');
  const [form, setForm]       = useState({ nome: '', cargo: '', descricao: '' });
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [enviando, setEnviando]   = useState(false);
  const [erro, setErro]           = useState('');
  const fileRef = useRef();

  function onArquivo(e) {
    const f = e.target.files[0];
    if (!f) return;
    setArquivo(f);
    setPreview(URL.createObjectURL(f));
  }

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    setProgresso(0);
    try {
      const fd = new FormData();
      fd.append('nome', form.nome);
      fd.append('cargo', form.cargo);
      fd.append('descricao', form.descricao);
      if (arquivo) fd.append('imagem', arquivo);
      await apiPost('/api/membros', fd, setProgresso);
      setForm({ nome: '', cargo: '', descricao: '' });
      setArquivo(null);
      setPreview(null);
      fileRef.current.value = '';
      await recarregar();
    } catch { setErro('Erro ao salvar. Tente novamente.'); }
    finally { setEnviando(false); }
  }

  async function remover(item) {
    if (!confirm(`Remover "${item.nome}"?`)) return;
    await apiDelete(`/api/membros/${item.id}`);
    await recarregar();
  }

  return (
    <div className="ad-tab-content">
      <h2 className="ad-section-title">Membros / Irmãs</h2>

      <form className="ad-form" onSubmit={enviar}>
        <div className="ad-form-row">
          <div className="ad-field">
            <label>Nome completo</label>
            <input
              value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              placeholder="Ex: Irmã Maria Clara"
              required
            />
          </div>
          <div className="ad-field">
            <label>Cargo / Função</label>
            <input
              value={form.cargo}
              onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))}
              placeholder="Ex: Superiora Provincial"
            />
          </div>
        </div>
        <div className="ad-field">
          <label>Descrição</label>
          <textarea
            value={form.descricao}
            onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            placeholder="Breve apresentação do membro"
            rows={3}
          />
        </div>
        <div className="ad-field">
          <label>Foto (opcional)</label>
          <div className="ad-upload-area" onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className="ad-preview-img" />
              : <span>Clique para selecionar uma foto</span>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onArquivo} />
        </div>
        {enviando && <ProgressBar value={progresso} />}
        {erro && <p className="ad-erro">{erro}</p>}
        <button className="ad-btn-primary" type="submit" disabled={enviando}>
          {enviando ? `Salvando… ${progresso}%` : '+ Adicionar Membro'}
        </button>
      </form>

      <div className="ad-membros-lista">
        {itens.length === 0 && <p className="ad-empty">Nenhum membro cadastrado.</p>}
        {itens.map(item => (
          <div key={item.id} className="ad-membro-card">
            {item.imagemurl
              ? <img src={item.imagemurl} alt={item.nome} className="ad-membro-foto" />
              : <div className="ad-membro-foto ad-membro-sem-foto">
                  {item.nome.charAt(0).toUpperCase()}
                </div>
            }
            <div className="ad-membro-info">
              <strong>{item.nome}</strong>
              {item.cargo && <span>{item.cargo}</span>}
              {item.descricao && <p>{item.descricao}</p>}
            </div>
            <button className="ad-btn-delete" onClick={() => remover(item)} title="Remover">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// ABA PROJETOS
// ────────────────────────────────────────────────────────
function TabProjetos() {
  const { itens, recarregar } = useColecao('projetos');
  const [form, setForm]       = useState({ titulo: '', cat: '', desc: '', acoes: '', cor: '#C9A84C' });
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [enviando, setEnviando]   = useState(false);
  const [erro, setErro]           = useState('');
  const fileRef = useRef();

  function onArquivo(e) {
    const f = e.target.files[0];
    if (!f) return;
    setArquivo(f);
    setPreview(URL.createObjectURL(f));
  }

  async function enviar(e) {
    e.preventDefault();
    if (!arquivo) { setErro('Selecione uma imagem.'); return; }
    setErro('');
    setEnviando(true);
    setProgresso(0);
    try {
      const fd = new FormData();
      fd.append('imagem', arquivo);
      fd.append('titulo', form.titulo);
      fd.append('cat', form.cat);
      fd.append('descricao', form.desc);
      fd.append('acoes', form.acoes);
      fd.append('cor', form.cor);
      await apiPost('/api/projetos', fd, setProgresso);
      setForm({ titulo: '', cat: '', desc: '', acoes: '', cor: '#C9A84C' });
      setArquivo(null);
      setPreview(null);
      fileRef.current.value = '';
      await recarregar();
    } catch { setErro('Erro ao salvar. Tente novamente.'); }
    finally { setEnviando(false); }
  }

  async function remover(item) {
    if (!confirm(`Remover "${item.titulo}"?`)) return;
    await apiDelete(`/api/projetos/${item.id}`);
    await recarregar();
  }

  return (
    <div className="ad-tab-content">
      <h2 className="ad-section-title">Projetos</h2>

      <form className="ad-form" onSubmit={enviar}>
        <div className="ad-form-row">
          <div className="ad-field">
            <label>Título do projeto</label>
            <input
              value={form.titulo}
              onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
              placeholder="Ex: Mãos que Transformam"
              required
            />
          </div>
          <div className="ad-field">
            <label>Categoria</label>
            <input
              value={form.cat}
              onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}
              placeholder="Ex: Geração de Renda"
            />
          </div>
        </div>
        <div className="ad-field">
          <label>Descrição</label>
          <textarea
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
            placeholder="Descreva o projeto"
            rows={3}
            required
          />
        </div>
        <div className="ad-field">
          <label>Ações (separadas por vírgula)</label>
          <input
            value={form.acoes}
            onChange={e => setForm(f => ({ ...f, acoes: e.target.value }))}
            placeholder="Ex: Cursos de capacitação, Oficinas, Apoio emocional"
          />
        </div>
        <div className="ad-form-row">
          <div className="ad-field">
            <label>Cor da categoria</label>
            <select value={form.cor} onChange={e => setForm(f => ({ ...f, cor: e.target.value }))}>
              {CORES_PROJETO.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="ad-field">
            <label>Imagem</label>
            <div className="ad-upload-area ad-upload-small" onClick={() => fileRef.current.click()}>
              {preview
                ? <img src={preview} alt="preview" className="ad-preview-img" />
                : <span>Selecionar imagem</span>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onArquivo} />
          </div>
        </div>
        {enviando && <ProgressBar value={progresso} />}
        {erro && <p className="ad-erro">{erro}</p>}
        <button className="ad-btn-primary" type="submit" disabled={enviando}>
          {enviando ? `Salvando… ${progresso}%` : '+ Adicionar Projeto'}
        </button>
      </form>

      <div className="ad-projetos-lista">
        {itens.length === 0 && <p className="ad-empty">Nenhum projeto cadastrado.</p>}
        {itens.map(item => {
          const acoesLista = Array.isArray(item.acoes)
            ? item.acoes
            : typeof item.acoes === 'string'
              ? item.acoes.split(',').map(a => a.trim()).filter(Boolean)
              : [];

          return (
            <div key={item.id} className="ad-projeto-card">
              <div className="ad-projeto-img">
                <img src={item.imagemurl} alt={item.titulo} />
                <span className="ad-badge" style={{ background: item.cor }}>{item.cat}</span>
              </div>
              <div className="ad-projeto-info">
                <strong>{item.titulo}</strong>
                <p>{item.descricao}</p>
                {acoesLista.length > 0 && (
                  <ul>{acoesLista.map((a, i) => <li key={i}>{a}</li>)}</ul>
                )}
              </div>
              <button className="ad-btn-delete" onClick={() => remover(item)} title="Remover">✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// DASHBOARD PRINCIPAL
// ────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const [aba, setAba]     = useState('galeria');

  async function sair() {
    logout();
    navigate('/admin/login');
  }

  const abas = [
    { id: 'galeria',  label: 'Galeria' },
    { id: 'membros',  label: 'Membros' },
    { id: 'projetos', label: 'Projetos' },
  ];

  return (
    <div className="ad-layout">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-top">
          <img src={logo} alt="Logo" className="ad-sidebar-logo" />
          <p className="ad-sidebar-title">Painel Admin</p>
        </div>

        <nav className="ad-sidebar-nav">
          {abas.map(a => (
            <button
              key={a.id}
              className={`ad-nav-btn${aba === a.id ? ' active' : ''}`}
              onClick={() => setAba(a.id)}
            >
              {a.label}
            </button>
          ))}
        </nav>

        <div className="ad-sidebar-footer">
          <p className="ad-user-email">{user?.email}</p>
          <button className="ad-btn-sair" onClick={sair}>Sair</button>
          <a href="/" className="ad-link-site" target="_blank" rel="noreferrer">
            Ver site ↗
          </a>
        </div>
      </aside>

      <main className="ad-main">
        {aba === 'galeria'  && <TabGaleria />}
        {aba === 'membros'  && <TabMembros />}
        {aba === 'projetos' && <TabProjetos />}
      </main>
    </div>
  );
}
