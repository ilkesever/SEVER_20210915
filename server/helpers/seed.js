const mongoose = require('mongoose');
const Category = require('../models/Category');


const seedUsers = async () => {
    let categories = ['Exercise', 'Education', 'Recipe'];

    Category.countDocuments({}, function (err, count) {
        if(count == 0)
        {
            categories.forEach(element => {
                new Category({
                    _id: new mongoose.Types.ObjectId,
                    categoryName: element
                }).save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    })
    
    
}


module.exports = {
    seedUsers: seedUsers
}