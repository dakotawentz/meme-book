// Imports
const router = require("express").Router();
const { Meme } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new mem post
router.post("/", withAuth, async (req, res) => {
  
  try {
    const newMemePost = await Meme.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMemePost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// Route to edit an existing meme post
router.put("/profile/:id", withAuth, async (req, res) => {
  
  try {
    const memePostData = await Meme.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!memePostData) {
      res.status(404).json({ message: "No meme post found with this id!" });
      return;
    }

    res.status(200).json(memePostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete an existing meme post
router.delete("/:id", withAuth, async (req, res) => {
  
  try {
    const memePostData = await Meme.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!memePostData) {
      res.status(404).json({ message: "No meme post found with this id!" });
      return;
    }

    res.status(200).json(memePostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;