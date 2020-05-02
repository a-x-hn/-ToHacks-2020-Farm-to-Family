const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Input Validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Farmer = require('../models/farmer.model');

router.post("/registerfarmer", (req, res) => {
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
                middlename: req.body.middlename,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            })
        }
    })

    // Hash password before saving in db
});

router.route('/').get((req, res) => {
    Farmer.find()
        .then(farmer => res.json(farmer))
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
