const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require('../models/User');

router.post('/', (req, res, next) => {
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if (user.length<1)
        {
            //no user found
            return res.status(401).json({//error 401: unauthorized
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err){
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
            if (result){
                //generate a token not doing it now.
                const token= jwt.sign({
                    userid: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email
                }, 
                require('../configs/default').secret_key,
                {
                    expiresIn: '1d'
                });
                return res.status(200).json({
                    message: "Auth Successful",
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({//500:server error
            error: err
        });
    });
});

module.exports= router;