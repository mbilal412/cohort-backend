const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.connect('YOUR_MONGODB_CONNECTION_STRING_HERE')
        .then(() => {
            console.log('connected to database')
        })
}

connectToDatabase()
app.listen(3000, () => {
    console.log('server is running')
})