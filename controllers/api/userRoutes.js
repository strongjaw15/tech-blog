// const router = require('express').Router();
// const session = require("express-session");
// const { User } = require('../../models');

// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save((userData) => {
//       req.session.user_id = userData.id;
//       req.session.username = userData.username;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { username: req.body.username } });

//     if (!userData) {
//       res.status(400).json({ message: 'Incorrect login, please try again.' });
//       return;
//     }

//     const properPassword = userData.checkPassword(req.body.password);

//     if (!properPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect login, please try again.' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.username = userData.username;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'Login successful.' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;

const router = require('express').Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// This is the signup route
router.post('/signup', async (req, res) => {
  try {
    // get the password encrypted
		const newUser = req.body
		newUser.password = await bcrypt.hash(req.body.password, 11)
		
		// add the user to the db
    const addUser = await User.create(newUser)

    req.session.save(()=>{
          
      req.session.user = {
        id: addUser.id,
        username: addUser.username,
        loggedIn: true
      }
      
      res.render('homepage', {
        page,
        
        user: req.session.user,
      })
    })
  } catch (error) {
    console.log(err);
    res.status(500).json(err)
  }
})
// router.post('/signup', async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    // login logic to validate req.body.user and req.body.pass
    // would be implemented here. for this example any combo works
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({message: 'Incorrect login.'});
      return
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({message: 'Incorrect login.'});
      return
    }
  
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = req.body.user
      req.session.loggedIn = true;
  
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('../')
      })
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}) 

// This is the login route.
// router.post('/login', async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: {
//         username: req.body.username,
//       },
//     });

//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect login.' });
//       return;
//     }

//     const validPassword = await dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect login.' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res
//         .status(200)
//         .json({ user: dbUserData, message: 'Login successful.' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Logout
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