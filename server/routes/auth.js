const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const supabase = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }


  const senhaCorreta = bcrypt.compareSync(password, user.password_hash);
  
  if (!senhaCorreta) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ id: user.id }, 'SUA_CHAVE_SECRETA_DO_JWT', { expiresIn: '1d' });

  res.json({ token });
});

module.exports = router;