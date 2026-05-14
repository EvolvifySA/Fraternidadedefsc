const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // Autentica o usuário com o Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  // O 'data.session.access_token' é o JWT gerado pelo Supabase
  res.json({ token: data.session.access_token });
});

module.exports = router;