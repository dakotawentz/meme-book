const router = require('express').Router();
const { Comment, Meme, User } = require('../models')
const withAuth = require('../utils/auth');

//get all meme posts and join with user data and comment
router.get('/', withAuth, async (req, res) => {
  try {
    const dbMemeData = await Meme.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'meme_id'],
        },
      ],
    });

     // Serialize data so the template can read it
    const memes = dbMemeData.map((meme) => meme.get({ plain: true }));

    // Pass serialized data and session flag into template
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


// Route set up to find single meme post and render meme page
router.get('/meme/:id', withAuth, async (req, res) => {
  try {
    const dbMemeData = await Meme.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["first_name"],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'meme_id', User],
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

// route to allow logged in user access to the profile page
// Use withAuth to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // Join user meme post and comment data with user data
      include: [
        {
          model: Meme,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userData.get({ plain: true });
    

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// NEW POST PAGE: Renders 'create.handlebars'; redirects to /login if not logged in
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to edit an existing meme
router.get("/create/:id", withAuth, async (req, res) => {
  try {
    const memeData = await Meme.findByPk(req.params.id, {
      // Join user data and comment data with meme post data
      include: [
        {
          model: User,
          attributes: ["first_name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const meme = memeData.get({ plain: true });
    
    if (req.session.logged_in) {
      res.render("edit", {
        ...meme,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//comments route
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);

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
