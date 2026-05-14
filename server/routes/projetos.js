const express = require('express');
const multer = require('multer');
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/projetos - Retorna todos os projetos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/projetos - Adiciona um novo projeto
router.post('/', requireAuth, upload.single('imagem'), async (req, res) => {
  const { titulo, cat = '', desc = '', acoes = '', cor = '#C9A84C' } = req.body;
  if (!titulo || !req.file) {
    return res.status(400).json({ error: 'Título e imagem são obrigatórios.' });
  }

  const filePath = `projetos/${Date.now()}_${req.file.originalname}`;
  const { error: uploadError } = await supabase.storage
    .from('imagens')
    .upload(filePath, req.file.buffer, {
      contentType: req.file.mimetype,
    });

  if (uploadError) {
    return res.status(500).json({ error: `Falha no upload: ${uploadError.message}` });
  }

  const { data: publicUrlData } = supabase.storage.from('imagens').getPublicUrl(filePath);
  const imageUrl = publicUrlData.publicUrl;
  const acoesArray = acoes ? acoes.split(',').map(a => a.trim()).filter(Boolean) : [];

  const { data, error: insertError } = await supabase
    .from('projetos')
    .insert([{ titulo, cat, desc, acoes: acoesArray, cor, imageUrl }])
    .select();

  if (insertError) {
    return res.status(500).json({ error: `Falha ao inserir no banco: ${insertError.message}` });
  }

  res.status(201).json(data[0]);
});

// DELETE /api/projetos/:id - Deleta um projeto
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  const { data: item, error: selectError } = await supabase
    .from('projetos')
    .select('imageUrl')
    .eq('id', id)
    .single();

  if (selectError || !item) {
    return res.status(404).json({ error: 'Projeto não encontrado.' });
  }

  if (item.imageUrl) {
    const fileName = item.imageUrl.split('/').pop();
    const fullPath = `projetos/${fileName}`;
    const { error: deleteImageError } = await supabase.storage
      .from('imagens')
      .remove([fullPath]);
      
    if (deleteImageError) {
      console.error("Erro ao deletar imagem do storage:", deleteImageError.message);
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
});

module.exports = router;
