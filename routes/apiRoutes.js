const router = require('express').Router();
// const appController = require('../controllers/appController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication (provided)
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // Example App (provided)
  router.get('/examples', AppController.getExamples);
  router.post('/examples', AppController.createExample);
  router.delete('/examples/:id', AppController.deleteExample);

  // Project GET routes
  // router.get('/booksgr', AppController.getBookInfo);
  router.get('/books', AppController.getBookInfoInternal);
  router.get('/userInfo/:id', AppController.getUserInfo);
  // router.get('/readPast/:id', AppController.getUserListPast);
  // router.get('/readCurrent/:id', AppController.getUserListCurrent);
  // router.get('/readFuture/:id', AppController.getUserListFuture);
  // router.get('/reviews', AppController.getBookReviewsByUser);
  // router.get('/reviews/:id', AppController.getBookReviewsByBook);
  // router.get('/connections/:id', AppController.getFollowers);
  // router.get('/connections/:id', AppController.getFollowing);
  router.get('/connections', AppController.getConnections);
  router.get('/lists', AppController.getUserList);

  // Project POST routes
  router.post('/books', AppController.addBookInternal);
  router.post('/connections', AppController.followUser);
  router.post('/lists', AppController.addToList);
  // router.post('/readFuture', AppController.addToFuture);
  // router.post('/readCurrent', AppController.addToCurrent);
  // router.post('/readPast', AppController.addToPast);
  // router.post('/reviews', AppController.addReview);

  // Goodreads DELETE routes

  router.delete('/connections', AppController.unFollow);

  router.delete('/lists/:id', AppController.deleteFromList);

  return router;
};
