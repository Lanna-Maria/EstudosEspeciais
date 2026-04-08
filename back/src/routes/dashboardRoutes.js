const express = require('express');
const {
  getDashboardPedidos,
  updatePedidoStatus,
} = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', getDashboardPedidos);
router.put('/:id', updatePedidoStatus);

module.exports = router;
