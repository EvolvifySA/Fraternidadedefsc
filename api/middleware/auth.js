const supabase = require('../db');

module.exports = async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  console.log('Auth header:', header ? 'presente' : 'ausente');
  
  if (!header || !header.startsWith('Bearer ')) {
    console.error('Auth falhou: sem Bearer token');
    return res.status(401).json({ error: 'Não autorizado: Nenhum token fornecido.' });
  }

  const token = header.slice(7);

  try {
    // Valida o token JWT com o Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Auth falhou - token inválido:', error?.message);
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
    
    console.log('Auth sucesso para:', user.email);
    req.user = user;
    next();
  } catch (e) {
    console.error('Auth error:', e.message);
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
