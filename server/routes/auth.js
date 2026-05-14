const express = require('express');
const router = express.Router();
const { supabase, hasSupabaseConfig } = require('../db');

router.post('/login', async (req, res) => {
  if (!hasSupabaseConfig || !supabase) {
    return res.status(500).json({ error: 'Supabase não configurado no ambiente de produção.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  res.json({ token: data.session.access_token });
});

module.exports = router;