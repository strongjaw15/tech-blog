const router = require('express').Router()
const authentication = require('../../utils/auth.js')
const moment = require('moment')
const {Post, User, Comment} = require('../../models')

router.get('/', authentication, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {id: req.session.user_id},
      include: [{model: Post}]
    })

    const userDataSerial = userData.get({plain: true})
    userDataSerial.posts = userDataSerial.posts.map((post) => {
      return {
        ...post,
        created_at: moment(post.created_at).format('MMMM Do YYYY, h:mm a')
      }
    })

    res.render('dashboard', {
      userDataSerial,
      loggedIn: req.session.loggedIn
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

module.exports = router