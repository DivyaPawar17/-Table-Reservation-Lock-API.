// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const {
  lockTable,
  unlockTable,
  getTableStatus
} = require('../controllers/tableController');

router.post('/lock', lockTable);
router.post('/unlock', unlockTable);
router.get('/:tableId/status', getTableStatus);

module.exports = router;
