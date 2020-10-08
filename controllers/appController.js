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
      db.User.findOne({
        where: {
          id: req.params.id
        },
        include: [db.List]
      }).then(data => {
        res.json(data);
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

    getUserList: function (req, res) {
      db.List.findAll({}).then(data => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
    },

    getConnections: function (req, res) {
      db.Connection.findAll({
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

    addToList: function (req, res) {
      db.List.create(req.body).then(function (dbAddToList) {
        res.json(dbAddToList);
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
    deleteFromList: function (req, res) {
      db.List.destroy({ where: { id: req.params.id }
      }).then(function (dbList) {
        res.json(dbList);
      });
    }

  };
};
