const router = require('express').Router();
const { Comments, Meme, User } = require('../models');
const withAuth = require('../utils/auth');

//root route
router.get('/', async (req, res) => {
  try {
    const dbMemeData = await Meme.findAll({
      include: [
        {
          model: Comments,
          attributes: ['id', 'text', 'meme_id'],
        },
      ],
    });

    const memes = dbMemeData.map((meme) => meme.get({ plain: true }));

    res.render('homepage', {
      memes,
      // validation
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//memes route
router.get('/Memes/:id', async (req, res) => {
  try {
    const dbMemeData = await Meme.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ['id', 'text', 'meme_id'],
        },
      ],
    });

    const meme = dbMemeData.get({ plain: true });
    res.render('meme', { meme });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//comments route
router.get('/comment/:id', async (req, res) => {
  try {
    const dbCommentData = await Comments.findByPk(req.params.id);

    const comment = dbCommentData.get({ plain: true });

    res.render('comment', { comment });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,

      // validation
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if logged in, stay on page, if not, return to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
