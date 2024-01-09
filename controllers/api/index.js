const router = require('express').Router();
const userRoutes = require('./userRoutes');
const memeRoutes = require('./memeRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/meme', memeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
