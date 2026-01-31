const mongoose = require('mongoose')


function connectToDatabase() {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connected to database');

        })
}

module.exports = connectToDatabase