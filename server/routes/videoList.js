  
const express = require('express');
const router = express.Router();

const VideoDetails = require('../models/VideoDetails');

router.get('/', (req, res, next) => {
  console.log("Got request");
  VideoDetails
    .aggregate([{
      $lookup: {
        from: "categories", // collection name in db
        localField: "upload_categoryId",
        foreignField:  "_id",
        as: "category"
      }
    }])
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