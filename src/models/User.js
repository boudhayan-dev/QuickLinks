
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});


UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;