const mongoose = require('mongoose');

module.exports = mongoose.model('Company', new mongoose.Schema({
    name :{
        type: String,
        required:'Name is required',
        unique: true
    }, 
    code :{
        type: String,
        required: 'Code is required'
    }, 
    image:{
        type: String,
        required: 'Image is required'
    },
    money:{
        type: Number,
        default: 0
    },
    description:{
        type: String
    }, 
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' }]
}));