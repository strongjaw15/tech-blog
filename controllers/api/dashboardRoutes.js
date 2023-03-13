const router = require('express').Router()
const authentication = require('../../utils/auth.js')
const moment = require('moment')
const {Post, User, Comment} = require('../../models')

router.get('/', authentication, async (req, res) => {
  try {
    // This gets the user data from the db.
    const userData = await User.findOne({
      where: {id: req.session.user_id},
      include: [{model: Post}]
    })

    // This serializes the data
    const userDataSerial = userData.get({plain: true})
    userDataSerial.posts = userDataSerial.posts.map((post) => {
      return {
        ...post,
        // This formats the date.
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

router.post('/', authentication, async (req, res) => {})

module.exports = router