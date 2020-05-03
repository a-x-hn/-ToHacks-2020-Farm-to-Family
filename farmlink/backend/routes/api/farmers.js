const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');

// Load Input Validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Farmer = require('../../models/farmer.model');

// Log In Route

router.post("/login", (req, res) => {

  // Form Validation
  const { errors,isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find Farmer by Email

  Farmer.findOne({ email }).then(farmer => {
    if (!farmer) {
      return res.status(404).json({ emailnotfound: "Email not found"});
    }

    // Check Password
    bcrypt.compare(password, farmer.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretorKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Register Route

router.post('/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Farmer.findOne({ email: req.body.email }).then(farmer => {
      if (farmer) {
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
              .then(farmer => res.json(farmer))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

/*
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

*/

module.exports = router;
