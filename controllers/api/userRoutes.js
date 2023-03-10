const router = require('express').Router();
const session = require("express-session");
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({user: userData, message: 'Login successful.'})
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({where: {username: req.body.username}});

    if (!userData) {
      res.status(400).json({message: 'Incorrect login, please try again.'});
      return;
    }

    const properPassword = userData.checkPassword(req.body.password);

    if (!properPassword) {
      res.status(400).json({message: 'Incorrect login, please try again.'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      
      res.status(200)
        .json({user: userData, message: 'Login successful.'});
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;