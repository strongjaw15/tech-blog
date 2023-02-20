const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes')

router.use('/users', userRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/blogpost', blogPostRoutes);

module.exports = router;