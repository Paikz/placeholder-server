
var express   = require('express');
var mongoose  = require('mongoose');
var jwt       = require('jsonwebtoken');
var bcrypt    = require('bcryptjs');
var router    = express.Router();

//Models
var User = require('../models/user.model')
var UserModel = mongoose.model('User')

router.use((req, res, next) => {
    console.log("Incoming " + req.method + " req to: " + req.path);
    next();
});

router.route("/api/users")
    .post(function(req, res) {
        var newUser = new UserModel({ username: req.body.username, email: req.body.email, password: req.body.password});
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(req.body.password, salt);

        newUser.save(function (err) {
            if (err && err.code === 11000) {
                return res.status(400).send({ message: 'Duplicate email.' });
            }
            if (err) return res.send(err);
            res.send("User created.");
        });
    })

router.route("/api/authenticate")
    .post(function(req, res) {
        UserModel.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) return res.send(err);
            if (!user) {
                return res.status(401).send({ success: false, message: 'Authentication failed.' });
            } else if (user) {
                if (!user.comparePassword(req.body.password)) {
                    return res.status(401).send({ success: false, message: 'Authentication failed.' });
                } else {
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    };
                    var token = jwt.sign(payload, "TOKENAUTHENTICATION", {
                        expiresIn: '24h'
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        })
    })

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, "TOKENAUTHENTICATION", function(err, decoded) {
      if (err) {
        return res.send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

router.get("/", (req, res) => {
    res.json({ message: 'The Restful API is up and running...' });
});

router.route("/api/users")
    .get(function(req, res) {
        UserModel.find(function (err, users) {
          if (err) return res.send(err);
          res.json(users);
        })
    })

    .delete(function(req, res) {
        UserModel.remove({}, function(err) {
          if (err) return res.send(err);
          res.json({message: 'Successfully deleted all entries.'});
        })
    });

router.route("/api/users/:user_id")
    .get(function(req, res) {
      UserModel.findById(req.params.user_id, function(err, user) {
          if (err) return res.send(err);
          res.json(user);
      })
    })

    .put(function(req, res) {
      UserModel.findById(req.params.user_id, function(err, user) {
          if (err) return res.send(err);

          user.username = req.body.username;
          user.email = req.body.email;

          user.save(function(err) {
              if (err) res.send(err);
              res.json({ message: 'User updated.' });
          });

      });
    })

    .delete(function(req, res) {
        UserModel.remove({
          _id: req.params.user_id
        }, function(err, user) {
          if (err) return res.send(err);
          res.json({message: 'Successfully deleted entry.'});
        })
    });

module.exports = router;
