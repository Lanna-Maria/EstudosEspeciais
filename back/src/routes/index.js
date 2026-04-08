const express = require('express');

const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidosRoutes');
const adminRoutes = require('./adminRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = express.Router();

// rotas principais
router.use('/cardapio', cardapioRoutes);
router.use('/pedidos', pedidoRoutes);

// admin e dashboard
router.use('/admin', adminRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
