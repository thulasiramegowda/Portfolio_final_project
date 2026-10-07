const express = require('express');
const router = express.Router();
const multer = require('multer');
const apiController = require('../controllers/apiController');

// Multer setup for memory storage (for receiving frames)
const upload = multer({ storage: multer.memoryStorage() });

router.get('/health', apiController.checkHealth);
router.get('/model/info', apiController.getModelInfo);
router.post('/predict', upload.single('frame'), apiController.predict);
router.post('/test-case', apiController.runTestCase);
router.get('/results', apiController.getResults);
router.get('/model/performance', apiController.getPerformance);
router.get('/model/distribution', apiController.getDistribution);

module.exports = router;
