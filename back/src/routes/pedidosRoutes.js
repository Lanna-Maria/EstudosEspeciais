const express = require('express');
const {
  createPedido,
  getAllPedidos, // ✅ corrigido
} = require('../controllers/pedidosController');

const router = express.Router();

router.post('/', createPedido);
router.get('/', getAllPedidos);

module.exports = router;
