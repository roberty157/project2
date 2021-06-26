const router = require('express').Router();
const userRoutes = require('./userRoutes');
const highscoreRoutes = require('./highscoreRoutes');

//const postRoutes = require('./postRoutes');
//const commentRoutes = require('./commentRoutes');

router.use('/highscore', highscoreRoutes);
router.use('/users', userRoutes);
//router.use('/posts', postRoutes);
//router.use('/comments', commentRoutes);
module.exports = router;
