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
    getBooks: function (req, res) {
      const queryURL = ('https://www.goodreads.com/book/title?&key=xSYGRFm0UFtN1PLA8A0DwA&title=Harry%20Potter');
      axios.get(queryURL)
        .then((response) => {
          const result1 = convert.xml2json(response.data, { compact: true, spaces: 2, ignoreCdata: true });
          console.log(result1);
        }).catch(error => {
          console.log(error);
        });
    }
  };
};
