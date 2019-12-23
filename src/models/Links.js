const mongoose = require('mongoose');

let LinkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        trim: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    imageB64: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        immutable: true
    }
});


LinkSchema.set('toObject', { virtuals: true });
LinkSchema.set('toJSON', { virtuals: true })

let Links = mongoose.model('Links', LinkSchema);
module.exports = Links


const User = require('./User') 

