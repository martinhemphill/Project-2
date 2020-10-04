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

  // GoodReads GET routes
  router.get('/booksgr', AppController.getBookInfo);
  router.get('/books', AppController.getBookInfoInternal);
  router.get('/userInfo/:id', AppController.getUserInfo);
  router.get('/readPast/:id', AppController.getUserListPast);
  router.get('/readCurrent/:id', AppController.getUserListCurrent);
  router.get('/readFuture/:id', AppController.getUserListFuture);
  router.get('/reviews', AppController.getBookReviews);
  router.get('/reviews/:id', AppController.getBookReviewsByID);
  router.get('/connections/:followeeID', AppController.getFollowers);
  router.get('/connections/:followerID', AppController.getFollowing);
  // Goodreads POST routes
  router.post('/books', AppController.addBookInternal);
  router.post('/connections', AppController.followUser);
  router.post('/recommendations', AppController.addRecommendation);
  router.post('/readFuture', AppController.addToFuture);
  router.post('/readCurrent', AppController.addToCurrent);
  router.post('/readPast', AppController.addToPast);
  router.post('/reviews', AppController.addReview);
  // Goodreads DELETE routes
  router.post('/connections', AppController.unFollow);

  return router;
};
