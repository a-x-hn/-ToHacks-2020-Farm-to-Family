const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Input Validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Client = require('../../models/client.model');

router.route('/').get((req, res) => {
    Client.find()
        .then(client => res.json(client))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newClient = new Client({username});

    newClient.save()
    .then(() => res.json('Client added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Client.findById(req.client.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.client.id)
    .then(() => res.json('Client deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Client.findById(req.client.id)
    .then(client => {
      client.username = req.body.username;

      client.save()
        .then(() => res.json('Client updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;