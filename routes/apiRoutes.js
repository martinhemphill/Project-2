const router = require('express').Router();
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
  router.get('/books', AppController.getBookInfoInternal);
  router.get('/userInfo/:id', AppController.getUserInfo);
  router.get('/connections', AppController.getConnections);
  router.get('/lists', AppController.getUserList);

  // Project POST routes
  router.post('/books', AppController.addBookInternal);
  router.post('/connections', AppController.followUser);
  router.post('/lists', AppController.addToList);

  // Goodreads DELETE routes
  router.delete('/connections', AppController.unFollow);
  router.delete('/lists/:id', AppController.deleteFromList);

  return router;
};
