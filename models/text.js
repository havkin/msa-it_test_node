const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: {
        type: String
    },
    user_id: {
       type: String
    },
    _id: {
       type: String},
});

module.exports = mongoose.model('Text', textSchema, 'text');