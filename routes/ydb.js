const express = require('express');

const xdbController = require('../controllers/ydb');

const router = express.Router();

router.get('/', xdbController.getIndex);

router.get('/asm', xdbController.getASM);

router.get('/bin', xdbController.getBin);

router.post('/debug', xdbController.postDebug);

router.post('/asm-tokens', xdbController.postAsmTokens);

router.post('/asm-instructions', xdbController.postAsmInstructions);

router.post('/bin-instructions', xdbController.postBinInstructions);

module.exports = router;