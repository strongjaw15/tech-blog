const express = require("express");
const router = express.Router();
const { Asteroid, Comment, User } = require("../../models");
const authenticated = require("../../utils/auth");

// Finds all comments

router.get("/", (req, res) => {
  Comment.findAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Creates a new comment

router.post("/", (req, res) => {
  Comment.create({
    comment: req.body.comment,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

module.exports = router;
