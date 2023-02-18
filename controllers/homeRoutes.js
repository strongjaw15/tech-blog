const router = require('express').Router()
const { Post, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      attributes: ['title','content'],
      include: {
          model: User,
          attributes: ['username']
      }, 
    });

    // This serializes the data
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    // This renders the homepage data into handlebars.
    console.log(req.session.logged_in)
    res.render('homepage', { 
      blogPosts: blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router