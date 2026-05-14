const supabase = require('../db');

module.exports = async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Não autorizado: Nenhum token fornecido.' });
  }

  const token = header.slice(7);

  try {
    // Verifica o token com o Supabase usando o cliente de serviço
    const { data: { user }, error } = await supabase.auth.admin.getUserById(token);

    if (error || !user) {
      // Se falhar com getUserById, tenta com getUser (para compatibilidade)
      const { data: { user: user2 }, error: error2 } = await supabase.auth.getUser(token);
      if (error2 || !user2) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
      }
      req.user = user2;
    } else {
      req.user = user;
    }
    next();
  } catch (e) {
    console.error('Auth error:', e.message);
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
