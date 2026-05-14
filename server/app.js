const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

function mountApiRoutes(prefix) {
  app.use(`${prefix}/auth`, require('./routes/auth'));
  app.use(`${prefix}/galeria`, require('./routes/galeria'));
  app.use(`${prefix}/membros`, require('./routes/membros'));
  app.use(`${prefix}/projetos`, require('./routes/projetos'));
}

mountApiRoutes('');
mountApiRoutes('/api');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;