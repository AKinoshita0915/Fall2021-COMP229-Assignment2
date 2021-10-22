let mongoose = require("mongoose");

// create a model class
let contactModel = mongoose.Schema({
    name: String,
    company: String,
    description: String,
    email: String,
    phone: Number
},
{
    collection: "contacts"
});

module.exports = mongoose.model("Contact", contactModel)