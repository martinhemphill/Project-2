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

    // ========= GET ROUTES =========
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
          UserId: req.params.id
        },
        include: [db.Book]
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getUserListCurrent: function (req, res) {
      db.readCurrent.findAll({
        where: {
          UserId: req.params.id
        },
        include: [db.Book]
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getUserListFuture: function (req, res) {
      db.readFuture.findAll({
        where: {
          UserId: req.params.id
        },
        include: [db.Book]
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getBookInfo: function (req, res) {
      const apiKey = 'key=xSYGRFm0UFtN1PLA8A0DwA&';
      const bookTitle = 'Harry Potter and the Sorcerer\'s Stone';
      const isbn = '978-0545162074';
      const searchISBN = '&isbn_to_id=' + isbn;
      const searchTitle = '&title=' + bookTitle;
      const queryURL = 'https://www.goodreads.com/search/index.xml?' + apiKey + '&q=Harry Potter and the Sorcerers Stone';
      axios.get(queryURL)
        .then((response) => {
          const result = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2, ignoreCdata: true }));

          const bookId = result.GoodreadsResponse.search.results.work[0].id._text;

          const title = result.GoodreadsResponse.search.results.work[0].best_book.title._text;

          const author = result.GoodreadsResponse.search.results.work[0].best_book.author.name._text;

          const img = result.GoodreadsResponse.search.results.work[0].best_book.image_url._text;

          const publicationYear = result.GoodreadsResponse.search.results.work[0].original_publication_year._text;

          const rating = parseFloat(result.GoodreadsResponse.search.results.work[0].average_rating._text);

          const getReview = (title) => {
            const reviewURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title + '&key=AIzaSyAGwS80on7Jfqi4kEejw10c-FfiMIUDj_I';
            axios.get(reviewURL)
              .then(data => {
                console.log(data.data.items[0].volumeInfo.description);
              }).catch(error => {
                console.log(error);
              });
          };

          console.log(bookId);
          console.log(title);
          console.log(author);
          console.log(img);
          console.log(publicationYear);
          console.log(rating);
          getReview(title);
        }).catch(error => {
          console.log(error);
        });
    },
    getBookInfoInternal: function (req, res) {
      db.Book.findAll({}).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getBookReviews: function (req, res) {
      db.Review.findAll({}).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getBookReviewsByID: function (req, res) {
      db.Review.findAll({
        where: {
          BookIsbn: req.params.id
        },
        include: [db.book]
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getFollowers: function (req, res) {
      db.Connection.findAll({
        where: {
          followeeID: req.params.followeeID
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },
    getFollowing: function (req, res) {
      db.Connection.findAll({
        where: {
          followerID: req.params.followerID
        }
      }).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },

    // ========= POST ROUTES ========
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
    },

    // ========= DELETE ROUTES =========
    unFollow: function (req, res) {
      db.Connection.destroy({ where:
        { followerID: req.params.followerID,
          followeeID: req.params.followeeID }
      }).then(function (dbConnection) {
        res.json(dbConnection);
      });
    },
    deleteFromPast: function (req, res) {
      db.readPast.destroy({ where: { id: req.params.id }
      }).then(function (dbReadPast) {
        res.json(dbReadPast);
      });
    },
    deleteFromCurrent: function (req, res) {
      db.readCurrent.destroy({ where: { id: req.params.id }
      }).then(function (dbReadCurrent) {
        res.json(dbReadCurrent);
      });
    },
    deleteFromFuture: function (req, res) {
      db.readFuture.destroy({ where: { id: req.params.id }
      }).then(function (dbReadFuture) {
        res.json(dbReadFuture);
      });
    }
  };
};
