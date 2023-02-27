const router = require('express').Router()
const session = require('express-session');
const { Post, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      attributes: ['title','content', 'id'],
      include: {
          model: User,
          attributes: ['username']
      }, 
    });

    // This serializes the data
    const blogPosts = blogPostData.map((post) => post.get({plain: true}));

    // This renders the homepage data into handlebars.
    // console.log(req.session.loggedIn)
    res.render('homepage', { 
      blogPosts: blogPosts, 
      loggedIn: req.session.loggedIn 
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