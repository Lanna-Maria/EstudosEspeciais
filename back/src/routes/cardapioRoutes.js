const express = require('express');
const router = express.Router();

const {
  getAllMenuItems,
  addMenuItems,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/cardapioController');

router.get('/', getAllMenuItems);
router.post('/', addMenuItems);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
