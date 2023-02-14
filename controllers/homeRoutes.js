const router = require('express').Router()
const { Post, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      attributes: ['content'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // This serializes the data
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));
    console.log('Data going to handlebars: ' + blogPosts);

    // This renders the data into handlebars.
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router