const express = require('express');
const multer = require('multer');
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/membros - Retorna todos os membros
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('membros')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/membros - Adiciona um novo membro
router.post('/', requireAuth, upload.single('imagem'), async (req, res) => {
  const { nome, cargo = '', descricao = '' } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  let imagemUrl = '';
  if (req.file) {
    const filePath = `membros/${Date.now()}_${req.file.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      return res.status(500).json({ error: `Falha no upload: ${uploadError.message}` });
    }
    const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
    imagemUrl = publicUrl;
  }

  const { data, error: insertError } = await supabase
    .from('membros')
    .insert([{ nome, cargo, descricao, imagemurl: imagemUrl }])
    .select();

  if (insertError) {
    return res.status(500).json({ error: `Falha ao inserir no banco: ${insertError.message}` });
  }

  res.status(201).json(data[0]);
});

// DELETE /api/membros/:id - Deleta um membro
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  const { data: item, error: selectError } = await supabase
    .from('membros')
    .select('imagemurl')
    .eq('id', id)
    .single();

  if (selectError || !item) {
    return res.status(404).json({ error: 'Membro não encontrado.' });
  }

  if (item.imagemurl) {
    const fileName = item.imagemurl.split('/').pop();
    const fullPath = `membros/${fileName}`;
    const { error: deleteImageError } = await supabase.storage
      .from('uploads')
      .remove([fullPath]);
      
    if (deleteImageError) {
      console.error("Erro ao deletar imagem do storage:", deleteImageError.message);
    }
  }

  const { error: deleteDbError } = await supabase
    .from('membros')
    .delete()
    .eq('id', id);

  if (deleteDbError) {
    return res.status(500).json({ error: `Falha ao deletar do banco: ${deleteDbError.message}` });
  }

  res.json({ ok: true });
});

module.exports = router;
