const express = require('express');
const db = require('./config/database')

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// Rotas
const routes = require('./routes/index');
app.use('/', routes);

// Inicializa o servidor
db.connect()
  .then(() => {
    console.log("Conectado ao banco de dados PostgreSQL");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });