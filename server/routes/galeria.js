const express = require('express');
const multer = require('multer');
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('galeria')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', requireAuth, upload.single('imagem'), async (req, res) => {
  try {
    const { titulo, descricao = '', categoria = 'Geral' } = req.body;
    console.log('Recebido:', { titulo, descricao, categoria, temArquivo: !!req.file });

    if (!titulo || !req.file) {
      return res.status(400).json({ error: 'Título e imagem são obrigatórios.' });
    }

    const filePath = `galeria/${Date.now()}_${req.file.originalname}`;
    console.log('Upload para:', filePath);

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
    console.log('URL pública:', publicUrl);

    const { data, error: insertError } = await supabase
      .from('galeria')
      .insert([{ titulo, descricao, categoria, imagemurl: publicUrl }])
      .select();

    if (insertError) {
      console.error('Erro no insert:', insertError);
      return res.status(500).json({ error: `Falha ao inserir no banco: ${insertError.message}` });
    }

    console.log('Sucesso! Inserido:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Erro não tratado:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  const { data: item, error: selectError } = await supabase
    .from('galeria')
    .select('imagemurl')
    .eq('id', id)
    .single();

  if (selectError || !item) {
    return res.status(404).json({ error: 'Item não encontrado.' });
  }

  if (item.imagemurl) {
    const fileName = item.imagemurl.split('/').pop();
    const { error: deleteImageError } = await supabase.storage
      .from('uploads')
      .remove([`galeria/${fileName}`]);

    if (deleteImageError) {
      console.error('Erro ao deletar imagem do storage:', deleteImageError.message);
    }
  }

  const { error: deleteDbError } = await supabase
    .from('galeria')
    .delete()
    .eq('id', id);

  if (deleteDbError) {
    return res.status(500).json({ error: `Falha ao deletar do banco: ${deleteDbError.message}` });
  }

  res.json({ ok: true });
});

module.exports = router;const express = require('express');
const multer = require('multer');
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('galeria')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', requireAuth, upload.single('imagem'), async (req, res) => {
  const { titulo, descricao = '', categoria = 'Geral' } = req.body;
  if (!titulo || !req.file) {
    return res.status(400).json({ error: 'Título e imagem são obrigatórios.' });
  }

  const filePath = `galeria/${Date.now()}_${req.file.originalname}`;
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(filePath, req.file.buffer, {
      contentType: req.file.mimetype,
    });

  if (uploadError) {
    return res.status(500).json({ error: `Falha no upload: ${uploadError.message}` });
  }

  const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath);

  const { data, error: insertError } = await supabase
    .from('galeria')
    .insert([{ 
      titulo, 
      descricao, 
      categoria, 
      imagemUrl: publicUrlData.publicUrl 
    }])
    .select();

  if (insertError) {
    return res.status(500).json({ error: `Falha ao inserir no banco: ${insertError.message}` });
  }

  res.status(201).json(data[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;


  const { data: item, error: selectError } = await supabase
    .from('galeria')
    .select('imagemUrl')
    .eq('id', id)
    .single();

  if (selectError || !item) {
    return res.status(404).json({ error: 'Item não encontrado.' });
  }

  if (item.imagemUrl) {
    const fileName = item.imagemUrl.split('/').pop();
    const { error: deleteImageError } = await supabase.storage
      .from('uploads')
      .remove([`galeria/${fileName}`]);
      
    if (deleteImageError) {
      // Log do erro, mas continue para deletar o registro do DB
      console.error("Erro ao deletar imagem do storage:", deleteImageError.message);
    }
  }

  // Agora, delete o registro do banco de dados
  const { error: deleteDbError } = await supabase
    .from('galeria')
    .delete()
    .eq('id', id);

  if (deleteDbError) {
    return res.status(500).json({ error: `Falha ao deletar do banco: ${deleteDbError.message}` });
  }

  res.json({ ok: true });
});

module.exports = router;
