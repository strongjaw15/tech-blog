const router = require('express').Router()
const authentication = require('../../utils/auth.js')
const {Post, User, Comment} = require('../../models')

router.get('/:id', authentication, async (req, res) => {
  try {
    const blogPosty = await Post.findOne({
      where: {id: req.params.id},
      attributes: ['title','content', 'id'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['comment'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    })
    console.log(blogPosty)
    const blogPost = blogPosty.get({plain: true})
    console.log(blogPost)
    res.render('blogpost', {blogPost, loggedIn:req.session.loggedIn})
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = router