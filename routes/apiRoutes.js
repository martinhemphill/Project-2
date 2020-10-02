const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/examples', AppController.getExamples);
  router.post('/examples', AppController.createExample);
  router.delete('/examples/:id', AppController.deleteExample);

  // GoodReads routes
  router.get('/books', AppController.getBookInfo);
  router.get('/userInfo', AppController.getUserInfo);
  router.get('/completedBooks/:id', AppController.getUserListPast);
  router.get('/currentBooks/:id', AppController.getUserListCurrent);
  router.get('/readingList/:id', AppController.getUserListFuture);
  router.get('/reviews', AppController.getBookReviews);
  router.get('/reviews/:id', AppController.getBookReviewsByID);

  return router;
};
