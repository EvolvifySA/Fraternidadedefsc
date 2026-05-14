const supabase = require('../db');

module.exports = async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Não autorizado: Nenhum token fornecido.' });
  }

  const token = header.slice(7);

  try {
    // Verifica o token com o Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }

    // Anexa o usuário à requisição para uso posterior, se necessário
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ error: 'Erro interno ao validar o token.' });
  }
};
