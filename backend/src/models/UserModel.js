const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName:{
        type: String,
        required: true,
        minlength: 2   
    },
    email: {
        type: email,
        required: true,
        uniqe: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    }
});


module.exports = mongoose.model("User", userSchema);
