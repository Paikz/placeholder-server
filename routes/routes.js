
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models
var User = require('../models/user.model')
var UserModel = mongoose.model('User')

router.use((req, res, next) => {
    console.log("Incoming " + req.method + " req to: " + req.path);
    next();
});

router.get("/", (req, res) => {
    res.json({ message: 'The Restful API is up and running...' });
});

router.route("/api/users")
    .post(function(req, res) {
        var testUser = new UserModel({ username: req.body.username, email: req.body.email, password: req.body.password});

        testUser.save(function (err) {
          if (err) return res.send(err);
          res.send("User created.");
        });
    })

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
