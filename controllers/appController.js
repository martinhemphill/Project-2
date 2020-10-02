const axios = require('axios').default;
const convert = require('xml-js');

module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    getUserInfo: function (req, res) {
      db.User.findAll({}).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getUserListPast: function (req, res) {
      db.readPast.findAll({
        where: {
          userID: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getUserListCurrent: function (req, res) {
      db.readCurrent.findAll({
        where: {
          userID: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getUserListFuture: function (req, res) {
      db.readFuture.findAll({
        where: {
          userID: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getBookInfo: function (req, res) {
      const queryURL = ('https://www.goodreads.com/book/title?&key=xSYGRFm0UFtN1PLA8A0DwA&title=Harry%20Potter');
      axios.get(queryURL)
        .then((response) => {
          const result1 = convert.xml2json(response.data, { compact: true, spaces: 2, ignoreCdata: true });
          console.log(result1);
          // get book isbn, title, author, description, and photo
        }).catch(error => {
          console.log(error);
        });
    },
    getBookReviews: function (req, res) {
      db.reviews.findAll({}).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getBookReviewsByID: function (req, res) {
      db.reviews.findAll({
        where: {
          isbn: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },

    // ========= POST ROUTES =========
    addBookInternal: function (req, res) {
      db.Book.create(req.body).then(function (dbBook) {
        res.json(dbBook);
      });
    },

    followUser: function (req, res) {
      db.Connection.create(req.body).then(function (dbConnection) {
        res.json(dbConnection);
      });
    },

    addRecommendation: function (req, res) {
      db.Recommendation.create(req.body).then(function (dbRecommendation) {
        res.json(dbRecommendation);
      });
    },

    addToFuture: function (req, res) {
      db.readFuture.create(req.body).then(function (dbAddToFuture) {
        res.json(dbAddToFuture);
      });
    },

    addToCurrent: function (req, res) {
      db.readCurrent.create(req.body).then(function (dbAddToCurrent) {
        res.json(dbAddToCurrent);
      });
    },

    addToPast: function (req, res) {
      db.readPast.create(req.body).then(function (dbAddToPast) {
        res.json(dbAddToPast);
      });
    },

    addReview: function (req, res) {
      db.Review.create(req.body).then(function (dbAddReview) {
        res.json(dbAddReview);
      });
    }

  };
};
