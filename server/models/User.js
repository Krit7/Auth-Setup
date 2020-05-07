const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User