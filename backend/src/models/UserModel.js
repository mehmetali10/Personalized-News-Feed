const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2   
    },
    email: {
        type: String, // Use String data type for email
        required: true,
        unique: true, // Correct the spelling of 'unique'
        validate: {
            validator: function(v) {
                // Define a simple email validation regex
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: 'Invalid email format'
        }
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
