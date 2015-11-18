var console = process.console;

var _get = function(model, req, res, next) {
  model.findOne({
      where: {
        _id: req.params._id
      }
    })
    .then(function(result) {
      if (result) {
        res.payload = {
          'status': 200,
          'data': result
        };
        next();
      } else {
        res.payload = {
          'status': 400,
          'data': 'No object found'
        };
        next();
      }
    })
    .catch(function(err) {
      res.payload = {
        'status': 400,
        'data': err
      };
      next();
    });
};

var _create = function(model, req, res, next) {
  var assignement = {};
  for (var key in model.attributes) {
    if (key != 'deletedAt' && key != 'updatedAt' && key != 'createdAt' && key != '_id') {
      if (req.body[key]) {
        assignement[key] = req.body[key];
      }
    }
  }
  model.create(assignement, {
      auditUser: req.body.user || 0
    })
    .then(function(entity) {
      // in case the entity was created
      res.payload = {
        'status': 201,
        'data': {
          'message': model.name + ' created',
          _id: entity.dataValues._id
        }
      };
      next();
    })
    .catch(function(err) {
      // in case the entity was not created
      res.payload = {
        'status': 400,
        'data': {
          'message': 'Unable to create ' + assignement,
          'details': err
        }
      };
      if (err.message) {
        res.payload.data.message = err.message;
      }
      next();
    });
};

var _update = function(model, req, res, next) {
  model.findOne({
      where: {
        _id: req.params._id
      }
    })
    .then(function(simpleEntity) {
      if (simpleEntity) {
        simpleEntity.name = req.body.name;
        simpleEntity.save({
          auditUser: 1
        }).then(function() {
          res.payload = {
            'status': 200,
            'data': {
              'message': 'SimpleEntity updated',
              _id: simpleEntity.dataValues._id
            }
          };
          next();
        }).catch(function(err) {
          res.payload = {
            'status': 400,
            'data': err.errors[0]
          };
          next();
        });
      } else {
        res.payload = {
          'status': 400,
          'data': 'No object found'
        };
        next();
      }
    })
    .catch(function(err) {
      res.payload = {
        'status': 400,
        'data': err
      };
      next();
    });
};

var _delete = function(model, req, res, next) {
  model.findOne({
      where: {
        _id: req.params._id
      }
    })
    .then(function(simpleEntity) {
      if (simpleEntity) {
        simpleEntity.destroy({
            auditUser: 1
          })
          .then(function() {
            res.payload = {
              'status': 200,
              'data': {
                'message': 'SimpleEntity deleted'
              }
            };
            next();
          })
          .catch(function(err) {
            res.payload = {
              'status': 400,
              'data': err
            };
            next();
          });
      } else {
        res.payload = {
          'status': 400,
          'data': 'No object found'
        };
        next();
      }
    })
    .catch(function(err) {
      res.payload = {
        'status': 400,
        'data': err
      };
      next();
    });

};

var _undelete = function(model, req, res, next) {
  model.findOne({
      where: {
        _id: req.params._id
      },
      paranoid: false
    })
    .then(function(simpleEntity) {
      console.log(simpleEntity);
      if (simpleEntity) {
        simpleEntity.setDataValue('deletedAt', null);
        return simpleEntity.save({
            paranoid: false,
            auditUser: 1
          })
          .then(function() {
            res.payload = {
              'status': 200,
              'data': {
                'message': 'SimpleEntity undeleted'
              }
            };
            next();
          });
      }
      next();
    });
};

var _harddelete = function(model, req, res, next, sequelize) {
  model.findOne({
      where: {
        _id: req.params._id
      }
    })
    .then(function(simpleEntity) {
      if (simpleEntity) {
        simpleEntity.destroy({
            auditUser: 1
          })
          .then(function() {
            sequelize.query("DELETE from SimpleEntities WHERE _id=" + req.params._id).spread(function(results, metadata) {
              // Results will be an empty array and metadata will contain the number of affected rows.

              if (metadata.affectedRows == 1) {
                res.payload = {
                  'status': 200,
                  'data': {
                    'message': 'SimpleEntity deleted for ever'
                  }
                };
              } else {
                res.payload = {
                  'status': 400,
                  'data': {
                    'message': 'Nothing to be deleted'
                  }
                };
              }
              next();
            });
          })
          .catch(function(err) {
            res.payload = {
              'status': 400,
              'data': err
            };
            next();
          });
      } else {
        res.payload = {
          'status': 400,
          'data': 'No object found'
        };
        next();
      }
    })
    .catch(function(err) {
      res.payload = {
        'status': 400,
        'data': err
      };
      next();
    });
};

var _createDefault = function(model, sequelize) {
  result = {};
  result['get' + model.name] = function(req, res, next) {
    _get(model, req, res, next);
  };
  result['create' + model.name] = function(req, res, next) {
    _create(model, req, res, next);
  };
  result['update' + model.name] = function(req, res, next) {
    _update(model, req, res, next);
  };
  result['delete' + model.name] = function(req, res, next) {
    _delete(model, req, res, next);
  };
  result['undelete' + model.name] = function(req, res, next) {
    _undelete(model, req, res, next);
  };
  result['harddelete' + model.name] = function(req, res, next) {
    _harddelete(model, req, res, next);
  };
  return result;
};


module.exports = {
  get: _get,
  create: _create,
  update: _update,
  delete: _delete,
  undelete: _undelete,
  harddelete: _harddelete,
  createDefault: _createDefault
};
