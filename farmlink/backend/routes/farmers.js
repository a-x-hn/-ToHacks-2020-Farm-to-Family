const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../src/config/keys');

// Load Input Validation

const validateRegisterInput = require("../register");
const validateLoginInput = require("../login");

// Load User model
const Farmer = require('../models/farmer.model');

router.route('/register').post((req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Farmer.findOne({ email: req.body.email }).then(Farmer => {
      if (Farmer) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newFarmer = new Farmer({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          middlename: req.body.lastname,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newFarmer.password, salt, (err, hash) => {
            if (err) throw err;
            newFarmer.password = hash;
            newFarmer
              .save()
              .then(Farmer => res.json(Farmer))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

router.route('/').get((req, res) => {
    Farmer.find()
        .then(Farmer => res.json(Farmer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newFarmer = new Farmer({username});

    newFarmer.save()
    .then(() => res.json('Farmer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Farmer.findById(req.user.id)
    .then(farmer => res.json(farmer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Farmer.findByIdAndDelete(req.farmer.id)
    .then(() => res.json('Farmer deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Farmer.findById(req.farmer.id)
    .then(farmer => {
      farmer.username = req.body.username;

      farmer.save()
        .then(() => res.json('Farmer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
