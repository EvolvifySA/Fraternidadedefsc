const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function mountApiRoutes(prefix) {
  app.use(`${prefix}/auth`, require('./routes/auth'));
  app.use(`${prefix}/galeria`, require('./routes/galeria'));
  app.use(`${prefix}/membros`, require('./routes/membros'));
  app.use(`${prefix}/projetos`, require('./routes/projetos'));
}

// Rotas da API
mountApiRoutes('');
mountApiRoutes('/api');

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;