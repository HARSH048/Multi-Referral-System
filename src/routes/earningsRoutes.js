const express = require('express');
const { recordPurchase,earningsRecordWithId } = require('../controllers/earningsController');

const router = express.Router();

router.post('/purchase', recordPurchase);
router.get('/:id', earningsRecordWithId)

module.exports = router;
