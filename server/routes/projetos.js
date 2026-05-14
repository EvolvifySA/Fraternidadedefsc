const express = require('express');
const multer = require('multer');
const { supabase, hasSupabaseConfig } = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  if (!hasSupabaseConfig || !supabase) {
    return res.status(500).json({ error: 'Supabase não configurado no ambiente de produção.' });
  }

  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', requireAuth, upload.single('imagem'), async (req, res) => {
  try {
    if (!hasSupabaseConfig || !supabase) {
      return res.status(500).json({ error: 'Supabase não configurado no ambiente de produção.' });
    }

    const { titulo, cat = '', descricao = '', acoes = '', cor = '#C9A84C' } = req.body;
    console.log('POST Projetos:', { titulo, temArquivo: !!req.file });

    if (!titulo || !req.file) {
      return res.status(400).json({ error: 'Título e imagem são obrigatórios.' });
    }

    const filePath = `projetos/${Date.now()}_${req.file.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      return res.status(500).json({ error: `Falha no upload: ${uploadError.message}` });
    }

    const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
    const acoesArray = acoes ? acoes.split(',').map(a => a.trim()).filter(Boolean) : [];

    const { data, error: insertError } = await supabase
      .from('projetos')
      .insert([{ titulo, cat, descricao, acoes: acoesArray, cor, imagemurl: publicUrl }])
      .select();

    if (insertError) {
      console.error('Erro no insert:', insertError);
      return res.status(500).json({ error: `Falha ao inserir no banco: ${insertError.message}` });
    }

    console.log('Sucesso! Projeto inserido:', data[0].id);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Erro não tratado em POST:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (!hasSupabaseConfig || !supabase) {
      return res.status(500).json({ error: 'Supabase não configurado no ambiente de produção.' });
    }

    const { id } = req.params;

    const { data: item, error: selectError } = await supabase
      .from('projetos')
      .select('imagemurl')
      .eq('id', id)
      .single();

    if (selectError || !item) {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }

    if (item.imagemurl) {
      const fileName = item.imagemurl.split('/').pop();
      const fullPath = `projetos/${fileName}`;
      const { error: deleteImageError } = await supabase.storage
        .from('uploads')
        .remove([fullPath]);

      if (deleteImageError) {
        console.error('Erro ao deletar imagem do storage:', deleteImageError.message);
      }
    }

    const { error: deleteDbError } = await supabase
      .from('projetos')
      .delete()
      .eq('id', id);

    if (deleteDbError) {
      return res.status(500).json({ error: `Falha ao deletar do banco: ${deleteDbError.message}` });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Erro no DELETE:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;