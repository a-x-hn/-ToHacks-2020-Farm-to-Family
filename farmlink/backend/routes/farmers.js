const router = require('express').Router();
let Farmer = require('../models/farmer.model');

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
    Farmer.findById(req.user.id)
    .then(farmer => {
      farmer.username = req.body.username;

      farmer.save()
        .then(() => res.json('Farmer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
