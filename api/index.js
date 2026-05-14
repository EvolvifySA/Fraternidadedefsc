const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/auth',     require('./routes/auth'));
app.use('/galeria',  require('./routes/galeria'));
app.use('/membros',  require('./routes/membros'));
app.use('/projetos', require('./routes/projetos'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;