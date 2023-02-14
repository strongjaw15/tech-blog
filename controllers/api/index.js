const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const authentication = require('../../utils/auth.js')

router.use('/users', authentication, userRoutes);
// router.use('/dashboard', authentication, dashboardRoutes);

module.exports = router;