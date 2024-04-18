const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/LoginFormPractice")
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((e) => {
        console.log('Connection failed', e.message);
    });

// Define a Mongoose schema for the login collection
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
