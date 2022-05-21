const express = require('express');

const xdbController = require('../controllers/ydb');

const router = express.Router();

router.get('/', xdbController.getIndex);

module.exports = router;