const router = require('express').Router();

module.exports = (db) => {
  // ======GROUP 2 ROUTES==jf==
  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        },
        raw: true
      }).then((data) => {
        db.Connection.findAll({
          where: { followerId: req.session.passport.user.id },
          raw: true
        }).then(followees => {
          console.log('followees:', followees);
          const myFollowees = [];

          db.User.findAll({ raw: true 
          }).then(allUsers => {
            allUsers.forEach(user => {
              followees.forEach(fol => {
                if (fol.followeeId === user.id) {
                  myFollowees.push(user);
                }
              });
            });
            console.log('myFollowees:', myFollowees);
            const userToSend = {
              userInfo: data,
              followees: myFollowees,
              isloggedin: req.isAuthenticated()
            };
            console.log(userToSend);
            res.render('profile', userToSend);
          });
        });
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/profile/:id', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        },
        raw: true
      }).then((data) => {
        console.log(data);
        // add book possibly with join
        res.render('profile-detail', {
          user: data,
          currentBooks: [
            { title: 'aaa' },
            { title: 'bbb' }
          ]
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load login page
  router.get('/login', (req, res) => {
    res.render('login');
  });

  // Load search page
  router.get('/search', (req, res) => {
    res.render('search');
  });

  // ======EXAMPLES FROM ALPERS FILE==jf==
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });
  router.get('/login', (req, res) => {
    res.render('login');
  });
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbExamples) {
        res.render('example', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
