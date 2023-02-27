const router = require('express').Router()
const authentication = require('../../utils/auth.js')
const moment = require('moment')
const {Post, User, Comment} = require('../../models')

router.get('/:id', authentication, async (req, res) => {
  try {
    const blogPostData2 = await Post.findOne({
      where: {id: req.params.id},
      attributes: ['title','content', 'id', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['comment', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    })

    // This serializes the data and formats the date.
    const blogPost = blogPostData2.get({plain: true})
    blogPost.created_at = moment(blogPost.created_at).format('MMMM Do YYYY, h:mm a')
    blogPost.comments = blogPost.comments.map((comment) => {
      return {
        ...comment,
        created_at: moment(comment.created_at).format('MMMM Do YYYY, h:mm a')
      }
    })

    res.render('blogpost', {
      blogPost, 
      loggedIn: req.session.loggedIn, 
      post_id: req.params.id,
      user_id: req.session.user_id, 
      username: req.session.username
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = router