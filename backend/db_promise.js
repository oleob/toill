var promise = require("bluebird");

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var config = require('./login.js');
var db = pgp(config);

function test(req, res, next) {
  db.any('SELECT * FROM hindringer ORDER BY id DESC LIMIT 1')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved Test'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllHindringer(req,res,next){
  db.any('SELECT * FROM hindringer ORDER BY tidspunkt DESC')
    .then(function (data){
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved all hindringer'
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addHindring(req, res, next) {
  //req.body.age = parseInt(req.body.age);
  //db.none('insert into hindringer(type, tidspunkt, gyldig_til,sist_rapportert_av)' + `values(${req.param.type}, ${req.param.tidspunkt}, ${req.param.gyldig_til}, ${req.param.sist_rapportert_av})`,
  db.none("insert into hindringer(type, tidspunkt, gyldig_til,sist_rapportert_av) values($1, $2, $3, $4)", [3, "017-02-22T13:00:00.000Z", "017-02-22T13:00:00.000Z", null])
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
       });
    })
    .catch(function (error) {
        return next(err);
    });
}

function deleteHindring(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from hindringer where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} hindring`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  test:test,
  getAllHindringer:getAllHindringer,
  addHindring:addHindring,
  deleteHindring:deleteHindring
}
