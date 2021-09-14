  
const express = require('express');
const router = express.Router();

const categoryies = require('../models/Category');

router.get('/', (req, res, next) => {
  console.log("Got request");
  categoryies
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;