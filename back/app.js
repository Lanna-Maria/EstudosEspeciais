const express = require('express');
const cors = require('cors');
const routes = require('./src/routes'); // já pega o index.js por padrão

const app = express();
app.use(express.json());
app.use(cors());

// usa o index.js que centraliza todas as rotas
app.use('/api', routes);

module.exports = app;
