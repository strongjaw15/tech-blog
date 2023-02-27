const router = require('express').Router()
const session = require('express-session');
const moment = require('moment')
const { Post, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      attributes: ['title','content', 'id', 'created_at'],
      include: {
          model: User,
          attributes: ['username']
      }, 
    });

    // This serializes the data
    const blogPosts = blogPostData.map((post) => {
      const postObject = post.get({plain: true})
      return {
        ...postObject,
        created_at: moment(postObject.created_at).format('MMMM Do YYYY, h:mm a')
      }
    })
    
    // This renders the homepage data into handlebars.
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