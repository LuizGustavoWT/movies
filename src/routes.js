const express = require('express');
const { getAwardsInterval } = require('./controllers/awardsController');

const router = express.Router();

router.get('/awards-interval', getAwardsInterval);

module.exports = router;
