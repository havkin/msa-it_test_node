const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    _id: {
       type: String},
});

module.exports = mongoose.model('User', userSchema, 'user');