const { supabase, hasSupabaseConfig } = require('../../server/db');

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  if (!hasSupabaseConfig || !supabase) {
    return res.status(500).json({ error: 'Supabase não configurado no ambiente de produção.' });
  }

  const { id } = req.query;

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
    const { error: deleteImageError } = await supabase.storage
      .from('uploads')
      .remove([`membros/${fileName}`]);

    if (deleteImageError) {
      console.error('Erro ao deletar imagem do storage:', deleteImageError.message);
    }
  }

  const { error: deleteDbError } = await supabase
    .from('membros')
    .delete()
    .eq('id', id);

  if (deleteDbError) {
    return res.status(500).json({ error: `Falha ao deletar do banco: ${deleteDbError.message}` });
  }

  return res.status(200).json({ ok: true });
};