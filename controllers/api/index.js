const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes')
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/blogpost', blogPostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;