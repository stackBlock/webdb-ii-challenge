const express = require('express');
const router = express.Router();
const zooRoute = require('./zoos.js');
const bearsRoute = require('./bears.js');

router.use('/zoos', zooRoute);
router.use('/bears', bearsRoute);

module.exports = router;

